class ApiError extends Error {
  constructor(
    statusCode = 500,
    message = "Internal Server Error",
    errors = [],
    isOperational = true,
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    // Nhờ cờ này, hệ thống biết lỗi nào là an toàn để trả thông báo về cho khách hàng, lỗi nào cần cảnh báo để dev sửa gấp.
    this.isOperational = isOperational;
    // Bắt lại stack trace để dễ debug khi dev
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // 400 Bad Request: Dữ liệu gửi lên không hợp lệ
  static badRequest(message = "Dữ liệu không hợp lệ", errors = []) {
    return new ApiError(400, message, errors, true);
  }
  // 401 Unauthorized: Chưa đăng nhập hoặc token hết hạn / không hợp lệ
  static unauthorized(message = "Bạn cần đăng nhập để thực hiện thao tác này") {
    return new ApiError(401, message, [], true);
  }
  // 403 Forbidden: Đã đăng nhập nhưng không có quyền truy cập
  static forbidden(message = "Bạn không có quyền thực hiện hành động này") {
    return new ApiError(403, message, [], true);
  }
  // 404 Not Found: Không tìm thấy tài nguyên (User, Room Chat, Message...)
  static notFound(message = "Tài nguyên không tồn tại") {
    return new ApiError(404, message, [], true);
  }
  // 409 Conflict: Xung đột dữ liệu (Ví dụ: Email / Username đã tồn tại)
  static conflict(message = "Dữ liệu đã tồn tại trong hệ thống") {
    return new ApiError(409, message, [], true);
  }
  // 422 Unprocessable Entity: Thường dùng cho lỗi Validation chi tiết
  static unprocessableEntity(message = "Lỗi xác thực dữ liệu", errors = []) {
    return new ApiError(422, message, errors, true);
  }
  static tooMany(message = "Too many requests") {
    return new ApiError(429, message, [], true);
  }
  // 500 Internal Server Error: Lỗi hệ thống nghiêm trọng (isOperational = false)
  static internal(message = "Lỗi hệ thống nội bộ") {
    return new ApiError(500, message, [], false);
  }
}

export default ApiError;
