class ApiError extends Error {
  /*
    statusCode: mã HTTP cần trả về
    message: thông báo lỗi cho client
    errors: danh sách lỗi chi tiết (nếu có)
    isOperational: lỗi do người dùng/logic gây ra hay lỗi hệ thống
  */
  constructor({
    statusCode = 500,
    message = "Internal Server Error",
    errors = [],
    isOperational = true,
  }) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = Array.isArray(errors) ? errors : [errors];
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }

  // 503 Service Unavailable: dịch vụ tạm thời không khả dụng
  static serviceUnavailable(message = "Service Unavailable") {
    return new ApiError({
      statusCode: 503,
      message,
      isOperational: false,
    });
  }

  // 400 Bad Request: dữ liệu gửi lên không hợp lệ
  static badRequest(message = "Bad Request", errors = []) {
    return new ApiError({
      statusCode: 400,
      message,
      errors,
    });
  }

  // 401 Unauthorized: chưa đăng nhập hoặc token sai/hết hạn
  static unauthorized(message = "Unauthorized") {
    return new ApiError({
      statusCode: 401,
      message,
    });
  }

  // 403 Forbidden: đã đăng nhập nhưng không đủ quyền
  static forbidden(message = "Forbidden") {
    return new ApiError({
      statusCode: 403,
      message,
    });
  }

  // 404 Not Found: không tìm thấy dữ liệu cần
  static notFound(message = "Resources Not Found") {
    return new ApiError({
      statusCode: 404,
      message,
    });
  }

  // 405 Method Not Allowed: phương thức HTTP không được phép
  static methodNotAllowed(message = "Method Not Allowed") {
    return new ApiError({
      statusCode: 405,
      message,
    });
  }

  // 409 Conflict: dữ liệu bị trùng hoặc xung đột
  static conflict(message = "Conflict") {
    return new ApiError({
      statusCode: 409,
      message,
    });
  }

  // 422 Unprocessable Entity: dữ liệu đúng kiểu nhưng không hợp lệ theo logic
  static unprocessableEntity(message = "Validation Failed", errors = []) {
    return new ApiError({
      statusCode: 422,
      message,
      errors,
    });
  }

  // 429 Too Many Requests: gửi quá nhiều request
  static tooManyRequests(message = "Too Many Requests") {
    return new ApiError({
      statusCode: 429,
      message,
    });
  }

  // 500 Internal Server Error: lỗi hệ thống nghiêm trọng
  static internal(message = "Internal Server Error") {
    return new ApiError({
      statusCode: 500,
      message,
      isOperational: false,
    });
  }
}

export default ApiError;
