import crypto from "crypto";

// Tạo refresh token mới
export const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

// hash refresh token
export const hashRefreshToken = (refreshToken) => {
  return crypto.createHash("sha256").update(refreshToken).digest("hex");
};
