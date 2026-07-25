import { body } from 'express-validator';

export const createProjectValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('client').optional().trim(),
  body('technologies').optional().isArray().withMessage('Technologies must be an array'),
  body('technologies.*').optional().isString().withMessage('Each technology must be a string'),
  body('images').optional().isArray().withMessage('Images must be an array'),
  body('images.*').optional().isURL().withMessage('Each image must be a valid URL'),
  body('featuredImage').optional().trim().isURL().withMessage('Featured image must be a valid URL'),
  body('liveUrl').optional().trim().isURL().withMessage('Live URL must be a valid URL'),
  body('isFeatured').optional().isBoolean().withMessage('isFeatured must be a boolean'),
  body('isPublished').optional().isBoolean().withMessage('isPublished must be a boolean'),
];

export const updateProjectValidator = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('category').optional().trim().notEmpty().withMessage('Category cannot be empty'),
  body('client').optional().trim(),
  body('technologies').optional().isArray().withMessage('Technologies must be an array'),
  body('technologies.*').optional().isString().withMessage('Each technology must be a string'),
  body('images').optional().isArray().withMessage('Images must be an array'),
  body('images.*').optional().isURL().withMessage('Each image must be a valid URL'),
  body('featuredImage').optional().trim().isURL().withMessage('Featured image must be a valid URL'),
  body('liveUrl').optional().trim().isURL().withMessage('Live URL must be a valid URL'),
  body('isFeatured').optional().isBoolean().withMessage('isFeatured must be a boolean'),
  body('isPublished').optional().isBoolean().withMessage('isPublished must be a boolean'),
];
