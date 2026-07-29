import mongoose from "mongoose";
import env from "./env.js";

const connectDB = async () => {
  const url = env.mongoDB.uri;

  if (!url) {
    throw new Error(
      "❌ MONGO_URI chưa được định nghĩa trong biến môi trường (.env)",
    );
  }

  mongoose.set("strictQuery", true);

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(url, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(
      `✅ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`,
    );
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    throw error;
  }
};

export default connectDB;
