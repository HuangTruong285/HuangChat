import Joi from "joi";

// ============================== REGISTER ==============================

export const registerSchema = Joi.object({
  username: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z0-9_]+$/)
    .required()
    .messages({
      "string.empty": "Username is required",
      "string.min": "Username must be at least 3 characters",
      "string.max": "Username must not exceed 30 characters",
      "string.pattern.base":
        "Username can only contain letters, numbers, and underscores",
      "any.required": "Username is required",
    }),

  email: Joi.string().trim().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(6).max(100).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password must not exceed 100 characters",
    "any.required": "Password is required",
  }),
});

// ============================== LOGIN ==============================

export const loginSchema = Joi.object({
  identifier: Joi.string().trim().required().messages({
    "string.empty": "Username or email is required",
    "any.required": "Username or email is required",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});
