import { Types } from 'mongoose';

export type TStudent = {
  name: string;
  user: Types.ObjectId;
  academicSemester: Types.ObjectId;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  profileImage: string;
};
