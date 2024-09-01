import { Schema, model } from 'mongoose';
import { Tuser } from './user.interface';

const userSchema = new Schema<Tuser>({
  password: {
    type: String,
    required: true,
  },
  needPasswordChange: { type: Boolean, default: true },
  role: {
    type: String,
    enum: ['student', 'faculty', 'admin'],
  },
  status: {
    type: String,
    enum: ['in-progress', 'blocked'],
    default: 'in-progress',
  },
});

export const User = model<Tuser>('User', userSchema);
