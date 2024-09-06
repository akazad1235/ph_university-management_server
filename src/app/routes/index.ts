import { Router } from 'express';
import { UserRoutes } from '../../moduler/user/user.route';
import { ProductRoutes } from '../../moduler/product/product.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
