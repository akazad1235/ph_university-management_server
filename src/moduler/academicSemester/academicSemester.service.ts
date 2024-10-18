import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  type TAcademicSemesterNameCodeMapper = {
    [key: string]: string;
  };
  const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn: '01',
    Summar: '02',
    Fall: '03',
  };
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Your Semester and code not valid!');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};
const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};
const showSpecificAcademicSemester = async (payload) => {
  const result = await AcademicSemester.find({ _id: payload.id });
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  showSpecificAcademicSemester,
};
