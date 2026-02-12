import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import connectDB from './utils/db';
import Logger from './utils/logger';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  
  const server = app.listen(PORT, () => {
    Logger.info(`Server is running on port ${PORT}`);
    Logger.info(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });

  const gracefulShutdown = () => {
    Logger.info('Received kill signal, shutting down gracefully');
    server.close(async () => {
      Logger.info('Closed out remaining connections');
      await mongoose.connection.close(false);
      Logger.info('MongoDb connection closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);

  process.on('unhandledRejection', (err: Error) => {
    Logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
    Logger.error(`${err.name}: ${err.message}`);
    server.close(() => {
      process.exit(1);
    });
  });
};

startServer();

