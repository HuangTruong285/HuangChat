import { body } from "express-validator";

// Validate đăng ký tài khoản mới
export const registerValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "Username must be at least 3 characters long and at most 30 characters long",
    )
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 100 })
    .withMessage(
      "Password must be at least 6 characters long and at most 100 characters long",
    ),
];

// Validate đăng nhập
export const loginValidator = [
  body("identifier")
    .trim()
    .notEmpty()
    .withMessage("Username or email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
