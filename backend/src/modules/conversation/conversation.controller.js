import * as conversationService from "./conversation.service.js";

import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const createDirectConversation = asyncHandler(async (req, res) => {
  const conversation = await conversationService.createDirectConversation(
    req.user.id,
    req.body.userId,
  );

  return res
    .status(201)
    .json(
      new ApiResponse(201, conversation, "Conversation created successfully"),
    );
});

const createGroupConversation = asyncHandler(async (req, res) => {
  const conversation = await conversationService.createGroupConversation({
    name: req.body.name,
    avatar: req.body.avatar,
    createdBy: req.user.id,
    participantIds: req.body.participantIds,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        conversation,
        "Group conversation created successfully",
      ),
    );
});

const getMyConversations = asyncHandler(async (req, res) => {
  const conversations = await conversationService.getMyConversations(
    req.user.id,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        conversations,
        "Conversations retrieved successfully",
      ),
    );
});

const getConversationById = asyncHandler(async (req, res) => {
  const conversation = await conversationService.getConversationById(
    req.params.conversationId,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, conversation, "Conversation retrieved successfully"),
    );
});

const addParticipant = asyncHandler(async (req, res) => {
  const conversation = await conversationService.addParticipant(
    req.params.conversationId,
    req.body.userId,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, conversation, "Participant added successfully"));
});

const removeParticipant = asyncHandler(async (req, res) => {
  const conversation = await conversationService.removeParticipant(
    req.params.conversationId,
    req.params.userId,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, conversation, "Participant removed successfully"),
    );
});
