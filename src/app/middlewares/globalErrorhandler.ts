import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ZodError } from 'zod';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);

  const statusCode = err.statusCode || 500;
  let message = err.message || 'something went wrong!';

  type TErrorSource = {
    path: string | number;
    message: string;
  }[];

  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  if (err instanceof ZodError) {
    // Send a response with the validation error details
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: err.issues.map((issue) => ({
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      })),
    });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    // Handle Mongoose validation errors
    message = 'mongoose validation error';
    errorSource = Object.values(err.errors).map((error) => ({
      path: error.path,
      message: error.message,
    }));
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    // error: err,
  });
};

export default globalErrorHandler;
