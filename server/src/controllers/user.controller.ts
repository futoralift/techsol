import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { getParam } from '../utils/helpers';
import * as userService from '../services/user.service';
import { UserRole } from '../types';

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.getAllUsers(
    Number(req.query.page),
    Number(req.query.limit),
    req.query.role as UserRole | undefined
  );

  res.json({ success: true, ...result });
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.getUserById(getParam(req.params.id));
  res.json({ success: true, data: user });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.updateUser(getParam(req.params.id), req.body);
  res.json({ success: true, data: user });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  await userService.deleteUser(getParam(req.params.id), req.user!.userId);
  res.json({ success: true, message: 'User deleted successfully' });
});
