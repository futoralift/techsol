import { Router } from 'express';
import * as serviceController from '../controllers/service.controller';
import { validate } from '../middlewares/validate';
import { protect, authorize, optionalAuth } from '../middlewares/auth';
import {
  createServiceValidator,
  updateServiceValidator,
} from '../validators/service.validator';

const router = Router();

router.get('/', optionalAuth, serviceController.getServices);
router.get('/slug/:slug', optionalAuth, serviceController.getService);
router.get('/:id', protect, authorize('admin'), serviceController.getServiceById);
router.post(
  '/',
  protect,
  authorize('admin'),
  validate(createServiceValidator),
  serviceController.createService
);
router.put(
  '/:id',
  protect,
  authorize('admin'),
  validate(updateServiceValidator),
  serviceController.updateService
);
router.delete('/:id', protect, authorize('admin'), serviceController.deleteService);

export default router;
