import ApiError from "../utils/ApiError.js";
import env from "../config/env.js";

// Lỗi 404 xử lý cho tuyến đường không khớp
export const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

// Middleware xử lý lỗi tập trung (Bắt buộc 4 tham số)
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  // Mongoose: bad ObjectId (Truyền sai dạng ID)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Mongoose: duplicate key (Trùng email, username,...)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `A record with that ${field} already exists`;
  }

  // Mongoose: schema validation
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // JWT: Sai token
  if (err.name === "JsonWebTokenError") {
    statusCode = 400;
    message = "Invalid token, Please log in again!";
  }
  //JWT: Hết hạn token
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Your token há expired! Please log in again.";
  }

  // Log lỗi 500 dưới console khi dev
  if (env.nodeEnv !== "production" && statusCode === 500) {
    console.error("💥", err);
  }

  // Trả về response cho client
  res.status(statusCode).json({
    success: false,
    message,
    // Hiện dấu vết lỗi (stack trace) khi dev để dễ fix bug, giấu đi khi deploy production
    ...(env.nodeEnv !== "production" && statusCode === 500
      ? { stack: err.stack }
      : {}),
  });
};
