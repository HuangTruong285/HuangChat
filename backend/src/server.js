import env from "./config/env.js";

process.on("uncaughtException", (err) => {
  console.error("💥 UNCAUGHT EXCEPTION! Đang dừng server...");
  console.error(err.name, err.message);
  process.exit(1);
});

import connectDB from "./config/db.js";
import app from "./app.js";

/* ----------------------------------- Boot ---------------------------------- */
const PORT = env.port;
let server;

const start = async () => {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      console.log(`🚀App running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌Failed to start server:", err.message);
    process.exit(1);
  }
};

start();

// Xử lý tắt server an toàn (Graceful Shutdown)
const shutdown = (signal) => {
  console.log(`\n⚠️ Received ${signal}. Closing server gracefully...`);
  if (server) {
    server.close(() => {
      console.log("🛑 Server closed.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("unhandledRejection", (err) => {
  console.error("💥 UNHANDLED REJECTION! Đang đóng server...");
  console.error(err.name, err.message);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
