import mongoose from 'mongoose';
import Logger from './logger';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/user-management-db';
    
    await mongoose.connect(mongoURI);

    Logger.info('MongoDB Connected Successfully');
  } catch (error) {
    Logger.error('MongoDB Connection Failed:', error);
    process.exit(1);
  }
};


export default connectDB;
