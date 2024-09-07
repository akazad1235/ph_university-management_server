import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createAcademicSemester = catchAsync(async (req, res) => {
  const body = req.body;
  const storeService =
    AcademicSemesterService.createAcademicSemesterIntoDB(body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester has been created successfully!',
    data: storeService,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
};
