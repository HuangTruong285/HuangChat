import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema(
  {
    // Lời mờI kết bạn từ ai
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Lời mời kết bạn đến ai
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Lời nhắn kèm theo
    message: {
      type: String,
      maxLength: 300,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

friendRequestSchema.index({ from: 1, to: 1 }, { unique: true });
friendRequestSchema.index({ from: 1 });
friendRequestSchema.index({ to: 1 });

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);

export default FriendRequest;
