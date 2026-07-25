import Testimonial, { ITestimonial } from '../models/Testimonial';
import { ApiError } from '../utils/apiError';
import { parsePagination } from '../utils/helpers';
import { PaginatedResult } from '../types';

export interface CreateTestimonialInput {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
  isPublished?: boolean;
}

export interface UpdateTestimonialInput extends Partial<CreateTestimonialInput> {}

export const getAllTestimonials = async (
  page?: number,
  limit?: number,
  publishedOnly = false
): Promise<PaginatedResult<ITestimonial>> => {
  const { page: p, limit: l, skip } = parsePagination(page, limit);
  const filter = publishedOnly ? { isPublished: true } : {};

  const [data, total] = await Promise.all([
    Testimonial.find(filter).sort({ createdAt: -1 }).skip(skip).limit(l),
    Testimonial.countDocuments(filter),
  ]);

  return {
    data,
    pagination: { page: p, limit: l, total, totalPages: Math.ceil(total / l) || 1 },
  };
};

export const getTestimonialById = async (id: string, publishedOnly = false): Promise<ITestimonial> => {
  const filter: Record<string, unknown> = { _id: id };
  if (publishedOnly) filter.isPublished = true;

  const testimonial = await Testimonial.findOne(filter);
  if (!testimonial) {
    throw ApiError.notFound('Testimonial not found');
  }
  return testimonial;
};

export const createTestimonial = async (input: CreateTestimonialInput): Promise<ITestimonial> => {
  return Testimonial.create(input);
};

export const updateTestimonial = async (
  id: string,
  input: UpdateTestimonialInput
): Promise<ITestimonial> => {
  const testimonial = await Testimonial.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  });

  if (!testimonial) {
    throw ApiError.notFound('Testimonial not found');
  }
  return testimonial;
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  const testimonial = await Testimonial.findByIdAndDelete(id);
  if (!testimonial) {
    throw ApiError.notFound('Testimonial not found');
  }
};
