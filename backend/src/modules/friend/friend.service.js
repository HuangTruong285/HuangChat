import ApiError from "../../utils/ApiError.js";

import { userRepository } from "../user/index.js";
import * as friendRepository from "./friend.repository.js";
import * as friendMapper from "./friend.mapper.js";
import * as friendRequestRepository from "./friendRequest.repository.js";

// ==============================
// SEND REQUEST
// ==============================
export const sendRequest = async (from, to, message = "") => {
  // Tránh gửi cho chính mình
  if (from === to) {
    throw ApiError.badRequest("You cannot send a friend request to yourself.");
  }

  // Kiểm tra user nhận lời kết bạn có tồn tại không
  const user = await userRepository.findById(to);
  if (!user) {
    throw ApiError.notFound("User not found");
  }

  // Kiểm tra đã là bạn chưa?
  const isFriend = await friendRepository.existsFriend(from, to);
  if (isFriend) {
    throw ApiError.badRequest("You are already friends.");
  }

  // Kiểm tra xem đã có yêu cầu PENDING nào giữa 2 người chưa (cả 2 chiều)
  const hasPendingRequest = await friendRequestRepository.existsPendingRequest(
    from,
    to,
  );
  if (hasPendingRequest) {
    throw ApiError.badRequest(
      "A friend request between you two already exists.",
    );
  }

  // Tạo Yêu cầu kết bạn
  const friendRequest = await friendRequestRepository.createRequest({
    from,
    to,
    message,
  });

  return friendMapper.toFriendRequest(friendRequest);
};

// ==============================
// ACCEPT REQUEST
// ==============================
export const acceptRequest = async (requestId, userId) => {
  // Kiểm tra xem lời mời kết bạn đó còn hay không
  const request = await friendRequestRepository.findById(requestId);
  if (!request) {
    throw ApiError.notFound("Friend request not found.");
  }

  // Kiểm tra người nhận lời mời đó có phải là mình không?
  if (request.to.toString() !== userId) {
    throw ApiError.forbidden("Permission denied.");
  }

  // Sắp xếp ID để nhất quán (userAId < userBId)
  const [userA, userB] =
    request.from.toString() < request.to.toString()
      ? [request.from, request.to]
      : [request.to, request.from];

  // Tạo mối quan hệ bạn bè trong DB
  const friend = await friendRepository.createFriend({
    userA,
    userB,
  });

  // Xoá lời mời kết bạn sau khi đã chấp nhận
  await friendRequestRepository.deleteById(requestId);

  return friendMapper.toFriend(friend);
};

// ==============================
// REJECT REQUEST
// ==============================
export const rejectRequest = async (requestId, userId) => {
  // Kiểm tra xem lời mời kết bạn đó còn hay không
  const request = await friendRequestRepository.findById(requestId);
  if (!request) {
    throw ApiError.notFound("Friend request not found.");
  }

  // Kiểm tra người nhận lời mời đó có phải là mình không?
  if (request.to.toString() !== userId) {
    throw ApiError.forbidden("Permission denied.");
  }

  // Xoá lời mời kết bạn
  await friendRequestRepository.deleteById(requestId);
};

// ==============================
// CANCEL REQUEST
// ==============================
export const cancelRequest = async (requestId, userId) => {
  // Kiểm tra xem lời mời kết bạn đó còn hay không
  const request = await friendRequestRepository.findById(requestId);
  if (!request) {
    throw ApiError.notFound("Friend request not found.");
  }

  // Kiểm tra người gửi lời mời đó có phải là mình không?
  if (request.from.toString() !== userId) {
    throw ApiError.forbidden("Permission denied.");
  }

  // Xoá lời mời kết bạn
  await friendRequestRepository.deleteById(requestId);
};

// ==============================
// UNFRIEND
// ==============================
export const unfriend = async (userId, otherUserId) => {
  // Kiểm tra xem mình có là bạn với người mình muốn huỷ kết bạn không
  const friend = await friendRepository.findFriend(userId, otherUserId);
  if (!friend) {
    throw ApiError.notFound("Friend not found.");
  }

  // Xoá mối quan hệ bạn bè đó
  await friendRepository.deleteById(friend._id);
};

// ==============================
// GET LISTS
// ==============================
export const getFriends = async (userId) => {
  const friends = await friendRepository.findFriends(userId);
  return friendMapper.toFriendWithUserList(friends, userId);
};

export const getReceivedRequests = async (userId) => {
  const receivedRequests =
    await friendRequestRepository.findReceivedRequests(userId);
  return friendMapper.toReceivedFriendRequestList(receivedRequests);
};

export const getSentRequests = async (userId) => {
  const sentRequests = await friendRequestRepository.findSentRequests(userId);
  return friendMapper.toSentFriendRequestList(sentRequests);
};

// ==============================
// GET RELATIONSHIP STATUS
// ==============================
export const getRelationshipStatus = async (currentUserId, targetUserId) => {
  const currentId = currentUserId.toString();
  const targetId = targetUserId.toString();

  if (currentId === targetId) {
    return "self";
  }

  const isFriend = await friendRepository.existsFriend(currentId, targetId);

  if (isFriend) {
    return "friend";
  }

  const pendingRequest = await friendRequestRepository.findPendingRequest(
    currentId,
    targetId,
  );

  if (!pendingRequest) {
    return "none";
  }

  if (pendingRequest.from.toString() === currentId) {
    return "request_sent";
  }

  if (pendingRequest.to.toString() === currentId) {
    return "request_received";
  }

  return "none";
};
