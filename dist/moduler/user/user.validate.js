"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userValidateSchema = zod_1.z.object({
    password: zod_1.z
        .string({
        invalid_type_error: 'Password must be a string',
    })
        .max(20, { message: 'password maximum 20 charecters' })
        .optional(),
});
exports.UserValidation = {
    userValidateSchema,
};
