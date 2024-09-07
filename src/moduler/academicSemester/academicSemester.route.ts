import express from 'express';
import validateRequest from '../../app/middlewares/validationMiddleware';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidateSchema } from './academicSemester.validate';
const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidateSchema.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

export const AcademicSemesterRoutes = router;
