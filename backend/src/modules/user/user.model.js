import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },

    displayName: {
      type: String,
      required: true,
    },
    avatarURL: {
      type: String, // Link CDN để hiển thị hình
      default: null,
    },
    avatarId: {
      type: String, // Cloudinary public_id để xoá hình
    },
    bio: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      sparse: true, // Cho phép null, nhưng không được trùng
    },

    status: {
      type: String,
      enum: ["offline", "online", "away", "busy"],
      default: "offline",
    },
    lastSeen: {
      type: Date,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
