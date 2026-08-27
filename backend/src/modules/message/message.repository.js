import Message from "./message.model.js";
import { USER_CONVERSATION_FIELDS } from "../user/index.js";

// ==============================
// DELETE
// ==============================
const create = async (messageData) => {
  return Message.create(messageData);
};

// ==============================
// READ / FIND
// ==============================
const findById = async (messageId) => {
  return Message.findById(messageId);
};

const findByIdWithSender = async (messageId) => {
  return Message.findById(messageId)
    .populate("senderId", USER_CONVERSATION_FIELDS)
    .lean();
};

const findByConversation = async (
  conversationId,
  { page = 1, limit = 30 } = {},
) => {
  const skip = (page - 1) * limit;

  return Message.find({ conversationId })
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)
    .populate("senderId", USER_CONVERSATION_FIELDS);
};

const findLatestByConversation = async (conversationId) => {
  return Message.findOne({ conversationId })
    .sort({ createdAt: -1 })
    .populate("senderId", USER_CONVERSATION_FIELDS);
};

const countByConversation = async (conversationId) => {
  return Message.countDocuments({ conversationId });
};

// ==============================
// UPDATE
// ==============================
const updateById = async (messageId, data) => {
  return Message.findByIdAndUpdate(messageId, data, {
    returnDocument: "after",
    runValidators: true,
  });
};

// ==============================
// DELETE
// ==============================
const deleteById = async (messageId) => {
  return Message.findByIdAndDelete(messageId);
};

export {
  create,
  findById,
  findByIdWithSender,
  findByConversation,
  findLatestByConversation,
  countByConversation,
  updateById,
  deleteById,
};
