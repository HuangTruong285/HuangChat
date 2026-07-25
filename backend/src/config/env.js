import dotenv from "dotenv";

dotenv.config();

const validateEnv = () => {
  const requiredEnvs = ["MONGO_URI", "JWT_SECRET"];
  const missingEnvs = requiredEnvs.filter((key) => !process.env[key]);

  if (missingEnvs.length > 0) {
    throw new Error(
      `❌ Thất bại khi khởi chạy! Thiếu các biến môi trường: ${missingEnvs.join(", ")}`,
    );
  }
};

validateEnv();

// Lấy nodeEnv chuẩn có giá trị mặc định trước
const nodeEnv = process.env.NODE_ENV || "development";

// Gom các biến vào 1 object chuẩn hoá
const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv,
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",

  clientUrl: process.env.CLIENT_URL?.trim() || "http://localhost:5173",

  mongoDB: {
    uri: process.env.MONGO_URI?.trim(),
  },

  jwt: {
    secret: process.env.JWT_SECRET?.trim(),
    expiresIn: process.env.JWT_EXPIRES_IN?.trim() || "7d",
  },
};

export default env;
