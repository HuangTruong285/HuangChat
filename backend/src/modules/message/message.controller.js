import * as messageService from "./message.service.js";

import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const sendMessage = asyncHandler(async (req, res) => {
  const message = await messageService.sendMessage({
    conversationId: req.body.conversationId,
    senderId: req.user.id,
    type: req.body.type,
    content: req.body.content,
    imgUrl: req.body.imgUrl,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, message, "Message sent successfully"));
});

const getMessages = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;

  const { page = 1, limit = 30 } = req.query;

  const messages = await messageService.getMessages(conversationId, {
    page: Number(page),
    limit: Number(limit),
  });

  return res
    .status(200)
    .json(new ApiResponse(200, messages, "Messages retrieved successfully"));
});

const deleteMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;

  await messageService.deleteMessage(messageId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Message deleted successfully"));
});
