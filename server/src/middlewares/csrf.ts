import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { env } from '../config/env';
import { ApiError } from '../utils/apiError';
import { CSRF_COOKIE, CSRF_HEADER, setCsrfCookie } from '../utils/cookies';
import { generateRandomToken } from '../utils/jwt';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

const CSRF_EXEMPT_PATHS = [
  '/api/v1/auth/login',
  '/api/v1/auth/register',
  '/api/v1/auth/refresh',
  '/api/v1/auth/forgot-password',
  '/api/v1/auth/reset-password',
  '/api/v1/auth/verify-email',
  '/api/v1/contact',
  '/api/v1/newsletter/subscribe',
];

const signCsrfToken = (token: string): string => {
  return crypto.createHmac('sha256', env.csrfSecret).update(token).digest('hex');
};

export const generateCsrfToken = (): { token: string; signedToken: string } => {
  const token = generateRandomToken();
  const signedToken = signCsrfToken(token);
  return { token, signedToken };
};

export const csrfProtection = (req: Request, res: Response, next: NextFunction): void => {
  if (SAFE_METHODS.has(req.method)) {
    const cookieToken = req.cookies?.[CSRF_COOKIE] as string | undefined;
    if (!cookieToken) {
      const { signedToken } = generateCsrfToken();
      setCsrfCookie(res, signedToken);
    }
    next();
    return;
  }

  const isExempt = CSRF_EXEMPT_PATHS.some((path) => req.path === path || req.originalUrl.startsWith(path));
  if (isExempt) {
    next();
    return;
  }

  const cookieToken = req.cookies?.[CSRF_COOKIE] as string | undefined;
  const headerToken = req.get(CSRF_HEADER);

  if (!cookieToken || !headerToken) {
    next(ApiError.forbidden('CSRF token missing'));
    return;
  }

  const expectedSignature = signCsrfToken(headerToken);
  if (cookieToken !== expectedSignature) {
    next(ApiError.forbidden('Invalid CSRF token'));
    return;
  }

  next();
};

export const csrfTokenHandler = (_req: Request, res: Response): void => {
  const { token, signedToken } = generateCsrfToken();
  setCsrfCookie(res, signedToken);
  res.json({
    success: true,
    csrfToken: token,
  });
};
