import dotenv from "dotenv";

dotenv.config();

const requiredEnvs = ["MONGO_URI", "JWT_SECRET"];

const missing = requiredEnvs.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`Missing required env vars: ${missing.join(", ")}`);
  process.exit(1);
}

// Gom các biến vào 1 object chuẩn hoá
const env = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV || "development",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  isProd: process.env.NODE_ENV === "production",
};

export default env;
