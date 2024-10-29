import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routeNotFound from './app/middlewares/routeNotFound';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application routes

//call only product routes
// app.use('/api/products', ProductRoutes);
// app.use('/api/users', UserRoutes);

// global route
app.use('/api/v1', router);

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
app.use(globalErrorHandler);
//route not fund handler
// app.all('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found',
//   });
// });
app.use(routeNotFound);

// Global error-handling middleware
// app.use((error: any, req: Request, res: Response, next: NextFunction) => {
//   return res.status(error.status || 500).json({
//     success: false,
//     message: error.message || 'Something went wrong',
//     error: error,
//   });
//   // Optionally call next() if you have further error handling or logging middleware
//   // next();
// });

export default app;
