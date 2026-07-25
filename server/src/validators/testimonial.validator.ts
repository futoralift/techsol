import { body } from 'express-validator';

export const createTestimonialValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('role').trim().notEmpty().withMessage('Role is required'),
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ max: 1000 })
    .withMessage('Content cannot exceed 1000 characters'),
  body('avatar').optional().trim().isURL().withMessage('Avatar must be a valid URL'),
  body('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('isPublished').optional().isBoolean().withMessage('isPublished must be a boolean'),
];

export const updateTestimonialValidator = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('role').optional().trim().notEmpty().withMessage('Role cannot be empty'),
  body('company').optional().trim().notEmpty().withMessage('Company cannot be empty'),
  body('content')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Content cannot be empty')
    .isLength({ max: 1000 })
    .withMessage('Content cannot exceed 1000 characters'),
  body('avatar').optional().trim().isURL().withMessage('Avatar must be a valid URL'),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('isPublished').optional().isBoolean().withMessage('isPublished must be a boolean'),
];
