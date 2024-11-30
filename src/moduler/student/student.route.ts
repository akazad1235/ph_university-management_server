import express from 'express';
import { StudnetController } from './student.controller';

const router = express.Router();

router.get('/all-student', StudnetController.getAllStudents);

export const StudentRoutes = router;
