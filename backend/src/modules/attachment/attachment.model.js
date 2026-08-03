import mongoose from "mongoose";

/*
    message: Tin nhắn nào
    url: đường link url dẫn tới nơi lưu file
    fileName: tên file,
    mimeType: Loại file .Ví dụ: "image/png", "application/pdf", "video/mp4"
    size: Kích cỡ file
*/
const attachmentSchema = new mongoose.Schema(
  {
    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      index: true,
    },

    url: {
      type: String,
    },

    fileName: {
      type: String,
    },

    mimeType: {
      type: String,
    },

    size: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Attachment = mongoose.model("Attachment", attachmentSchema);

export default Attachment;
