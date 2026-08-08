import dotenv from "dotenv";

dotenv.config();

// 1. Kiểm tra các biến bắt buộc
const requiredEnvs = ["MONGO_URI", "JWT_ACCESS_SECRET", "CLIENT_URL"];
const missingEnvs = requiredEnvs.filter((key) => !process.env[key]?.trim());
if (missingEnvs.length > 0) {
  throw new Error(
    `❌ Thiếu biến môi trường bắt buộc: ${missingEnvs.join(", ")}`,
  );
}

// 2. Validate NODE_ENV
const allowedEnvs = ["development", "production", "test"];
const nodeEnv = (process.env.NODE_ENV || "development").toLowerCase();
if (!allowedEnvs.includes(nodeEnv)) {
  throw new Error(`❌ NODE_ENV không hợp lệ: ${nodeEnv}`);
}

// 3. Parse & Validate PORT
const parsedPort = Number.parseInt(process.env.PORT || "5000", 10);
const port =
  !Number.isNaN(parsedPort) && parsedPort > 0 && parsedPort <= 65535
    ? parsedPort
    : 5000;

// 4. Parse & Validate REFRESH_TOKEN_TTL (Sửa lỗi thiếu 'const')
const parsedRefreshTTL = Number.parseInt(
  process.env.REFRESH_TOKEN_TTL || "604800000",
  10,
);
const refreshTokenTTL =
  !Number.isNaN(parsedRefreshTTL) && parsedRefreshTTL > 0
    ? parsedRefreshTTL
    : 604800000;

// 5. Parse & Validate SALT_ROUNDS
const parsedSaltRounds = Number.parseInt(process.env.SALT_ROUNDS || "12", 10);
const saltRounds =
  !Number.isNaN(parsedSaltRounds) &&
  parsedSaltRounds >= 8 &&
  parsedSaltRounds <= 15
    ? parsedSaltRounds
    : 12;

// ============================== CONFIG OBJECT ==============================
const env = {
  port,
  nodeEnv,
  isDev: nodeEnv === "development",
  isProd: nodeEnv === "production",

  clientUrl: process.env.CLIENT_URL?.trim(),

  mongoDB: {
    uri: process.env.MONGO_URI?.trim(),
  },

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET?.trim(),
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN?.trim() || "15m",
  },

  refreshTokenTTL,

  bcrypt: {
    saltRounds,
  },
};

// Hàm đệ quy đóng băng toàn bộ Object (Deep Freeze)
const deepFreeze = (obj) => {
  Object.keys(obj).forEach((prop) => {
    if (
      typeof obj[prop] === "object" &&
      obj[prop] !== null &&
      !Object.isFrozen(obj[prop])
    ) {
      deepFreeze(obj[prop]);
    }
  });
  return Object.freeze(obj);
};

export default deepFreeze(env);
