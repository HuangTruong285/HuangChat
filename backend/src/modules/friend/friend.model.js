import mongoose from "mongoose";

/*
    requester: Ai yêu cầu
    receiver: Ai nhận lời mời
    status: Trạng thái bạn bè
*/

const friendSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "blocked"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// 1. Đảm bảo giữa 2 user không tồn tại nhiều hơn 1 bản ghi quan hệ
friendSchema.index(
  { requester: 1, receiver: 1 },
  { unique: true }
);

// 2. Tối ưu tìm kiếm quan hệ 2 chiều (User A -> User B hoặc User B -> User A)
friendSchema.index({ receiver: 1, status: 1 });
friendSchema.index({ requester: 1, status: 1 });

const friend = mongoose.model("friend", friendSchema);

export default friend;