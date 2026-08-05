import * as conversationRepository from "./conversation.repository.js";

import ApiError from "../../utils/ApiError.js";

const createDirectConversation = async (userAId, userBId) => {
  if (userAId.toString() === userBId.toString()) {
    throw new ApiError(400, "Cannot create conversation with yourself");
  }

  const existedConversation =
    await conversationRepository.findDirectConversation(userAId, userBId);

  if (existedConversation) {
    return existedConversation;
  }

  return conversationRepository.create({
    type: "direct",
    participants: [{ userId: userAId }, { userId: userBId }],
    seenBy: [],
    unreadCounts: {
      [userAId]: 0,
      [userBId]: 0,
    },
  });
};

const createGroupConversation = async ({
  name,
  avatar = "",
  createdBy,
  participantIds,
}) => {
  const memberIds = [
    ...new Set([
      createdBy.toString(),
      ...participantIds.map((id) => id.toString()),
    ]),
  ];

  if (memberIds.length < 3) {
    throw new ApiError(
      400,
      "A group conversation must have at least 3 members",
    );
  }

  const participants = memberIds.map((id) => ({
    userId: id,
  }));

  const unreadCounts = {};

  memberIds.forEach((id) => {
    unreadCounts[id] = 0;
  });

  return conversationRepository.create({
    type: "group",
    participants,
    group: {
      name,
      avatar,
      createdBy,
    },
    seenBy: [],
    unreadCounts,
  });
};

const getConversationById = async (conversationId) => {
  const conversation = await conversationRepository.findById(conversationId);

  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }

  return conversation;
};

const getMyConversations = async (userId) => {
  return conversationRepository.findByUser(userId);
};

const addParticipant = async (conversationId, userId) => {
  const conversation = await conversationRepository.findById(conversationId);

  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }

  if (conversation.type !== "group") {
    throw new ApiError(400, "Cannot add member to direct conversation");
  }

  const existed = conversation.participants.some(
    (participant) => participant.userId._id.toString() === userId.toString(),
  );

  if (existed) {
    throw new ApiError(400, "User already exists in group");
  }

  return conversationRepository.addParticipant(conversationId, {
    userId,
  });
};

const removeParticipant = async (conversationId, userId) => {
  const conversation = await conversationRepository.findById(conversationId);

  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }

  return conversationRepository.removeParticipant(conversationId, userId);
};
