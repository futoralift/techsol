import Media, { IMedia } from '../models/Media';
import { ApiError } from '../utils/apiError';
import { deleteFromCloudinary } from '../middlewares/upload';
import { parsePagination } from '../utils/helpers';
import { PaginatedResult } from '../types';

export interface CreateMediaInput {
  publicId: string;
  url: string;
  filename: string;
  mimetype: string;
  size: number;
  uploadedBy: string;
}

export const getAllMedia = async (
  page?: number,
  limit?: number,
  uploadedBy?: string
): Promise<PaginatedResult<IMedia>> => {
  const { page: p, limit: l, skip } = parsePagination(page, limit);
  const filter = uploadedBy ? { uploadedBy } : {};

  const [data, total] = await Promise.all([
    Media.find(filter)
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(l),
    Media.countDocuments(filter),
  ]);

  return {
    data,
    pagination: { page: p, limit: l, total, totalPages: Math.ceil(total / l) || 1 },
  };
};

export const getMediaById = async (id: string): Promise<IMedia> => {
  const media = await Media.findById(id).populate('uploadedBy', 'name email');
  if (!media) {
    throw ApiError.notFound('Media not found');
  }
  return media;
};

export const createMedia = async (input: CreateMediaInput): Promise<IMedia> => {
  const media = await Media.create(input);
  return media.populate('uploadedBy', 'name email');
};

export const deleteMedia = async (id: string): Promise<void> => {
  const media = await Media.findById(id);
  if (!media) {
    throw ApiError.notFound('Media not found');
  }

  try {
    await deleteFromCloudinary(media.publicId);
  } catch {
    // Continue with DB deletion even if Cloudinary deletion fails
  }

  await media.deleteOne();
};
