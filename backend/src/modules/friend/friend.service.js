import ApiError from "../../utils/ApiError.js";

import { userRepository } from "../user/index.js";
import * as friendRepository from "./friend.repository.js";
import * as friendRequestRepository from "./friendRequest.repository.js";

// Gửi lời mời kêt bạn
export const sendRequest = async ({ from, to, message = "" }) => {
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
  const isFriend = await friendRepository.findFriend(from, to);
  if (isFriend) {
    throw ApiError.badRequest("You are already friends.");
  }

  // Kiểm tra có ai đã gửi lời mời trước cho mình chưa?
  const request = await friendRequestRepository.findRequestBetweenUsers(
    from,
    to,
  );
  if (request) {
    throw ApiError.badRequest("Friend request already exits.");
  }

  // Tạo Yêu cầu kết bạn
  const friendRequest = friendRequestRepository.create({
    from,
    to,
    message,
  });

  return friendRequest;
};

// Chấp nhận lời mời
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

  // userAId < userBId
  const [userA, userB] =
    request.from.toString() < request.to.toString()
      ? [request.from, request.to]
      : [request.to, request.from];

  // Tạo mối quan hệ trong DB
  const friend = await friendRepository.create({
    userA,
    userB,
  });

  // Xoá lời mời kết bạn
  await friendRequestRepository.deleteById(requestId);

  return friend;
};

// Từ chối lời mời
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

// Huỷ lời mời đã gửi
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

// Huỷ kết bạn
export const unfriend = async (userId, friendId) => {
  // Kiểm tra xem mình có là bạn với người mình muốn huỷ kết bạn không
  const friend = await friendRepository.findFriend(userId, friendId);
  if (!friend) {
    throw ApiError.notFound("Friend not found.");
  }

  // Xoá mối quan hệ bạn bè đó
  await friendRepository.deleteById(friend._id);
};

// Danh sách bạn bè
export const getFriends = async (userId) => {
  return friendRepository.findFriends(userId);
};

// Danh sách lời mời đã nhận
export const getReceivedRequests = async (userId) => {
  return friendRequestRepository.findReceivedRequests(userId);
};

// Danh sách lời mời đã gửi
export const getSentRequests = async (userId) => {
  return friendRequestRepository.findSentRequests(userId);
};
