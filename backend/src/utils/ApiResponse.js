class ApiResponse {
  constructor({
    statusCode = 200,
    message = "Success",
    data = null,
    meta = null,
  }) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.meta = meta;
    this.timestamp = new Date().toISOString();

    Object.freeze(this);
  }

  static send(
    res,
    { statusCode = 200, message = "Success", data = null, meta = null } = {},
  ) {
    return res.status(statusCode).json(
      new ApiResponse({
        statusCode,
        message,
        data,
        meta,
      }),
    );
  }
  // 200 OK: Trả về dữ liệu thông thường (Lấy danh sách tin nhắn, profile...);
  static ok(res, message = "Thành công", data = null, meta = null) {
    return this.send(res, {
      statusCode: 200,
      message,
      data,
      meta,
    });
  }
  // 201 Created: Khi tạo mới tài nguyên (Đăng ký, gửi tin nhắn mới, tạo room chat)
  static created(res, message = "Tạo mới thành công", data = null) {
    return this.send(res, {
      statusCode: 201,
      message,
      data,
    });
  }
  static accepted(res, message = "Accepted", data = null) {
    return this.send(res, {
      statusCode: 202,
      message,
      data,
    });
  }
  static notContent(res) {
    return res.status(204).send();
  }
}

export default ApiResponse;
