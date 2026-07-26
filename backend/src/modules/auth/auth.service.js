import bcrypt from "bcrypt";

import ApiError from "../../utils/ApiError.js";
import { generateAccessToken } from "../../utils/jwt.js";

import { userMapper, userRepository } from "../user/index.js";

import * as authMapper from "./auth.mapper.js";

export const registerService = async ({ username, email, password }) => {
  // Kiểm tra email đã được sử dụng chưa?
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw ApiError.conflict("Email already exists");
  }

  // Tạo một document cho vào DB
  const user = await userRepository.createUser({
    username,
    email,
    password,
  });

  // Toạ token JWT
  const accessToken = generateAccessToken(user._id);
  return authMapper.toLoginResponse(user, accessToken);
};

export const loginService = async ({ email, password }) => {
  // Kiểm tra có tài khoản này không
  const user = await userRepository.findUserByEmail(email, true);
  if (!user) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  // Kiểm tra password có trùng không
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const accessToken = generateAccessToken(user._id);
  return authMapper.toLoginResponse(user, accessToken);
};

export const getMeService = async (userId) => {
  // Kiểm tra có user ko
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return userMapper.toUserResponse(user);
};
