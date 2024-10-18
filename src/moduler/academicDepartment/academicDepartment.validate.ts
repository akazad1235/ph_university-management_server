import { z } from 'zod';

const createAcademicDepartmentValidateSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'name must be a string',
      required_error: 'name field is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic faculty must be string',
      required_error: 'Faculty is required',
    }),
  }),
});
const updateAcademicDepartmentValidateSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'name must be a string',
        required_error: 'name field is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic faculty must be string',
        required_error: 'Faculty is required',
      })
      .optional(),
  }),
});
export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidateSchema,
  updateAcademicDepartmentValidateSchema,
};
