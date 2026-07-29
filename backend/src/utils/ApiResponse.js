class ApiResponse {
  // Tạo một object phản hồi chuẩn cho API
  // success: trạng thái thành công hay thất bại
  // statusCode: mã trạng thái HTTP
  // message: thông điệp phản hồi
  // data: dữ liệu trả về (nếu có)
  // meta: thông tin bổ sung (nếu có)
  constructor({
    statusCode = 200,
    message = "Success",
    data = null,
    meta = null,
  }) {
    // Nếu mã trạng thái nhỏ hơn 400 thì coi như thành công
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.meta = meta;
    this.timestamp = new Date().toISOString();

    // Ngăn chỉnh sửa object sau khi tạo
    Object.freeze(this);
  }

  // Gửi response về client theo format chuẩn
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

  // 200 OK: trả về dữ liệu bình thường
  static ok(res, message = "Thành công", data = null, meta = null) {
    return this.send(res, {
      statusCode: 200,
      message,
      data,
      meta,
    });
  }

  // 201 Created: tạo mới tài nguyên thành công
  static created(res, message = "Tạo mới thành công", data = null) {
    return this.send(res, {
      statusCode: 201,
      message,
      data,
    });
  }

  // 202 Accepted: yêu cầu đã được chấp nhận nhưng chưa hoàn tất
  static accepted(res, message = "Accepted", data = null) {
    return this.send(res, {
      statusCode: 202,
      message,
      data,
    });
  }

  // 204 No Content: thành công nhưng không trả về body
  static noContent(res) {
    return res.status(204).send();
  }
}

export default ApiResponse;
