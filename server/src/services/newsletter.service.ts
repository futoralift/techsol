import Newsletter, { INewsletter } from '../models/Newsletter';
import { ApiError } from '../utils/apiError';
import { parsePagination } from '../utils/helpers';
import { PaginatedResult } from '../types';

export const subscribe = async (email: string): Promise<INewsletter> => {
  const existing = await Newsletter.findOne({ email });

  if (existing) {
    if (existing.isActive) {
      throw ApiError.conflict('Email is already subscribed');
    }

    existing.isActive = true;
    existing.subscribedAt = new Date();
    await existing.save();
    return existing;
  }

  return Newsletter.create({ email });
};

export const unsubscribe = async (email: string): Promise<INewsletter> => {
  const subscriber = await Newsletter.findOne({ email });

  if (!subscriber || !subscriber.isActive) {
    throw ApiError.notFound('Subscription not found');
  }

  subscriber.isActive = false;
  await subscriber.save();
  return subscriber;
};

export const getAllSubscribers = async (
  page?: number,
  limit?: number,
  activeOnly = true
): Promise<PaginatedResult<INewsletter>> => {
  const { page: p, limit: l, skip } = parsePagination(page, limit);
  const filter = activeOnly ? { isActive: true } : {};

  const [data, total] = await Promise.all([
    Newsletter.find(filter).sort({ subscribedAt: -1 }).skip(skip).limit(l),
    Newsletter.countDocuments(filter),
  ]);

  return {
    data,
    pagination: { page: p, limit: l, total, totalPages: Math.ceil(total / l) || 1 },
  };
};

export const deleteSubscriber = async (id: string): Promise<void> => {
  const subscriber = await Newsletter.findByIdAndDelete(id);
  if (!subscriber) {
    throw ApiError.notFound('Subscriber not found');
  }
};
