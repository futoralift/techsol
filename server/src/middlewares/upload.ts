import multer from 'multer';
import { Request } from 'express';
import { v2 as cloudinaryV2 } from 'cloudinary';
import { ApiError } from '../utils/apiError';
import cloudinary from '../config/cloudinary';

const storage = multer.memoryStorage();

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  const allowedMimes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    'application/pdf',
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(ApiError.badRequest('Invalid file type. Allowed: JPEG, PNG, WebP, GIF, SVG, PDF'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export interface CloudinaryUploadResult {
  publicId: string;
  url: string;
  filename: string;
  mimetype: string;
  size: number;
}

export const uploadToCloudinary = (
  file: Express.Multer.File,
  folder = 'techsol-media'
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error || !result) {
          reject(ApiError.internal('Failed to upload file to Cloudinary'));
          return;
        }

        resolve({
          publicId: result.public_id,
          url: result.secure_url,
          filename: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
        });
      }
    );

    uploadStream.end(file.buffer);
  });
};

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  await cloudinaryV2.uploader.destroy(publicId);
};
