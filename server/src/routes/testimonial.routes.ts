import { Router } from 'express';
import * as testimonialController from '../controllers/testimonial.controller';
import { validate } from '../middlewares/validate';
import { protect, authorize, optionalAuth } from '../middlewares/auth';
import {
  createTestimonialValidator,
  updateTestimonialValidator,
} from '../validators/testimonial.validator';

const router = Router();

router.get('/', optionalAuth, testimonialController.getTestimonials);
router.get('/:id', optionalAuth, testimonialController.getTestimonial);
router.post(
  '/',
  protect,
  authorize('admin'),
  validate(createTestimonialValidator),
  testimonialController.createTestimonial
);
router.put(
  '/:id',
  protect,
  authorize('admin'),
  validate(updateTestimonialValidator),
  testimonialController.updateTestimonial
);
router.delete('/:id', protect, authorize('admin'), testimonialController.deleteTestimonial);

export default router;
