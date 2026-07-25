import Service, { IService } from '../models/Service';
import { ApiError } from '../utils/apiError';
import { slugify, parsePagination } from '../utils/helpers';
import { PaginatedResult } from '../types';

export interface CreateServiceInput {
  title: string;
  description: string;
  icon: string;
  features?: string[];
  image?: string;
  isActive?: boolean;
  order?: number;
}

export interface UpdateServiceInput extends Partial<CreateServiceInput> {}

const ensureUniqueSlug = async (baseSlug: string, excludeId?: string): Promise<string> => {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const query: Record<string, unknown> = { slug };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const existing = await Service.findOne(query);
    if (!existing) return slug;

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

export const getAllServices = async (
  page?: number,
  limit?: number,
  activeOnly = false
): Promise<PaginatedResult<IService>> => {
  const { page: p, limit: l, skip } = parsePagination(page, limit);
  const filter = activeOnly ? { isActive: true } : {};

  const [data, total] = await Promise.all([
    Service.find(filter).sort({ order: 1, createdAt: -1 }).skip(skip).limit(l),
    Service.countDocuments(filter),
  ]);

  return {
    data,
    pagination: {
      page: p,
      limit: l,
      total,
      totalPages: Math.ceil(total / l) || 1,
    },
  };
};

export const getServiceBySlug = async (slug: string, activeOnly = false): Promise<IService> => {
  const filter: Record<string, unknown> = { slug };
  if (activeOnly) filter.isActive = true;

  const service = await Service.findOne(filter);
  if (!service) {
    throw ApiError.notFound('Service not found');
  }
  return service;
};

export const getServiceById = async (id: string): Promise<IService> => {
  const service = await Service.findById(id);
  if (!service) {
    throw ApiError.notFound('Service not found');
  }
  return service;
};

export const createService = async (input: CreateServiceInput): Promise<IService> => {
  const baseSlug = slugify(input.title);
  const slug = await ensureUniqueSlug(baseSlug);

  return Service.create({ ...input, slug });
};

export const updateService = async (id: string, input: UpdateServiceInput): Promise<IService> => {
  const service = await Service.findById(id);
  if (!service) {
    throw ApiError.notFound('Service not found');
  }

  if (input.title && input.title !== service.title) {
    const baseSlug = slugify(input.title);
    service.slug = await ensureUniqueSlug(baseSlug, id);
  }

  Object.assign(service, input);
  await service.save();
  return service;
};

export const deleteService = async (id: string): Promise<void> => {
  const service = await Service.findByIdAndDelete(id);
  if (!service) {
    throw ApiError.notFound('Service not found');
  }
};
