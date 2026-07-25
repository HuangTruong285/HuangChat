import mongoose from "mongoose";
import env from "./env.js";

const connectDB = async () => {
  const url = env.mongoDB.uri;

  if (!url) {
    throw new Error(
      "❌ MONGO_URI chưa được định nghĩa trong biến môi trường (.env)",
    );
  }

  //// Tránh gây nhiễu thông báo lỗi và khiến các truy vấn thất bại nhanh chóng thay vì bị đệm mãi mãi.
  mongoose.set("strictQuery", true);

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
    process.exit(1); // Dừng ứng dụng nếu không thể kết nối DB
  }
};

export default connectDB;
