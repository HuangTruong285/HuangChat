import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

const app = express();

/* -------------------------------- Middleware ------------------------------- */
// Cấu hình CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
// Parse dữ liệu đầu vào (Body Parser)
app.use(
  express.json({
    limit: "1mb",
  }),
);
app.use(express.urlencoded({ extended: true }));
// Log request ở môi trường dev
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

/* ---------------------------------- Routes --------------------------------- */
// Route kiểm tra
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes chính
app.use("/api/auth", authRoutes);

/* --------------------------- Error handling {last} ------------------------- */
// Bắt các route không tồn tại (Lỗi 404)
app.use(notFound);
// Bộ xử lý lỗi tập trung (Bắt buộc nằm ở cuối cùng)
app.use(errorHandler);

export default app;
