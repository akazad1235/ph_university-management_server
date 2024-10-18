import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const body = req.body;
  const result = AcademicFacultyService.createAcademicfacultyIntoDB(body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created success',
    data: result,
  });
});
const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = AcademicFacultyService.getAllAcademicFacultyIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty fetch success',
    data: result,
  });
});
const getSpecificAcademicFaculty = catchAsync(async (req, res) => {
  //const result = AcademicFacultyService.getSpecificAcademicFaculty(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty fetch success ss',
    data: req.body,
  });
});
// update academic faulties
const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params; // e.g., /update-faculty/:id
  const updateData = req.body; // Contains the update information

  // Create a payload that combines the id and update data
  const payload = { id, ...updateData };
  const updateService =
    await AcademicFacultyService.updateSepcificAcademicFaulty(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty fetch for update using patch',
    data: updateService,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSpecificAcademicFaculty,
  updateAcademicFaculty,
};
