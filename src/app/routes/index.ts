import { Router } from 'express';
import { UserRoutes } from '../../moduler/user/user.route';
import { ProductRoutes } from '../../moduler/product/product.route';
import { AcademicSemesterRoutes } from '../../moduler/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../../moduler/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../../moduler/academicDepartment/academicDepartment.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
