import { Router } from 'express';
import * as newsletterController from '../controllers/newsletter.controller';
import { validate } from '../middlewares/validate';
import { protect, authorize } from '../middlewares/auth';
import { subscribeNewsletterValidator } from '../validators/newsletter.validator';

const router = Router();

router.post('/subscribe', validate(subscribeNewsletterValidator), newsletterController.subscribe);
router.post('/unsubscribe', validate(subscribeNewsletterValidator), newsletterController.unsubscribe);
router.get('/', protect, authorize('admin'), newsletterController.getSubscribers);
router.delete('/:id', protect, authorize('admin'), newsletterController.deleteSubscriber);

export default router;
