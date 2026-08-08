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

    req[property] = value;

    next();
  };
};

export default validate;
