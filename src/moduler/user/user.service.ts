import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.model';
import { TStudent } from './../student/student.interface';
import { Tuser } from './user.interface';
import { User } from './user.model';
import firstGenerateStudentId from './user.utils';

const createStudentIntoDB = async (password: Tuser, studentData: TStudent) => {
  const userData: Partial<Tuser> = {};

  // generate hash password or use default
  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  // find academic semester data
  const findAcademicSemester = await AcademicSemester.findById(
    '66f770624b938a79106bb32b',
  );

  if (!findAcademicSemester) {
    throw new Error('Academic semester not found');
  }

  // generate unique student id
  const firstUniqueId = await firstGenerateStudentId(findAcademicSemester);
  userData.id = firstUniqueId;

  // initialize session
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();

    // create a new User
    const userStudent = new User(userData);
    const newUser = await userStudent.save({ session });

    if (!newUser) {
      throw new Error('User creation failed');
    }

    // associate user id with student data
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    // create a new Student
    const createStudent = new Student(studentData);
    const newStudentData = await createStudent.save({ session });

    // commit the transaction
    await session.commitTransaction();
    session.endSession();
    // return created student data
    return newStudentData;
  } catch (error) {
    // abort transaction if something goes wrong
    await session.abortTransaction();
    console.error('Transaction failed:', error);
    throw new Error('Failed to create student');
  }
};

export const UserServices = {
  createStudentIntoDB,
};
