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
    //Mongoose: bad ObjectId (Truyền sai dạng ID)
    customError = ApiError.badRequest(`Invalid ${err.path}: ${err.value}`);
  } else if (err.code === 11000) {
    // Mongoose: duplicate key (Trùng email, username,...)
    const fields = Object.keys(err.keyValue || {});
    const fieldsNames = fields.length > 0 ? fields.join(", ") : "field";

    customError = ApiError.conflict(`${fieldsName} already exists`);
  } else if (err.name === "ValidationError") {
    // Mongoose: schema validation
    const errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));

    customError = ApiError.unprocessableEntity("Validation failed", errors);
  } else if (err.name === "JsonWebTokenError") {
    // JWT: Sai token
    customError = ApiError.unauthorized("Invalid token. Please log in again.");
  } else if (err.name === "TokenExpiredError") {
    //JWT: Hết hạn token
    customError = ApiError.unauthorized(
      "Token has expired. Please log in again",
    );
  }

  // Những Error thông thường -> Interal Server Eror
  if (!(customError instanceof ApiError)) {
    console.error("🔥 Unexpected Error:", err);

    customError = ApiError.internal();
  }

  // Log các lỗi hệ thống nghiệm trọng
  if (err.isOperational === false) {
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

  // Chỉ hiện stack khi đang phát triển
  if (env.nodeEnv.toLowerCase() !== "production") {
    response.stack = customError.stack;
  }

  return res.status(customError.statusCode).json(response);
};
