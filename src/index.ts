import { app } from './app';
import mongoose from 'mongoose';

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  await mongoose.connect(process.env.MONGO_URI);

  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};

start();
