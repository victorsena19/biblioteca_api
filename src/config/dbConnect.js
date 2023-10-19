import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@biblioteca-api.pyyxgld.mongodb.net/biblioteca-api?retryWrites=true&w=majority`
);

let db = mongoose.connection;

export default db;
