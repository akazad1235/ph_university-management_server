import { z } from 'zod';

const createUserValidateSchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .max(20, { message: 'password maximum 20 charecters' })
      .optional(),
    student: z.object({
      name: z
        .string({
          invalid_type_error: 'name must be required from zod',
        })
        .max(20, 'name must be 20 charected or down from zod d'),
    }),
  }),
});

export default createUserValidateSchema;
