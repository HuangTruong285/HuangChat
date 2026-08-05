import * as conversationService from "./conversation.service.js";

import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

// ============================== CREATE DIRECT CONVERSATION ==============================
export const createDirectConversation = asyncHandler(async (req, res) => {
  const conversation = await conversationService.createDirectConversation(
    req.userId,
    req.body.userId,
  );

  return ApiResponse.created(
    res,
    "Conversation created successfully",
    conversation,
  );
});

// ============================== CREATE GROUP CONVERSATION ==============================
export const createGroupConversation = asyncHandler(async (req, res) => {
  const conversation = await conversationService.createGroupConversation({
    name: req.body.name,
    avatar: req.body.avatar,
    createdBy: req.userId,
    participantIds: req.body.participantIds,
  });

  return ApiResponse.created(
    res,
    "Group conversation created successfully",
    conversation,
  );
});

// ============================== GET MY CONVERSATIONS ==============================
export const getMyConversations = asyncHandler(async (req, res) => {
  const conversations = await conversationService.getMyConversations(
    req.userId,
  );

  return ApiResponse.ok(
    res,
    "Conversations retrieved successfully",
    conversations,
  );
});

// ============================== GET CONVERSATION ==============================
export const getConversation = asyncHandler(async (req, res) => {
  const conversation = await conversationService.getConversation(
    req.params.conversationId,
  );

  return ApiResponse.ok(
    res,
    "Conversation retrieved successfully",
    conversation,
  );
});

// ============================== ADD PARTICIPANT ==============================
export const addParticipant = asyncHandler(async (req, res) => {
  const conversation = await conversationService.addParticipant(
    req.params.conversationId,
    req.body.userId,
  );

  return ApiResponse.ok(res, "Participant added successfully", conversation);
});

// ============================== REMOVE PARTICIPANT ==============================
export const removeParticipant = asyncHandler(async (req, res) => {
  const conversation = await conversationService.removeParticipant(
    req.params.conversationId,
    req.params.userId,
  );

  return ApiResponse.ok(res, "Participant removed successfully", conversation);
});
