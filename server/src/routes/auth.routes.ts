import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { protect } from '../middlewares/auth';
import { authLimiter } from '../middlewares/rateLimiter';
import {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  verifyEmailValidator,
} from '../validators/auth.validator';

const router = Router();

router.post('/register', authLimiter, validate(registerValidator), authController.register);
router.post('/login', authLimiter, validate(loginValidator), authController.login);
router.post('/logout', protect, authController.logout);
router.post('/refresh', authLimiter, authController.refresh);
router.post(
  '/forgot-password',
  authLimiter,
  validate(forgotPasswordValidator),
  authController.forgotPassword
);
router.post(
  '/reset-password',
  authLimiter,
  validate(resetPasswordValidator),
  authController.resetPassword
);
router.post('/verify-email', validate(verifyEmailValidator), authController.verifyEmail);
router.get('/me', protect, authController.getMe);
router.post('/resend-verification', protect, authController.resendVerification);

export default router;
