import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Faculty id is required'],
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);
// create middleware when creating academic department and check academic department name exist or not
academicDepartmentSchema.pre('save', async function (next) {
  const academicDepartment = this;

  // Only check for uniqueness if the document is new (during creation)
  if (academicDepartment.isNew) {
    // Check if a department with the same name already exists
    const isDepartmentExist = await AcademicDepartment.findOne({
      name: academicDepartment.name,
    });

    // If a department with the same name exists, throw an error
    if (isDepartmentExist) {
      throw new Error('already existing');
    }
  }
  next();
});
// create query middleware when updating academic department and check academic department id exist or not
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartment.findOne(query);
  if (!isDepartmentExist) {
    throw new Error('Department not Exists');
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
