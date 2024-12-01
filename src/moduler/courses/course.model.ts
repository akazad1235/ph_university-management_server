import { model, Schema } from 'mongoose';
import { TCourse } from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.ObjectId,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    unique: true,
    required: true,
  },
  credits: {
    type: Number,
    unique: true,
    required: true,
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
});
 
export const Course = model<TCourse>('Course', courseSchema);
