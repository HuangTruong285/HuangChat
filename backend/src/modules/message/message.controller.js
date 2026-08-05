import * as messageService from "./message.service.js";

import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

// ============================== SEND MESSAGE ==============================
export const sendMessage = asyncHandler(async (req, res) => {
  const message = await messageService.sendMessage({
    conversationId: req.body.conversationId,
    senderId: req.userId,
    type: req.body.type,
    content: req.body.content,
    imgUrl: req.body.imgUrl,
  });

  return ApiResponse.created(res, "Message sent successfully", message);
});

// ============================== GET MESSAGE ==============================
export const getMessages = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;

  const { page = 1, limit = 30 } = req.query;

  const messages = await messageService.getMessages(conversationId, {
    page: Number(page),
    limit: Number(limit),
  });

  return ApiResponse.ok(res, "Messages retrieved successfully", messages);
});

// ============================== DELETE MESSAGE ==============================
export const deleteMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;

  await messageService.deleteMessage(messageId);

  return ApiResponse.ok(res, "Message deleted successfully");
});
