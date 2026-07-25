import User, { IUser } from '../models/User';
import { ApiError } from '../utils/apiError';
import { parsePagination } from '../utils/helpers';
import { PaginatedResult, UserRole } from '../types';

export interface UpdateUserInput {
  name?: string;
  role?: UserRole;
}

export const getAllUsers = async (
  page?: number,
  limit?: number,
  role?: UserRole
): Promise<PaginatedResult<IUser>> => {
  const { page: p, limit: l, skip } = parsePagination(page, limit);
  const filter = role ? { role } : {};

  const [data, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(l),
    User.countDocuments(filter),
  ]);

  return {
    data,
    pagination: { page: p, limit: l, total, totalPages: Math.ceil(total / l) || 1 },
  };
};

export const getUserById = async (id: string): Promise<IUser> => {
  const user = await User.findById(id);
  if (!user) {
    throw ApiError.notFound('User not found');
  }
  return user;
};

export const updateUser = async (id: string, input: UpdateUserInput): Promise<IUser> => {
  const user = await User.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw ApiError.notFound('User not found');
  }
  return user;
};

export const deleteUser = async (id: string, requesterId: string): Promise<void> => {
  if (id === requesterId) {
    throw ApiError.badRequest('You cannot delete your own account');
  }

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw ApiError.notFound('User not found');
  }
};
