import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import * as friendService from "./friend.service.js";

// ============================== SEND REQUEST ==============================
export const sendRequest = asyncHandler(async (req, res) => {
  const friendRequest = await friendService.sendRequest(
    req.user.id,
    req.body.to,
    req.body.message,
  );

  return ApiResponse.created(
    res,
    "Friend request sent successfully.",
    friendRequest,
  );
});

// ============================== ACCEPT REQUEST ==============================
export const acceptRequest = asyncHandler(async (req, res) => {
  const friend = await friendService.acceptRequest(
    req.params.requestId,
    req.user.id,
  );

  return ApiResponse.ok(res, "Friend request accepted", friend);
});

// ============================== REJECT REQUEST ==============================
export const rejectRequest = asyncHandler(async (req, res) => {
  await friendService.rejectRequest(req.params.requestId, req.user.id);

  return ApiResponse.ok(res, "Friend request accepted.");
});

// ============================== CANCEL REQUEST ==============================
export const cancelRequest = asyncHandler(async (req, res) => {
  await friendService.cancelRequest(req.params.requestId, req.user.id);

  return ApiResponse.ok(res, "Friend request canceled.");
});

// ============================== UNFRIEND ==============================
export const unfriend = asyncHandler(async (req, res) => {
  await friendService.unfriend(req.user.id, req.params.friendId);

  return ApiResponse.ok(res, "Unfriended successfully.");
});

// ============================== GET FRIEND LIST ==============================
export const getFriends = asyncHandler(async (req, res) => {
  const friends = await friendService.getFriends(req.user.id);

  return ApiResponse.ok(res, "Lấy danh sách bạn bè thành công", friends);
});

// ============================== GET RECEIVED REQUEST LIST ==============================
export const getReceivedRequests = asyncHandler(async (req, res) => {
  const requests = await friendService.getReceivedRequests(req.user.id);

  return ApiResponse.ok(
    res,
    "Lấy danh sách lời mời đã nhận thành công",
    requests,
  );
});

// ============================== GET SENT REQUEST LIST ==============================
export const getSentRequests = asyncHandler(async (req, res) => {
  const requests = await friendService.getSentRequests(req.user.id);

  return ApiResponse.ok(
    res,
    "Lấy danh sách lời mời đã gửi thành công",
    requests,
  );
});
