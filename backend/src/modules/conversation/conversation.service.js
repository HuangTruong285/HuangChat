import * as conversationRepository from "./conversation.repository.js";
import * as conversationMapper from "./conversation.mapper.js";

import ApiError from "../../utils/ApiError.js";

// ==============================
// CREATE DIRECT CONVERSATION
// ==============================
const createDirectConversation = async (userAId, userBId) => {
  // Kiểm tra xem có phải hai người khác nhau không
  if (userAId.toString() === userBId.toString()) {
    throw ApiError.badRequest("Cannot create conversation with yourself");
  }

  // Kiểm tra có cuộc trò chuyện giữa hai người không
  const existedConversation =
    await conversationRepository.findDirectConversation(userAId, userBId);
  // Nếu có thì trả về cuộc trò chuyện đó, không tạo
  if (existedConversation) {
    return conversationMapper.toConversation(existedConversation);
  }

  // Tạo cuộc trò chuyện trực tiếp
  const directConversation = await conversationRepository.create({
    type: "direct",
    participants: [{ userId: userAId }, { userId: userBId }],
    seenBy: [],
    unreadCounts: {
      [userAId]: 0,
      [userBId]: 0,
    },
  });

  return conversationMapper.toConversation(directConversation);
};

// ==============================
// CREATE GROUP CONVERSATION
// ==============================
const createGroupConversation = async ({
  name,
  avatarUrl = "",
  createdBy,
  participantIds,
}) => {
  // Chuyển sách sách ID thành viên thành danh sách chuỗi không trùng
  const memberIds = [
    ...new Set([
      createdBy.toString(),
      ...participantIds.map((id) => id.toString()),
    ]),
  ];
  // Nếu số lượng thành viên dưới 3 thì không được
  if (memberIds.length < 3) {
    throw ApiError.badRequest(
      "A group conversation must have at least 3 members",
    );
  }

  // Tạo các đối tượng thành viên
  const participants = memberIds.map((id) => ({
    userId: id,
  }));

  // Gán giá trị tin nhắn chưa đọc của mỗi thành viên thành 0
  const unreadCounts = {};
  memberIds.forEach((id) => {
    unreadCounts[id] = 0;
  });

  const groupConversation = await conversationRepository.create({
    type: "group",
    participants,
    group: {
      name,
      avatarUrl,
      createdBy,
    },
    seenBy: [],
    unreadCounts,
  });

  return conversationMapper.toConversation(groupConversation);
};

// ==============================
// GET MY CONVERSATIONS
// ==============================
// Lấy tất cả cuộc trò chuyện của tôi
const getMyConversations = async (userId) => {
  const myConversations = await conversationRepository.findByUser(userId);
  return conversationMapper.toConversationItems(myConversations, userId);
};

// ==============================
// GET CONVERSATION
// ==============================
// Lấy cuộc trò chuyện được chọn
const getConversation = async (conversationId) => {
  const conversation = await conversationRepository.findById(conversationId);
  if (!conversation) {
    throw ApiError.notFound("Conversation not found");
  }

  return conversationMapper.toConversation(conversation);
};

// ==============================
// ADD PARTICIPANT
// ==============================
const addParticipant = async (conversationId, userId) => {
  // Kiểm tra cuộc trò chuyện tồn tại không
  const conversation = await conversationRepository.findById(conversationId);
  if (!conversation) {
    throw ApiError.notFound("Conversation not found");
  }

  // Kiểm tra cuộc trò chuyện có phải nhóm chat không
  if (conversation.type !== "group") {
    throw ApiError.notFound("Cannot add member to direct conversation");
  }

  // Kiểm tra xem thành viên cần thêm đã nằm trong nhóm chưa
  const existed = conversation.participants.some(
    (participant) => participant.userId._id.toString() === userId.toString(),
  );
  if (existed) {
    throw ApiError.badRequest("User already exists in group");
  }

  // Thêm thành viên vào nhóm
  const newConversation = conversationRepository.addParticipant(
    conversationId,
    {
      userId,
    },
  );

  return conversationMapper.toParticipants(newConversation.participants);
};

// ==============================
// REMOVE PARTICIPANT
// ==============================
const removeParticipant = async (conversationId, userId) => {
  // Tìm xem có cuộc trò chuyện đó không
  const conversation = await conversationRepository.findById(conversationId);
  if (!conversation) {
    throw ApiError.notFound("Conversation not found");
  }

  return conversationRepository.removeParticipant(conversationId, userId);
};

export {
  createDirectConversation,
  createGroupConversation,
  getMyConversations,
  getConversation,
  addParticipant,
  removeParticipant,
};
