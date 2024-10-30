import { z } from 'zod';

const createUserValidateSchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .min(8, { message: 'password maximum 20 charecters' })
      .max(20, { message: 'password maximum 20 charecters' }),
  }),
});

export const UserValidation = {
  createUserValidateSchema,
};
