import bcrypt from "bcryptjs";
import env from "../config/env.js";

// Mã hóa mật khẩu
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(env.bcrypt.saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Kiểm tra mật khẩu
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export { hashPassword, comparePassword };
