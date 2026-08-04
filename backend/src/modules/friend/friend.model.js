import mongoose from "mongoose";

/*
    requester: Ai yêu cầu
    receiver: Ai nhận lời mời
    status: Trạng thái bạn bè
*/

const friendSchema = new mongoose.Schema(
  {
    userA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

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

const friend = mongoose.model("friend", friendSchema);

export default friend;
