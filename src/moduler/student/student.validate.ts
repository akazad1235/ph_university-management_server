import { z } from 'zod';

const createStudentValidateSchema = z.object({
  body: z.object({
    student: z.object({
      name: z
        .string({
          invalid_type_error: 'name must be required from zod',
        })
        .max(20, 'name must be 20 charected or down from zod d'),
      email: z
        .string({
          invalid_type_error: 'Email must be a string',
        })
        .email('Invalid email address format'), // Email validation
    }),
  }),
});

export const StudentValidation = {
  createStudentValidateSchema,
};
