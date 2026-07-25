import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { validate } from '../middlewares/validate';
import { protect, authorize } from '../middlewares/auth';
import { updateUserValidator } from '../validators/newsletter.validator';

const router = Router();

router.use(protect, authorize('admin'));

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', validate(updateUserValidator), userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
