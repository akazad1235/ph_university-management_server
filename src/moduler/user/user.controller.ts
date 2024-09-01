import { NextFunction, Request, Response } from 'express';

const createStudent = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, student } = req.body;
    res.status(200).json({
      success: true,
      message: 'Student has been created successfully!',
      data: [password, student],
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createStudent,
};
