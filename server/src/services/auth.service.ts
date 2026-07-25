import User, { IUser } from '../models/User';
import { ApiError } from '../utils/apiError';
import {
  generateAccessToken,
  generateRefreshToken,
  generateRandomToken,
  hashToken,
  verifyRefreshToken,
} from '../utils/jwt';
import { sendPasswordResetEmail, sendVerificationEmail } from '../utils/email';
import { AuthTokens, JwtPayload, UserRole } from '../types';

const MAX_REFRESH_TOKENS = 5;

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface LoginInput {
  email: string;
  password: string;
}

const buildTokenPayload = (user: IUser): JwtPayload => ({
  userId: user._id.toString(),
  email: user.email,
  role: user.role,
});

const generateAuthTokens = (user: IUser): AuthTokens => {
  const payload = buildTokenPayload(user);
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

const storeRefreshToken = async (userId: string, refreshToken: string): Promise<void> => {
  const hashedToken = hashToken(refreshToken);
  const user = await User.findById(userId).select('+refreshTokens');

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  user.refreshTokens.push(hashedToken);

  while (user.refreshTokens.length > MAX_REFRESH_TOKENS) {
    user.refreshTokens.shift();
  }

  await user.save();
};

const removeRefreshToken = async (userId: string, refreshToken: string): Promise<void> => {
  const hashedToken = hashToken(refreshToken);
  await User.findByIdAndUpdate(userId, {
    $pull: { refreshTokens: hashedToken },
  });
};

export const register = async (input: RegisterInput): Promise<{ user: IUser; tokens: AuthTokens }> => {
  const existingUser = await User.findOne({ email: input.email });
  if (existingUser) {
    throw ApiError.conflict('Email already registered');
  }

  const verificationToken = generateRandomToken();

  const user = await User.create({
    name: input.name,
    email: input.email,
    password: input.password,
    role: input.role ?? 'client',
    verificationToken: hashToken(verificationToken),
  });

  const tokens = generateAuthTokens(user);
  await storeRefreshToken(user._id.toString(), tokens.refreshToken);

  try {
    await sendVerificationEmail(user.email, user.name, verificationToken);
  } catch {
    // Registration succeeds even if email fails; user can request resend later
  }

  return { user, tokens };
};

export const login = async (input: LoginInput): Promise<{ user: IUser; tokens: AuthTokens }> => {
  const user = await User.findOne({ email: input.email }).select('+password');

  if (!user || !(await user.comparePassword(input.password))) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const tokens = generateAuthTokens(user);
  await storeRefreshToken(user._id.toString(), tokens.refreshToken);

  return { user, tokens };
};

export const logout = async (userId: string, refreshToken?: string): Promise<void> => {
  if (refreshToken) {
    await removeRefreshToken(userId, refreshToken);
  }
};

export const refreshTokens = async (refreshToken: string): Promise<AuthTokens> => {
  let payload: JwtPayload;

  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw ApiError.unauthorized('Invalid or expired refresh token');
  }

  const hashedToken = hashToken(refreshToken);
  const user = await User.findById(payload.userId).select('+refreshTokens');

  if (!user || !user.refreshTokens.includes(hashedToken)) {
    throw ApiError.unauthorized('Refresh token has been revoked');
  }

  await removeRefreshToken(user._id.toString(), refreshToken);

  const tokens = generateAuthTokens(user);
  await storeRefreshToken(user._id.toString(), tokens.refreshToken);

  return tokens;
};

export const forgotPassword = async (email: string): Promise<void> => {
  const user = await User.findOne({ email }).select('+resetPasswordToken +resetPasswordExpires');

  if (!user) {
    return;
  }

  const resetToken = generateRandomToken();
  user.resetPasswordToken = hashToken(resetToken);
  user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();

  await sendPasswordResetEmail(user.email, user.name, resetToken);
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  const hashedToken = hashToken(token);
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
  }).select('+resetPasswordToken +resetPasswordExpires +refreshTokens');

  if (!user) {
    throw ApiError.badRequest('Invalid or expired reset token');
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  user.refreshTokens = [];
  await user.save();
};

export const verifyEmail = async (token: string): Promise<IUser> => {
  const hashedToken = hashToken(token);
  const user = await User.findOne({ verificationToken: hashedToken }).select('+verificationToken');

  if (!user) {
    throw ApiError.badRequest('Invalid verification token');
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  return user;
};

export const getCurrentUser = async (userId: string): Promise<IUser> => {
  const user = await User.findById(userId);
  if (!user) {
    throw ApiError.notFound('User not found');
  }
  return user;
};

export const resendVerificationEmail = async (userId: string): Promise<void> => {
  const user = await User.findById(userId).select('+verificationToken');

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  if (user.isVerified) {
    throw ApiError.badRequest('Email is already verified');
  }

  const verificationToken = generateRandomToken();
  user.verificationToken = hashToken(verificationToken);
  await user.save();

  await sendVerificationEmail(user.email, user.name, verificationToken);
};
