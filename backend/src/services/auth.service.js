import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError.js";
import { toLoginResponse } from "../mappers/auth.mapper.js";
import { toUserResponse } from "../mappers/user.mapper.js";
import { generateAccessToken } from "../utils/jwt.js";
import * as userRepository from "../repositories/user.repository.js";

export const register = async ({ username, email, password }) => {
  // Kiểm tra email đã được sử dụng chưa?
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  // Tạo một document cho vào DB
  const user = await userRepository.createUser({
    username,
    email,
    password,
  });

  // Toạ token JWT
  const accessToken = generateAccessToken(user._id);

  return toLoginResponse(user, accessToken);
};

export const login = async ({ email, password }) => {
  // Kiểm tra có tài khoản này không
  const user = await userRepository.findUserByEmail(email, true);
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Kiểm tra password có trùng không
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = generateAccessToken(user._id);
  return toLoginResponse(user, accessToken);
};

export const getMe = async (userId) => {
  // Kiểm tra có user ko
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return toUserResponse(user);
};
