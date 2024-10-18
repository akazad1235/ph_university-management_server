import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.model';
import { TStudent } from './../student/student.interface';
import { Tuser } from './user.interface';
import { User } from './user.model';
import firstGenerateStudentId from './user.utils';

const createStudentIntoDB = async (password: Tuser, studentData: TStudent) => {
  const userData: Partial<Tuser> = {};

  // generate hash password
  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  // find academic semester data
  const findAcademicSemester = await AcademicSemester.findById(
    '66e3702709cf92371dbd8e6b',
  );

  // call from utils for generate student unique id
  const firstUniqueId = await firstGenerateStudentId(findAcademicSemester);
  //  return firstUniqueId;
  userData.id = firstUniqueId;
  // create a user
  const userStudent = new User(userData);
  const newUser = await userStudent.save();

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
  }
  const createStudent = new Student(studentData);
  const newStudentData = await createStudent.save();
  return newStudentData;
};
export const UserServices = {
  createStudentIntoDB,
};
