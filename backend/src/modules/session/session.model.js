import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    // ID người sở hữu refreshToken
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    // RefreshToken đã mã hoá
    tokenHash: {
      type: String,
      required: true,
      unique: true,
    },
    // Thời gian refresh token hết hạn
    expiresAt: {
      type: Date,
      required: true,
    },
    // Refresh có bị thu hồi không
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
