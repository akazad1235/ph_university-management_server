import { AcademicDepartmentValidation } from './academicDepartment.validate';
import express from 'express';
import { AcademicFacultyController } from './academicDepartment.controller';
import validateRequest from '../../app/middlewares/validationMiddleware';
const router = express.Router();

router.get('/index', AcademicFacultyController.getAllAcademicDepartment);
router.get(
  '/show/:id',
  AcademicFacultyController.getSpecificAcademicDepartment,
);
router.patch('/update/:id', AcademicFacultyController.updateAcademicDepartment);
router.delete(
  '/delete/:id',
  AcademicFacultyController.deleteAcademicDepartment,
);

router.post(
  '/create-academic-department',
  validateRequest([
    AcademicDepartmentValidation.createAcademicDepartmentValidateSchema,
  ]),
  AcademicFacultyController.createAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
