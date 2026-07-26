import { body } from "express-validator"; // Lấy công cụ đặt luật

// Luật cho đăng ký
export const registerValidator = [
  body("username").trim().notEmpty().withMessage("Username is required"),

  body("email").trim().isEmail().withMessage("Invalid email").normalizeEmail(), // Tùy chọn: Chuẩn hóa email

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 }) // Fix: isLength (chữ L viết hoa)
    .withMessage("Password must be at least 6 characters"),
];

// Luật cho đăng nhập
export const loginValidator = [
  body("email").trim().isEmail().withMessage("Invalid email").normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];
