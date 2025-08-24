import mongoose from 'mongoose';
import { DB_NAME } from '../constans.js';

export const Db_Connect = async (req, res) => {
 try {
  const db_host = await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`);

  console.log('✅ database connected successfully', db_host.connection.host);
 } catch (error) {
  console.log('❌ error commes when connecting the data base Error:- ', error);
 }
};
