import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan, { StreamOptions } from 'morgan';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './routes/user.routes';
import { errorHandler } from './middlewares/error.middleware';
import { AppError } from './middlewares/error.middleware';
import { apiLimiter } from './middlewares/rateLimit.middleware';
import Logger from './utils/logger';
import swaggerSpec from './utils/swagger';

const app: Application = express();

const stream: StreamOptions = {
  write: (message) => Logger.http(message),
};

app.use(helmet());
app.use(cors());
app.use(morgan('combined', { stream }));
app.use(express.json());
app.use(apiLimiter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1/users', userRoutes);

app.all('*', (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(errorHandler);

export default app;
