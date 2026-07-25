import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  // validationResult quét qua req để tìm các lỗi từ validator trước đó
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
    }));

    return res.status(400).json({
      success: false,
      message: "Dữ liệu đầu vào không hợp lệ",
      errors: formattedErrors,
    });
  }
  next();
};

export default validate;
