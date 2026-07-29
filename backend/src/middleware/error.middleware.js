import env from "../config/env.js";
import ApiError from "../utils/ApiError.js";

// Lỗi 404 xử lý cho tuyến đường không khớp
export const notFound = (req, res, next) => {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
};

// Middleware xử lý lỗi tập trung (Bắt buộc 4 tham số)
export const errorHandler = (err, req, res, next) => {
  let customError = err;

  // Chuyển đổi các lỗi đặc thù thành ApiError
  if (err.name === "CastError") {
    customError = ApiError.badRequest(`Invalid ${err.path}: ${err.value}`);
  } else if (err.code === 11000) {
    const fields = Object.keys(err.keyValue || {});
    const fieldsNames = fields.length > 0 ? fields.join(", ") : "field";

    customError = ApiError.conflict(`${fieldsNames} already exists`);
  } else if (err.name === "ValidationError") {
    const errors = Object.values(err.errors || {}).map((error) => ({
      field: error.path,
      message: error.message,
    }));

    customError = ApiError.unprocessableEntity("Validation failed", errors);
  } else if (err.name === "JsonWebTokenError") {
    customError = ApiError.unauthorized("Invalid token. Please log in again.");
  } else if (err.name === "TokenExpiredError") {
    customError = ApiError.unauthorized(
      "Token has expired. Please log in again",
    );
  }

  // Những Error thông thường -> Internal Server Error
  if (!(customError instanceof ApiError)) {
    console.error("🔥 Unexpected Error:", err);
    customError = ApiError.internal();
  }

  // Log các lỗi hệ thống nghiêm trọng
  if (customError.isOperational === false) {
    console.error("🔥 Critical Error:", customError);
  }

  const response = {
    success: false,
    statusCode: customError.statusCode,
    message: customError.message,
    timestamp: new Date().toISOString(),
  };

  if (customError.errors?.length) {
    response.errors = customError.errors;
  }

  const isProduction = (env.nodeEnv || "").toLowerCase() === "production";
  if (!isProduction) {
    response.stack = customError.stack;
  }

  return res.status(customError.statusCode).json(response);
};
