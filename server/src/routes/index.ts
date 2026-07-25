import { Router } from 'express';
import authRoutes from './auth.routes';
import serviceRoutes from './service.routes';
import projectRoutes from './project.routes';
import testimonialRoutes from './testimonial.routes';
import blogRoutes from './blog.routes';
import contactRoutes from './contact.routes';
import newsletterRoutes from './newsletter.routes';
import mediaRoutes from './media.routes';
import userRoutes from './user.routes';
import analyticsRoutes from './analytics.routes';
import { csrfTokenHandler } from '../middlewares/csrf';

const router = Router();

router.get('/csrf-token', csrfTokenHandler);

router.use('/auth', authRoutes);
router.use('/services', serviceRoutes);
router.use('/projects', projectRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/blogs', blogRoutes);
router.use('/contact', contactRoutes);
router.use('/newsletter', newsletterRoutes);
router.use('/media', mediaRoutes);
router.use('/users', userRoutes);
router.use('/analytics', analyticsRoutes);

export default router;
