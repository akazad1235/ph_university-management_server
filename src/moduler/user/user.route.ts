import express from 'express';
import { UserController } from './user.controller';
import createUserValidateSchema from '../student/student.validate';
import validateRequest from '../../app/middlewares/validationMiddleware';

const router = express.Router();

router.post(
  '/user/create-student',
  validateRequest(createUserValidateSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
