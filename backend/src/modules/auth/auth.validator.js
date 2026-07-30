import { body } from "express-validator";

// Validator cho đăng ký
export const registerValidator = [
  body("username")
    .trim() // loại bỏ khoảng trắng đầu/cuối
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-z0-9_]+$/)
    .withMessage(
      "Username can only contain lowercase letters, numbers, and underscores",
    )
    .customSanitizer((value) => value.toLowerCase()), // chuyển về chữ thường để đồng bộ

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .isLength({ max: 255 })
    .withMessage("Email cannot exceed 255 characters")
    .normalizeEmail(), // chuẩn hóa email như lowercase, bỏ khoảng trắng không cần thiết

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be between 8 and 128 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must include uppercase, lowercase and number"),
];

// Validator cho đăng nhập
export const loginValidator = [
  // Cho phép người dùng đăng nhập bằng email hoặc username
  body("email")
    .optional({ values: "falsy" })
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email"),

  body("username")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-z0-9_]+$/)
    .withMessage(
      "Username can only contain lowercase letters, numbers, and underscores",
    )
    .customSanitizer((value) => value.toLowerCase()),

  // Bắt buộc phải có ít nhất một trong hai: email hoặc username
  body().custom((_, { req }) => {
    const hasEmail = Boolean(req.body.email);
    const hasUsername = Boolean(req.body.username);

    if (!hasEmail && !hasUsername) {
      throw new Error("Please provide either email or username");
    }

    return true;
  }),

  // Password bắt buộc nhập
  body("password").trim().notEmpty().withMessage("Password is required"),
];
