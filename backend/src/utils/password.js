import bcrypt from "bcryptjs";
import env from "../config/env.js";

// Mã hóa mật khẩu
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(env.bcrypt.saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Kiểm tra mật khẩu
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
