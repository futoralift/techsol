import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { getParam } from '../utils/helpers';
import { ApiError } from '../utils/apiError';
import { uploadToCloudinary } from '../middlewares/upload';
import * as mediaService from '../services/media.service';

export const getMedia = asyncHandler(async (req: Request, res: Response) => {
  const result = await mediaService.getAllMedia(
    Number(req.query.page),
    Number(req.query.limit),
    req.query.uploadedBy as string | undefined
  );

  res.json({ success: true, ...result });
});

export const getMediaItem = asyncHandler(async (req: Request, res: Response) => {
  const media = await mediaService.getMediaById(getParam(req.params.id));
  res.json({ success: true, data: media });
});

export const uploadMedia = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw ApiError.badRequest('No file uploaded');
  }

  const uploadResult = await uploadToCloudinary(req.file);
  const media = await mediaService.createMedia({
    ...uploadResult,
    uploadedBy: req.user!.userId,
  });

  res.status(201).json({ success: true, data: media });
});

export const deleteMedia = asyncHandler(async (req: Request, res: Response) => {
  await mediaService.deleteMedia(getParam(req.params.id));
  res.json({ success: true, message: 'Media deleted successfully' });
});
