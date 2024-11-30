import { Request, Response } from 'express';
import { StudentService } from './student.service';
import AppError from '../../app/errors/AppErros';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await StudentService.getAllStudentIntoDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student daa fetch successfully!',
    data: result,
  });
});
export const StudnetController = {
  getAllStudents,
};
