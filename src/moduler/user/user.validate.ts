import { z } from 'zod';

const userValidateSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .max(20, { message: 'password maximum 20 charecters' })
    .optional(),
});

export const UserValidation = {
  userValidateSchema,
};
