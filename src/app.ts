import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './moduler/product/product.route';
import z from 'zod';
import { UserRoutes } from './moduler/user/user.route';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application routes

//call only product routes
//call only product routes
app.use('/api/products', ProductRoutes);
app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: 'server connected success',
      data: null,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
      data: null,
    });
  }
});

//route not fund handler
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    // If it's a Zod validation error
    res.status(400).json({
      success: false,
      message: error.errors, // Detailed validation errors
    });
  } else {
    res.status(400).json({
      success: false,
      message: error.message || 'something not working',
    });
  }
  next();
});

export default app;
