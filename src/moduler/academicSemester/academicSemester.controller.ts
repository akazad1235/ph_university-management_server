import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createAcademicSemester = catchAsync(async (req, res) => {
  const body = req.body;
  const storeService =
    await AcademicSemesterService.createAcademicSemesterIntoDB(body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester has been created successfully!',
    data: storeService,
  });
});

const getAllSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.getAllAcademicSemesterFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters fetched successfully!',
    data: result,
  });
});
const showSepecificAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.showSpecificAcademicSemester(
    req.params,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters fetched successfully!',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllSemester,
  showSepecificAcademicSemester,
};
