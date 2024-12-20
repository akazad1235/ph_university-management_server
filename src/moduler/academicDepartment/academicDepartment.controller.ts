import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const body = req.body;
  const result = AcademicDepartmentService.createAcademicDepartmentIntoDB(body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department created success',
    data: result,
  });
});
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentService.getAllAcademicDepartmentIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department fetch success',
    data: result,
  });
});
const getSpecificAcademicDepartment = catchAsync(async (req, res) => {
  const id = req.params;
  const result =
    await AcademicDepartmentService.getSpecificAcademicDepartment(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department fetch success ss',
    data: result,
  });
});
// update academic faulties
const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params; // e.g., /update-faculty/:id
  const updateData = req.body; // Contains the update information

  // Create a payload that combines the id and update data
  const payload = { id, ...updateData };
  const updateService =
    await AcademicDepartmentService.updateSepcificAcademicDepartment(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department successfully updated',
    data: updateService,
  });
});
// delete academic faculties
const deleteAcademicDepartment = catchAsync(async (req, res) => {
  const id = req.params;
  const result =
    await AcademicDepartmentService.deleteSepcificAcademicDepartment(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Successfully Deleted',
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSpecificAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
