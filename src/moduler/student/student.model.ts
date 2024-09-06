import { Schema, model } from 'mongoose';
import { TStudent } from './student.interface';

const studentSchema = new Schema<TStudent>({
  name: {
    type: String,
    required: [true, 'name field is requrieds'],
  },
  id: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  presentAddress: {
    type: String,
  },
});

export const Student = model<TStudent>('Student', studentSchema);
