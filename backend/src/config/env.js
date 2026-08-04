import dotenv from "dotenv";

// Load biến môi trường từ file .env vào process.env
dotenv.config();

// Các biến môi trường bắt buộc phải có
const requiredEnvs = ["MONGO_URI", "JWT_ACCESS_SECRET"];

// Lọc ra những biến bị thiếu
const missingEnvs = requiredEnvs.filter((key) => !process.env[key]?.trim());

// Nếu thiếu thì dừng chương trình
if (missingEnvs.length > 0) {
  throw new Error(
    `❌ Thiếu biến môi trường bắt buộc: ${missingEnvs.join(", ")}`,
  );
}

// Lấy môi trường chạy: development, production, test
const nodeEnv = (process.env.NODE_ENV || "development").toLowerCase();
const allowedEnvs = ["development", "production", "test"];

// Kiểm tra NODE_ENV có hợp lệ không
if (!allowedEnvs.includes(nodeEnv)) {
  throw new Error(`❌ NODE_ENV không hợp lệ: ${nodeEnv}`);
}

// Chuyển PORT sang số nguyên và kiểm tra khoảng hợp lệ
const parsedPort = Number.parseInt(process.env.PORT || "5000", 10);
const port =
  !Number.isNaN(parsedPort) && parsedPort > 0 && parsedPort <= 65535
    ? parsedPort
    : 5000;
// Chuyển REFRESH_TOKEN_TTL sang số nguyên (mặc định 7 ngày tính bằng ms)
const parsedRefreshTTL = Number.parseInt(
  process.env.REFRESH_TOKEN_TTL || "604800000",
  10,
);
// Chuyển SALT_ROUNDS sang số nguyên
const parsedSaltRounds = Number.parseInt(process.env.SALT_ROUNDS || "12", 10);

// Tạo object chứa cấu hình môi trường
const env = {
  port,
  nodeEnv,
  isDev: nodeEnv === "development",
  isProd: nodeEnv === "production",

  // URL frontend cho phép truy cập
  clientUrl:
    process.env.CLIENT_URL?.trim() ||
    (nodeEnv === "production" ? "" : "http://localhost:5173"),

  // Cấu hình MongoDB
  mongoDB: {
    uri: process.env.MONGO_URI?.trim(),
  },

  // Cấu hình JWT
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET?.trim(),
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN?.trim() || "15m",
  },

  // Đã sửa tên biến REFRESH_TOKEN_TTL và ép kiểu number
  refreshTokenTTL: Number.isNaN(parsedRefreshTTL)
    ? 604800000
    : parsedRefreshTTL,

  // Đã ép kiểu number
  bcrypt: {
    saltRounds: Number.isNaN(parsedSaltRounds) ? 12 : parsedSaltRounds,
  },
};

// Đóng đóng toàn bộ các object con và object chính
Object.freeze(env.mongoDB);
Object.freeze(env.jwt);
Object.freeze(env.bcrypt);
Object.freeze(env);

export default env;
