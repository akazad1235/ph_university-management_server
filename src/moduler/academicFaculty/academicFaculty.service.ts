import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicfacultyIntoDB = async (payload: TAcademicFaculty) => {
  const createData = new AcademicFaculty(payload);
  const result = await createData.save();
  return result;
};
const getAllAcademicFacultyIntoDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
const getSpecificAcademicFaculty = async (payload: Any) => {
  // const result = await AcademicFaculty.findByIdAndUpdate(
  //   id, // The ID of the document you want to update
  //   { name }, // The fields to update
  //   { new: true }, // Option to return the updated document
  // );
  const result = await AcademicFaculty.findById('66ec6d9a34abe24717725f67');
  return result;
};
const updateSepcificAcademicFaulty = async (payload: Any) => {
  const { id, ...updateFields } = payload; // Destructure the id and the fields to update

  const updatedData = await AcademicFaculty.findByIdAndUpdate(
    id,
    updateFields,
    { new: true },
  );

  return updatedData;
};
const deleteSepcificAcademicFaulty = async (payload: Any) => {
  const id = payload.id;
  const updatedData = await AcademicFaculty.findByIdAndDelete(id);

  return updatedData;
};

export const AcademicFacultyService = {
  createAcademicfacultyIntoDB,
  getAllAcademicFacultyIntoDB,
  getSpecificAcademicFaculty,
  updateSepcificAcademicFaulty,
  deleteSepcificAcademicFaulty,
};
