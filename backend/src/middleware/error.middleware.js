import env from "../config/env.js";
import ApiError from "../utils/ApiError.js";

// ============================== LỖI ROUTE KHÔNG KHỚP ==============================
// Xử lý các route không tồn tại
export const notFound = (req, res, next) => {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
};

// ============================== XỬ LÝ LỖI TẬP TRUNG ==============================

// Middleware xử lý lỗi tập trung
export const errorHandler = (err, req, res, next) => {
  let customError = err;

  // Mongoose CastError (ObjectId không hợp lệ)
  if (err.name === "CastError") {
    customError = ApiError.badRequest(`Invalid ${err.path}: ${err.value}`);
  }

  // MongoDB Duplicate Key Error
  else if (err.code === 11000) {
    const fields = Object.keys(err.keyValue ?? {});
    const fieldNames = fields.length ? fields.join(", ") : "Field";

    customError = ApiError.conflict(`${fieldNames} already exists`);
  }

  // Mongoose Validation Error
  else if (err.name === "ValidationError") {
    const errors = Object.values(err.errors ?? {}).map((error) => ({
      field: error.path,
      message: error.message,
    }));

    customError = ApiError.unprocessableEntity("Validation failed", errors);
  }

  // JWT Error
  else if (
    err.name === "JsonWebTokenError" ||
    err.name === "TokenExpiredError"
  ) {
    customError = ApiError.unauthorized(
      "Invalid or expired token. Please log in again.",
    );
  }

  // Những lỗi không phải ApiError
  if (!(customError instanceof ApiError)) {
    console.error("🔥 Unexpected Error:", err);
    customError = ApiError.internal();
  }

  // Log lỗi hệ thống
  if (!customError.isOperational) {
    console.error("🔥 Critical Error:", err);
  }

  const response = {
    success: false,
    statusCode: customError.statusCode,
    message: customError.message,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  };

  if (customError.errors?.length) {
    response.errors = customError.errors;
  }

  if (!env.isProd) {
    response.stack = customError.stack;
  }

  return res.status(customError.statusCode).json(response);
};
