import { Types } from 'mongoose';

export type TStudent = {
  name: string;
  id: string;
  user: Types.ObjectId;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  profileImage: string;
};
