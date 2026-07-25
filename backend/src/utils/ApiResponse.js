class ApiResponse {
  constructor(statusCode, message, data = null) {
    this.success = statusCode < 400; // Tự động thành true nếu status 2xx/3xx
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;
