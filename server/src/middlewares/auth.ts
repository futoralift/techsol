import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';
import { verifyAccessToken } from '../utils/jwt';
import { getAccessTokenFromCookies } from '../utils/cookies';
import { UserRole } from '../types';

export const protect = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    const token = getAccessTokenFromCookies(req.cookies as Record<string, string>);

    if (!token) {
      throw ApiError.unauthorized('Authentication required');
    }

    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      next(error);
      return;
    }
    next(ApiError.unauthorized('Invalid or expired access token'));
  }
};

export const authorize =
  (...roles: UserRole[]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(ApiError.unauthorized('Authentication required'));
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(ApiError.forbidden('You do not have permission to perform this action'));
      return;
    }

    next();
  };

export const optionalAuth = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    const token = getAccessTokenFromCookies(req.cookies as Record<string, string>);
    if (token) {
      req.user = verifyAccessToken(token);
    }
  } catch {
    // Ignore invalid tokens for optional auth
  }
  next();
};
