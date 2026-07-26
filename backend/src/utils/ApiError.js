class ApiError extends Error {
  constructor({
    statusCode = 500,
    message = "Internal Server Error",
    errors = [],
    code = null,
    isOperational = true,
    stack,
  }) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.code = code;
    // true: an toàn trả về ngưỜi dùng, false: trả về dev
    this.isOperational = isOperational;
    // Bắt lại stack trace để dễ debug khi dev
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // 400 Bad Request: Dữ liệu gửi lên không hợp lệ
  static badRequest(message = "Bad Request", errors = []) {
    return new ApiError({
      statusCode: 400,
      message,
      errors,
    });
  }
  // 401 Unauthorized: Chưa đăng nhập hoặc token hết hạn / không hợp lệ
  static unauthorized(message = "Unauthorized") {
    return new ApiError({
      statusCode: 401,
      message,
    });
  }
  // 403 Forbidden: Đã đăng nhập nhưng không có quyền truy cập
  static forbidden(message = "Forbidden") {
    return new ApiError({
      statusCode: 403,
      message,
    });
  }
  // 404 Not Found: Không tìm thấy tài nguyên (User, Room Chat, Message...)
  static notFound(message = "Resources Not Found") {
    return new ApiError({
      statusCode: 404,
      message,
    });
  }
  // 405 Method not allow
  static methodNotAllowed(message = "Method Not Allowed") {
    return new ApiError({
      statusCode: 404,
      message,
    });
  }
  // 409 Conflict: Xung đột dữ liệu (Ví dụ: Email / Username đã tồn tại)
  static conflict(message = "Conflict") {
    return new ApiError({
      statusCode: 409,
      message,
    });
  }
  // 422 Unprocessable Entity: Thường dùng cho lỗi Validation chi tiết
  static unprocessableEntity(message = "Validation Failed", errors = []) {
    return new ApiError({
      statusCode: 422,
      message,
      errors,
    });
  }
  static tooManyRequests(message = "Too Many Requests") {
    return new ApiError({
      statusCode: 429,
      message,
    });
  }
  // 500 Internal Server Error: Lỗi hệ thống nghiêm trọng (isOperational = false)
  static internal(message = "Internal Server Error") {
    return new ApiError({
      statusCode: 500,
      message,
      isOperational: false,
    });
  }

  static serviceUnavailble(message = "Service Unavailable") {
    return new ApiError({
      statusCode: 503,
      message,
      isOperational: false,
    });
  }
}

export default ApiError;
