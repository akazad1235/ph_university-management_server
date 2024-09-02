import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, student } = req.body;
    const data = UserServices.createStudentIntoDB(password, student);
    res.status(200).json({
      success: true,
      message: 'Student has been created successfully!',
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createStudent,
};
