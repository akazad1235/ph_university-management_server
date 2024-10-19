import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const createData = new AcademicDepartment(payload);
  const result = await createData.save();
  return result;
};
const getAllAcademicDepartmentIntoDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};
const getSpecificAcademicDepartment = async (payload: Any) => {
  const result = await AcademicDepartment.findById(payload.id).populate(
    'academicFaculty',
  );
  return result;
};
const updateSepcificAcademicDepartment = async (payload: Any) => {
  const { id, ...updateFields } = payload; // Destructure the id and the fields to update

  const updatedData = await AcademicDepartment.findByIdAndUpdate(
    id,
    updateFields,
    { new: true },
  );

  return updatedData;
};
const deleteSepcificAcademicDepartment = async (payload: Any) => {
  const id = payload.id;
  const updatedData = await AcademicDepartment.findByIdAndDelete(id);

  return updatedData;
};

export const AcademicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentIntoDB,
  getSpecificAcademicDepartment,
  updateSepcificAcademicDepartment,
  deleteSepcificAcademicDepartment,
};
