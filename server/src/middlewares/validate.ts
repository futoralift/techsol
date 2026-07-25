import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { ApiError } from '../utils/apiError';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(
        ApiError.badRequest(
          'Validation failed',
          errors.array().map((err) => ({
            field: 'path' in err ? err.path : undefined,
            message: err.msg,
          }))
        )
      );
      return;
    }

    next();
  };
};
