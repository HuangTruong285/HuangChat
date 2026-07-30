import crypto from "crypto";
import mongoose from "mongoose";

/**
 * RefreshToken model dùng để lưu và quản lý refresh token cho user.
 *
 * Các method thường dùng:
 * - createForUser(userId, rawToken, expiresAt): lưu refresh token mới cho user (Tạo nhiều phiên đăng nhập ở nhiều thiết bị)
 * - createOrReplaceForUser(userId, rawToken, expiresAt): tạo token mới và vô hiệu hóa token cũ (Tạo một phiên đăng nhập duy nhất)
 * - findValidToken(rawToken): tìm token còn hợp lệ trong DB và trả về document nếu tìm thấy, null nếu không tìm thấy
 * - revoke(): thu hồi token hiện tại
 *
 * Các field chính:
 * - user: user sở hữu token
 * - tokenHash: hash của refresh token
 * - expiresAt: thời gian hết hạn
 * - revoked: token đã bị thu hồi chưa
 *
 * Ví dụ dùng nhanh:
 * await RefreshToken.createOrReplaceForUser(userId, refreshToken, expiresAt);
 * const tokenDoc = await RefreshToken.findValidToken(refreshToken);
 */

// Hàm băm token bằng SHA-256
const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

// Định nghĩa schema để lưu refresh token của người dùng
const refreshTokenSchema = new mongoose.Schema(
  {
    // Thuộc về user nào
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // tham chiếu tới collection User
      required: true,
      index: true,
    },

    // Hash của refresh token, không lưu raw token trực tiếp
    tokenHash: {
      type: String,
      required: true,
      unique: true,
      select: false, // khi query, field này sẽ bị ẩn mặc định
    },

    // Thời gian token hết hạn
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // TTL index: MongoDB tự xóa token khi hết hạn
    },

    // Nếu token bị thu hồi thì đánh dấu true
    revoked: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true, // tự động thêm createdAt, updatedAt
    versionKey: false, // không lưu __v
  },
);

// Hàm thu hồi token: đánh dấu token này không còn dùng được
refreshTokenSchema.methods.revoke = async function () {
  this.revoked = true;
  return this.save();
};

// Hàm tạo refresh token cho một user
// rawToken là token gốc, sau đó sẽ được hash và lưu vào DB
refreshTokenSchema.statics.createForUser = async function (
  userId,
  rawToken,
  expiresAt,
) {
  const tokenHash = hashToken(rawToken);

  return this.create({
    user: userId,
    tokenHash,
    expiresAt,
  });
};

// Hàm tạo hoặc thay thế refresh token cho một user
// Thu hồi token cũ thay vì tạo thêm mới
refreshTokenSchema.statics.createOrReplaceForUser = async function (
  userId,
  rawToken,
  expiresAt,
) {
  // Chỉ thu hồi token còn đang hoạt động
  await this.updateMany(
    { user: userId, revoked: false },
    { $set: { revoked: true } },
  );

  const tokenHash = hashToken(rawToken);

  return this.create({
    user: userId,
    tokenHash,
    expiresAt,
    revoked: false,
  });
};

// Hàm tìm token hợp lệ trực tiếp trong DB
refreshTokenSchema.statics.findValidToken = async function (rawToken) {
  if (!rawToken) return null;

  const tokenHash = hashToken(rawToken);

  return this.findOne({
    tokenHash,
    revoked: false,
    expiresAt: { $gt: new Date() },
  });
};

// Khi trả về dữ liệu, ẩn tokenHash khỏi JSON
refreshTokenSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.tokenHash;
    return ret;
  },
});

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

export default RefreshToken;
