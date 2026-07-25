import { Router } from 'express';
import * as contactController from '../controllers/contact.controller';
import { validate } from '../middlewares/validate';
import { protect, authorize } from '../middlewares/auth';
import { contactLimiter } from '../middlewares/rateLimiter';
import {
  createContactValidator,
  updateContactStatusValidator,
} from '../validators/contact.validator';

const router = Router();

router.post(
  '/',
  contactLimiter,
  validate(createContactValidator),
  contactController.createContact
);
router.get('/', protect, authorize('admin'), contactController.getContacts);
router.get('/:id', protect, authorize('admin'), contactController.getContact);
router.patch(
  '/:id/status',
  protect,
  authorize('admin'),
  validate(updateContactStatusValidator),
  contactController.updateContactStatus
);
router.delete('/:id', protect, authorize('admin'), contactController.deleteContact);

export default router;
