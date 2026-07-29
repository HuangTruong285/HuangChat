import connectDB from "./config/db.js";
import mongoose from "mongoose";
import env from "./config/env.js";
import app from "./app.js";

/* ==========================================================================
   1. BẮT LỖI ĐỒNG BỘ CẤP CAO NHẤT (UNCAUGHT EXCEPTIONS)
   ========================================================================== */
// Xử lý các lỗi đồng bộ (synchronous) chưa được try-catch ở bất kỳ đâu trong app.
// Phải đặt ở ĐẦU FILE trước khi import/chạy các module khác.
process.on("uncaughtException", (err) => {
  console.error(
    "💥 UNCAUGHT EXCEPTION! Lỗi nghiêm trọng đồng bộ, đang dừng server...",
  );
  console.error(err.name, err.message, err.stack);
  // Do trạng thái của app lúc này không còn an toàn, buộc phải dừng process ngay lập tức.
  process.exit(1);
});

/* ==========================================================================
   2. KHỞI ĐỘNG SERVER (BOOTSTRAP)
   ========================================================================== */
const PORT = env.port || 5000;
let server;

let isShuttingDown = false;

const start = async () => {
  try {
    // Kết nối đến CSDL MongoDB trước
    await connectDB();

    // Khởi động Express HTTP Server
    server = app.listen(PORT, () => {
      console.log(`🚀 App running on http://localhost:${PORT}`);
    });

    server.on("error", (err) => {
      console.error("❌ Server failed to start:", err);
      process.exit(1);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1); // Thoát app với mã lỗi 1 nếu không thể khởi động
  }
};

start();

/* ==========================================================================
   3. TẮT SERVER AN TOÀN (GRACEFUL SHUTDOWN)
   ========================================================================== */
/**
 * Hàm đóng toàn bộ kết nối (HTTP, MongoDB) an toàn trước khi dừng Node.js process.
 * Giúp tránh mất dữ liệu hoặc làm đứt đột ngột các request đang xử lý của người dùng.
 */
const shutdown = async (signal) => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(`\n⚠ Received ${signal}. Closing server gracefully...`);

  // Thiết lập thời hạn cưỡng chế ngắt (Force kill) sau 10 giây nếu server bị treo
  const forceTimeout = setTimeout(() => {
    console.error("💥 Could not close connections in time, forcing shut down");
    process.exit(1);
  }, 10000);
  forceTimeout.unref(); // Không giữ Event Loop chạy nếu tiến trình đã dọn dẹp xong

  try {
    // 1. Ngừng nhận request mới và đợi các request dở dang hoàn thành
    if (server) {
      await new Promise((resolve) => server.close(resolve));
      console.log("🛑 HTTP server closed.");
    }

    // 2. Đóng kết nối MongoDB
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    console.log("📦 MongoDB connection closed.");

    // 3. Dọn dẹp bộ đếm thời gian và thoát thành công (code 0)
    clearTimeout(forceTimeout);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error during shutdown:", err);
    process.exit(1);
  }
};

// Lắng nghe tín hiệu ngắt từ hệ thống/terminal:
// SIGINT: Nhấn Ctrl + C ở terminal
// SIGTERM: Tín hiệu dừng từ Docker, PM2, Heroku, Kubernetes...
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

/* ==========================================================================
   4. BẮT LỖI BẤT ĐỒNG BỘ CHƯA XỬ LÝ (UNHANDLED REJECTIONS)
   ========================================================================== */
// Xử lý các Promise bị reject nhưng không có khối .catch() hoặc try-catch
process.on("unhandledRejection", (err) => {
  console.error("💥 UNHANDLED REJECTION! Lỗi bất đồng bộ chưa xử lý:");
  console.error(err);

  // Đóng HTTP server trước rồi mới dừng app để đảm bảo tính toàn vẹn
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
