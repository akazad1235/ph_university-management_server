import { AnyZodObject, ZodError } from 'zod';
import { NextFunction, Request, Response } from 'express';

const validateRequest = (schemas: AnyZodObject[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      for (const schema of schemas) {
        await schema.parseAsync({
          body: req.body,
        });
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Send a response with the validation error details
        return res.status(400).json({
          success: false,
          errors: error.issues.map((issue) => ({
            path: issue?.path[issue.path.length - 1],
            message: issue.message,
          })),
        });
      }
      next(error);
    }
  };
};

export default validateRequest;
