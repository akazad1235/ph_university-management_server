import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'something went wrong!';

  type TErrorSource = {
    path: string | number;
    message: string;
  }[];

  const errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'zod errors';
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;
