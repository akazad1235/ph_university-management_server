import { AnyZodObject, ZodError } from 'zod';
import { NextFunction, Request, Response } from 'express';
import config from '../../config';

const validateRequest = (schemas: AnyZodObject[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationErrors: ZodError[] = [];

      // Iterate through all schemas passed in the array and validate
      for (const schema of schemas) {
        const result = await schema.safeParseAsync({
          body: req.body,
          query: req.query,
          params: req.params,
        });

        // If validation fails, collect the error
        if (!result.success) {
          validationErrors.push(result.error);
        }
      }

      // If there are any validation errors, return them
      if (validationErrors.length > 0) {
        const allIssues = validationErrors.flatMap((error) => error.issues);

        return res.status(400).json({
          success: false,
          message: 'Validation Error',
          errorsSource: allIssues.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
          })),
          //stack: config.NODE_ENV === 'development' ? validationErrors : '',
        });
      }

      // If no errors, continue to the next middleware
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
