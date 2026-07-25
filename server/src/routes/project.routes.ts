import { Router } from 'express';
import * as projectController from '../controllers/project.controller';
import { validate } from '../middlewares/validate';
import { protect, authorize, optionalAuth } from '../middlewares/auth';
import {
  createProjectValidator,
  updateProjectValidator,
} from '../validators/project.validator';

const router = Router();

router.get('/', optionalAuth, projectController.getProjects);
router.get('/slug/:slug', optionalAuth, projectController.getProject);
router.get('/:id', protect, authorize('admin'), projectController.getProjectById);
router.post(
  '/',
  protect,
  authorize('admin'),
  validate(createProjectValidator),
  projectController.createProject
);
router.put(
  '/:id',
  protect,
  authorize('admin'),
  validate(updateProjectValidator),
  projectController.updateProject
);
router.delete('/:id', protect, authorize('admin'), projectController.deleteProject);

export default router;
