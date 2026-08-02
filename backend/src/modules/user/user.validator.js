import { body, param, query } from "express-validator";
import mongoose from "mongoose";

// Kiểm tra ObjectId hợp lệ
const isObjectId = (value) => mongoose.ObjectId.isValid(value);

// GET /users/:id
export const getUserByIdValidator = [
  param("id").custom(isObjectId).withMessage("Invalid user id"),
];

// GET /users/search?q=...
export const searchUsersValidator = [
  query("q")
    .trim()
    .notEmpty()
    .withMessage("Search keyword is required")
    .isLength({ min: 1, max: 50 })
    .withMessage("Search keyword must be between 1 án 50 characters"),
];

// PATCH /users/me
export const updateProfileValidator = [
  body("displayName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Display name must be between 2 and 50 characters"),

  body("bio")
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage("Bio must not exceed 300 characters"),
];

// PATCH /users/me/password
export const changePasswordValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

  body("newPassword")
    .isLength({ min: 8, max: 100 })
    .withMessage("Password must be between 8 and 100 characters")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),
];
