import mongoose from "mongoose";
import multer from "multer";
import env from "../config/env.js";
import ApiError from "../utils/ApiError.js";

// ==============================
// LỖI ROUTE KHÔNG KHỚP
// ==============================
// Xử lý các route không tồn tại
export const notFound = (req, res, next) => {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
};

// ==============================
// XỬ LÝ LỖI TẬP TRUNG
// ==============================
// Middleware xử lý lỗi tập trung
export const errorHandler = (err, req, res, next) => {
  let customError = err;

  // Api Error
  if (err instanceof ApiError) {
    customError = err;
  }

  // Mongoose Cast Error (ObjectId không hợp lệ)
  else if (err instanceof mongoose.Error.CastError) {
    customError = ApiError.badRequest(`Invalid ${err.path}: ${err.value}`);
  }

  // Mongoose Validation Error
  else if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));

    customError = ApiError.unprocessableEntity("Validation failed", errors);
  }

  // MongoDB Duplicate Key Error
  else if (err.code === 11000) {
    const fields = Object.keys(err.keyValue ?? {});
    const fieldNames = fields.length ? fields.join(", ") : "Field";

    customError = ApiError.conflict(`${fieldNames} already exists`);
  }

  // JWT Error
  else if (err.name === "TokenExpiredError") {
    customError = ApiError.unauthorized("Token expired");
  } else if (err.name === "JsonWebTokenError") {
    customError = ApiError.unauthorized("Invalid token");
  }

  // Multer
  else if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        customError = ApiError.badRequest("File size is too large");
        break;

      case "LIMIT_FILE_COUNT":
        customError = ApiError.badRequest("Too many files");
        break;

      case "LIMIT_UNEXPECTED_FILE":
        customError = ApiError.badRequest("Unexpected file field");
        break;

      case "LIMIT_FIELD_COUNT":
        customError = ApiError.badRequest("Too many fields");
        break;

      default:
        customError = ApiError.badRequest("File upload failed");
    }
  }

  // JSON Parse Error
  else if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    customError = ApiError.badRequest("Invalid JSON body");
  }

  // Những lỗi không phải ApiError
  // Unknown error
  if (!(customError instanceof ApiError)) {
    console.error("🔥 Unexpected Error:", err);
    customError = ApiError.internal();
  }

  // Log lỗi hệ thống
  if (!customError.isOperational) {
    console.error("🔥 Critical Error:", err);
  }

  // Response
  const response = {
    success: false,
    statusCode: customError.statusCode,
    message: customError.message,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  };

  // Validation errors
  if (customError.errors?.length) {
    response.errors = customError.errors;
  }

  // Development only
  if (!env.isProd) {
    response.stack = customError.stack;
  }

  return res.status(customError.statusCode).json(response);
};
