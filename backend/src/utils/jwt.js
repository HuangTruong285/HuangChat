import jwt from "jsonwebtoken";
import env from "../config/env.js";

const { jwt: jwtConfig = {} } = env;

const baseOptions = {
  algorithm: "HS256",
  issuer: jwtConfig.issuer || "huangchat",
  audience: jwtConfig.audience || "huangchat-client",
};

const createToken = (userId, type, secret, expiresIn) =>
  jwt.sign({ id: userId, type }, secret, {
    ...baseOptions,
    expiresIn,
  });

// Tạo access token cho việc truy cập API
export const generateAccessToken = (userId) =>
  createToken(
    userId,
    "access",
    jwtConfig.accessSecret,
    jwtConfig.accessExpiresIn || "15m",
  );

// Tạo refresh token để đổi access token mới
export const generateRefreshToken = (userId) =>
  createToken(
    userId,
    "refresh",
    jwtConfig.refreshSecret,
    jwtConfig.refreshExpiresIn || "7d",
  );

// Xác thực access token
export const verifyAccessToken = (token) => {
  const decoded = jwt.verify(token, jwtConfig.accessSecret, baseOptions);

  if (decoded?.type !== "access") {
    throw new Error("Invalid token type");
  }

  return decoded;
};

// Xác thực refresh token
export const verifyRefreshToken = (token) => {
  const decoded = jwt.verify(token, jwtConfig.refreshSecret, baseOptions);

  if (decoded?.type !== "refresh") {
    throw new Error("Invalid token type");
  }

  return decoded;
};

// Giải mã token mà không verify
export const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch {
    return null;
  }
};
