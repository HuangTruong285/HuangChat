import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const generateAccessToken = (userId) =>
  jwt.sign({ id: userId }, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn,
  });

export const verifyAccessToken = (token) => {
  return jwt.verify(token, env.jwt.secret);
};
