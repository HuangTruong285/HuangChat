import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

// Mã hóa mật khẩu
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Kiểm tra mật khẩu
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
