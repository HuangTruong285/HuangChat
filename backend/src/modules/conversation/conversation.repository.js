import Conversation from "./conversation.model.js";
import { USER_CONVERSATION_FIELDS } from "../user/index.js";

// ==============================
// CREATE
// ==============================
const create = async (data) => {
  return Conversation.create(data);
};

// ==============================
// READ / FIND
// ==============================
const findById = async (conversationId) => {
  return Conversation.findById(conversationId)
    .populate("participants.userId", USER_CONVERSATION_FIELDS)
    .populate("group.createdBy", USER_CONVERSATION_FIELDS);
};

const findDirectConversation = async (userAId, userBId) => {
  return Conversation.findOne({
    type: "direct",
    "participants.userId": {
      $all: [userAId, userBId],
    },
  });
};

const findByUser = async (userId) => {
  return Conversation.find({
    "participants.userId": userId,
  })
    .sort({ lastMessageAt: -1 })
    .populate("participants.userId", USER_CONVERSATION_FIELDS);
};

// ==============================
// UPDATE
// ==============================
const updateById = async (conversationId, data) => {
  return Conversation.findByIdAndUpdate(conversationId, data, {
    returnDocument: "after",
    runValidators: true,
  });
};

const updateLastMessage = async (
  conversationId,
  lastMessage,
  lastMessageAt = new Date(),
) => {
  return Conversation.findByIdAndUpdate(
    conversationId,
    {
      lastMessage,
      lastMessageAt,
    },
    {
      returnDocument: "after",
    },
  );
};

const addParticipant = async (conversationId, participant) => {
  return Conversation.findByIdAndUpdate(
    conversationId,
    {
      $push: {
        participants: participant,
      },
    },
    {
      returnDocument: "after",
    },
  );
};

const removeParticipant = async (conversationId, userId) => {
  return Conversation.findByIdAndUpdate(
    conversationId,
    {
      $pull: {
        participants: {
          userId,
        },
      },
    },
    {
      returnDocument: "after",
    },
  );
};

const markAsSeen = async (conversationId, userId) => {
  return Conversation.findByIdAndUpdate(
    conversationId,
    {
      $addToSet: {
        seenBy: userId,
      },
    },
    {
      returnDocument: "after",
    },
  );
};

const clearSeenBy = async (conversationId) => {
  return Conversation.findByIdAndUpdate(
    conversationId,
    {
      seenBy: [],
    },
    {
      returnDocument: "after",
    },
  );
};

// ==============================
// DELETE
// ==============================
const deleteById = async (conversationId) => {
  return Conversation.findByIdAndDelete(conversationId);
};

export {
  create,
  findById,
  findDirectConversation,
  findByUser,
  updateById,
  updateLastMessage,
  addParticipant,
  removeParticipant,
  markAsSeen,
  clearSeenBy,
  deleteById,
};
