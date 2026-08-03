import mongoose from "mongoose";

/*
    user: Ai nhận
    tokenHash: Mã reset đã được mã hoá
    expiresAt: Thời gian hết hạn
    used: Đã sử dụng chưa
*/

const passwordResetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    tokenHash: {
      type: String,
      unique: true,
    },

    expiresAt: {
      type: Date,
    },

    used: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// 1. Tự động xoá document khỏi Database khi hết hạn
passwordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// 2. Tối ưu câu truy vấn tìm kiếm token active mới nhất của user
passwordResetSchema.index({ user: 1, used: 1, createdAt: -1 });

const PasswordReset = mongoose.model("PasswordReset", passwordResetSchema);

export default PasswordReset;
