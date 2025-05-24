import mongoose from 'mongoose';
import config from 'config';
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB connected...');
  } catch (error) {
    console.error(error.message);
    // exit process with failure
    process.exit(1);
  }
};

export default connectDB;
