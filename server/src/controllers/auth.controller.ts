import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import {
  setAuthCookies,
  clearAuthCookies,
  getRefreshTokenFromCookies,
} from '../utils/cookies';
import * as authService from '../services/auth.service';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { user, tokens } = await authService.register(req.body);
  setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

  res.status(201).json({
    success: true,
    message: 'Registration successful. Please check your email to verify your account.',
    data: { user },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { user, tokens } = await authService.login(req.body);
  setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

  res.json({
    success: true,
    message: 'Login successful',
    data: { user },
  });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = getRefreshTokenFromCookies(req.cookies as Record<string, string>);

  if (req.user) {
    await authService.logout(req.user.userId, refreshToken);
  }

  clearAuthCookies(res);

  res.json({
    success: true,
    message: 'Logged out successfully',
  });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = getRefreshTokenFromCookies(req.cookies as Record<string, string>);

  if (!refreshToken) {
    res.status(401).json({ success: false, message: 'Refresh token not found' });
    return;
  }

  const tokens = await authService.refreshTokens(refreshToken);
  setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

  res.json({
    success: true,
    message: 'Token refreshed successfully',
  });
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  await authService.forgotPassword(req.body.email);

  res.json({
    success: true,
    message: 'If an account with that email exists, a password reset link has been sent',
  });
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { token, password } = req.body;
  await authService.resetPassword(token, password);

  res.json({
    success: true,
    message: 'Password reset successful. Please log in with your new password.',
  });
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.verifyEmail(req.body.token);

  res.json({
    success: true,
    message: 'Email verified successfully',
    data: { user },
  });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.getCurrentUser(req.user!.userId);

  res.json({
    success: true,
    data: { user },
  });
});

export const resendVerification = asyncHandler(async (req: Request, res: Response) => {
  await authService.resendVerificationEmail(req.user!.userId);

  res.json({
    success: true,
    message: 'Verification email sent',
  });
});
