import { Router } from 'express';
import * as blogController from '../controllers/blog.controller';
import { validate } from '../middlewares/validate';
import { protect, authorize, optionalAuth } from '../middlewares/auth';
import { createBlogValidator, updateBlogValidator } from '../validators/blog.validator';

const router = Router();

router.get('/', optionalAuth, blogController.getBlogs);
router.get('/slug/:slug', optionalAuth, blogController.getBlog);
router.get('/:id', protect, authorize('admin'), blogController.getBlogById);
router.post(
  '/',
  protect,
  authorize('admin'),
  validate(createBlogValidator),
  blogController.createBlog
);
router.put(
  '/:id',
  protect,
  authorize('admin'),
  validate(updateBlogValidator),
  blogController.updateBlog
);
router.delete('/:id', protect, authorize('admin'), blogController.deleteBlog);

export default router;
