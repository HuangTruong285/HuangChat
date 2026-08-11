import ApiError from "../utils/ApiError.js";

// ============================== VALIDATE REQUEST ==============================

const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const validationErrors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      return next(
        ApiError.unprocessableEntity("Validation failed", validationErrors),
      );
    }

    // Nếu property là 'query' hoặc 'params', xóa dữ liệu cũ và gán dữ liệu đã validate vào
    if (property === "query" || property === "params") {
      Object.keys(req[property]).forEach((key) => delete req[property][key]);
      Object.assign(req[property], value);
    } else {
      // Đối với 'body' hoặc các thuộc tính khác, vẫn có thể gán trực tiếp bằng dấu =
      req[property] = value;
    }

    next();
  };
};

export default validate;
