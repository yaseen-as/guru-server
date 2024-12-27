import mongoose from "mongoose";
import { DB_NAME } from "../constands";

const connectDb = async () => {
  try {
    const connectionInstance= await mongoose
      .connect(`${process.env.MONGODB_CONNECTION_STRING as string}/${DB_NAME}`)
      console.log(`\nmongodb connected !!! host: ${connectionInstance.connection.host}`);
      
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
};
export default connectDb
