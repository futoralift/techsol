import { Router } from 'express';
import * as mediaController from '../controllers/media.controller';
import { protect, authorize } from '../middlewares/auth';
import { uploadLimiter } from '../middlewares/rateLimiter';
import { upload } from '../middlewares/upload';

const router = Router();

router.get('/', protect, authorize('admin'), mediaController.getMedia);
router.get('/:id', protect, authorize('admin'), mediaController.getMediaItem);
router.post(
  '/upload',
  protect,
  authorize('admin'),
  uploadLimiter,
  upload.single('file'),
  mediaController.uploadMedia
);
router.delete('/:id', protect, authorize('admin'), mediaController.deleteMedia);

export default router;
