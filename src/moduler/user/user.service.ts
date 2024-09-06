import { NextFunction } from 'express';
import config from '../../config';
import { Student } from '../student/student.model';
import { TStudent } from './../student/student.interface';
import { Tuser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: Tuser, studentData: TStudent) => {
  const userData: Partial<Tuser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'student';
  userData.id = '2024100001';

  // create a user
  const userStudent = new User(userData);
  const newUser = await userStudent.save();

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
  }
  const createStudent = new Student(studentData);
  const newStudentData = createStudent.save();
  return newStudentData;
};
export const UserServices = {
  createStudentIntoDB,
};
