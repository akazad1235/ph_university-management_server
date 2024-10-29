import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../app/middlewares/validationMiddleware';
import { UserValidation } from './user.validate';
import { StudentValidation } from '../student/student.validate';

const router = express.Router();

router.post(
  '/user/create-student',
  validateRequest([
    UserValidation.createUserValidateSchema,
    StudentValidation.createStudentValidateSchema,
  ]),
  UserController.createStudent,
);

export const UserRoutes = router;
