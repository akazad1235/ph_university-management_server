import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
const router = express.Router();

router.get('/index', AcademicFacultyController.getAllAcademicFaculty);
router.get('/show/:id', AcademicFacultyController.getSpecificAcademicFaculty);
router.patch('/update/:id', AcademicFacultyController.updateAcademicFaculty);
router.delete('/delete/:id', AcademicFacultyController.deleteAcademicFaculty);

router.post(
  '/create-academic-faculty',
  AcademicFacultyController.createAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
