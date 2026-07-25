import { Router } from 'express';
import * as analyticsController from '../controllers/analytics.controller';
import { protect, authorize } from '../middlewares/auth';

const router = Router();

router.use(protect, authorize('admin'));

router.get('/overview', analyticsController.getOverview);
router.get('/recent', analyticsController.getRecentActivity);

export default router;
