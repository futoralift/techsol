import { body } from 'express-validator';

export const createServiceValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 150 })
    .withMessage('Title cannot exceed 150 characters'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('icon').trim().notEmpty().withMessage('Icon is required'),
  body('features').optional().isArray().withMessage('Features must be an array'),
  body('features.*').optional().isString().withMessage('Each feature must be a string'),
  body('image').optional().trim().isURL().withMessage('Image must be a valid URL'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
  body('order').optional().isInt({ min: 0 }).withMessage('Order must be a non-negative integer'),
];

export const updateServiceValidator = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 150 })
    .withMessage('Title cannot exceed 150 characters'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('icon').optional().trim().notEmpty().withMessage('Icon cannot be empty'),
  body('features').optional().isArray().withMessage('Features must be an array'),
  body('features.*').optional().isString().withMessage('Each feature must be a string'),
  body('image').optional().trim().isURL().withMessage('Image must be a valid URL'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
  body('order').optional().isInt({ min: 0 }).withMessage('Order must be a non-negative integer'),
];
