import mongoose from "mongoose";
import env from "./env.js";

// ============================== CONNECT DATABASE ==============================
const connectDB = async () => {
  // Lấy đường dẫn kết nối với MongoDB vào trả lỗi nếu không tìm thấy
  const url = env.mongoDB.uri;
  if (!url) {
    throw new Error("❌ MONGO_URI chưa được định nghĩa trong biến môi trường");
  }

  // Thiết lập chế độ truy vấn của Mongoose chỉ tìm và lọc những trường đã được thiết lập và tự động bỏ qua các trường không được thiết lập
  mongoose.set("strictQuery", true);

  // Kiểm tra đã kết nối database chưa, tránh kết nối nhiều lần
  // 0 : disconnected
  // 1 : connected
  // 2 : connecting
  // 3 : disconnecting
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // Kết nối Database trong 10 giây. Nếu được thì kết nối thành công, không được thì là trả về lỗi
  try {
    const conn = await mongoose.connect(url, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(
      `✅ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`,
    );
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    throw error;
  }
};

// ============================== EXPORT ==============================
export default connectDB;
