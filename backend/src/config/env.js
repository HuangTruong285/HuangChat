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

// Chuyển PORT sang số nguyên
const parsedPort = Number.parseInt(process.env.PORT || "5000", 10);

// Tạo object chứa cấu hình môi trường
const env = {
  port: Number.isNaN(parsedPort) ? 5000 : parsedPort, // Cổng server
  nodeEnv,
  isDev: nodeEnv === "development", // Có phải môi trường dev không
  isProd: nodeEnv === "production", // Có phải môi trường prod không

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
};

// Ngăn thay đổi object cấu hình sau này
Object.freeze(env);
Object.freeze(env.mongoDB);
Object.freeze(env.jwt);

export default env;
