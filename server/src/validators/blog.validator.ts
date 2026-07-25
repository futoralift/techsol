import { body } from 'express-validator';

export const createBlogValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 250 })
    .withMessage('Title cannot exceed 250 characters'),
  body('excerpt')
    .trim()
    .notEmpty()
    .withMessage('Excerpt is required')
    .isLength({ max: 500 })
    .withMessage('Excerpt cannot exceed 500 characters'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('coverImage').optional().trim().isURL().withMessage('Cover image must be a valid URL'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('tags.*').optional().isString().withMessage('Each tag must be a string'),
  body('isPublished').optional().isBoolean().withMessage('isPublished must be a boolean'),
];

export const updateBlogValidator = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 250 })
    .withMessage('Title cannot exceed 250 characters'),
  body('excerpt')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Excerpt cannot be empty')
    .isLength({ max: 500 })
    .withMessage('Excerpt cannot exceed 500 characters'),
  body('content').optional().trim().notEmpty().withMessage('Content cannot be empty'),
  body('coverImage').optional().trim().isURL().withMessage('Cover image must be a valid URL'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('tags.*').optional().isString().withMessage('Each tag must be a string'),
  body('isPublished').optional().isBoolean().withMessage('isPublished must be a boolean'),
];
