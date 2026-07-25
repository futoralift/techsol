import { Response } from 'express';
import { env } from '../config/env';

const ACCESS_TOKEN_COOKIE = 'accessToken';
const REFRESH_TOKEN_COOKIE = 'refreshToken';
const CSRF_TOKEN_COOKIE = 'csrfToken';

const cookieOptions = {
  httpOnly: true,
  secure: env.isProduction,
  sameSite: 'strict' as const,
  path: '/',
};

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
): void => {
  res.cookie(ACCESS_TOKEN_COOKIE, accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });

  res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const clearAuthCookies = (res: Response): void => {
  res.clearCookie(ACCESS_TOKEN_COOKIE, cookieOptions);
  res.clearCookie(REFRESH_TOKEN_COOKIE, cookieOptions);
};

export const getAccessTokenFromCookies = (cookies: Record<string, string>): string | undefined => {
  return cookies[ACCESS_TOKEN_COOKIE];
};

export const getRefreshTokenFromCookies = (cookies: Record<string, string>): string | undefined => {
  return cookies[REFRESH_TOKEN_COOKIE];
};

export const setCsrfCookie = (res: Response, token: string): void => {
  res.cookie(CSRF_TOKEN_COOKIE, token, {
    httpOnly: false,
    secure: env.isProduction,
    sameSite: 'strict',
    path: '/',
    maxAge: 24 * 60 * 60 * 1000,
  });
};

export const CSRF_HEADER = 'x-csrf-token';
export const CSRF_COOKIE = CSRF_TOKEN_COOKIE;
