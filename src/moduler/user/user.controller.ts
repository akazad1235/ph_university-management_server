import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../app/errors/AppErros';

const createStudent = catchAsync(async (req, res) => {
  throw new AppError('azad test app error', 500);
  const { password, student } = req.body;
  const data = await UserServices.createStudentIntoDB(password, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student has been created successfully!',
    data: data,
  });
});

export const UserController = {
  createStudent,
};
