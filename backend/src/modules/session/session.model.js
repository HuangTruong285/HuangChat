import mongoose from "mongoose";

/*
  user: User sở hữu refresh token
  token: Chuỗi refresh token, được tạo ra khi user đăng nhập (đã mã hoá)
  expiresAt: Thời gian hết hạn của refresh token
  revoked: Trạng thái của refresh token, nếu true thì refresh token đã bị thu hồi và không còn hợp lệ
*/

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    hashedrefreshToken: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    revoked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// MongoDB tự động xoá document khi hết hạn
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Session = mongoose.model("Session", sessionSchema);

export default Session;
