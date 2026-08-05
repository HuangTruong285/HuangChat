import mongoose from "mongoose";

const friendSchema = new mongoose.Schema(
  {
    // ID Người A
    userA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // ID Người B
    userB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// 1. Đảm bảo giữa 2 user không tồn tại nhiều hơn 1 bản ghi quan hệ
friendSchema.index({ userA: 1, userB: 1 }, { unique: true });

const Friend = mongoose.model("friend", friendSchema);

export default Friend;
