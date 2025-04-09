import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './.config.env' });

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  }
};
