import express from 'express';
import validateRequest from '../../app/middlewares/validationMiddleware';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidateSchema } from './academicSemester.validate';
const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest([
    AcademicSemesterValidateSchema.createAcademicSemesterValidationSchema,
  ]),
  AcademicSemesterController.createAcademicSemester,
);
router.get('/get-all-semester', AcademicSemesterController.getAllSemester);
router.get(
  '/show-specific-semester/:id',
  AcademicSemesterController.showSepecificAcademicSemester,
);

export const AcademicSemesterRoutes = router;
