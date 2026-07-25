class ApiError extends Error {
  constructor(statusCode = 500, message = "Internal Server Error") {
    super(message);
    this.statusCode = statusCode;
    //this.success = false;

    // Nhờ cờ này, hệ thống biết lỗi nào là an toàn để trả thông báo về cho khách hàng, lỗi nào cần cảnh báo để dev sửa gấp.
    this.isOperational = true;
    // Bắt lại stack trace để dễ debug khi dev
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
