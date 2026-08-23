import * as friendApi from "./friend.api";

export const getFriends = async () => {
  return await friendApi.getFriends();
};

export const sendFriendRequest = async ({ to, message = "" }) => {
  return await friendApi.sendFriendRequest({ to, message });
};

export const acceptFriendRequest = async (requestId) => {
  return await friendApi.acceptFriendRequest(requestId);
};

export const rejectFriendRequest = async (requestId) => {
  return await friendApi.rejectFriendRequest(requestId);
};

export const cancelFriendRequest = async (requestId) => {
  return await friendApi.cancelFriendRequest(requestId);
};

export const unfriend = async (friendId) => {
  return await friendApi.unfriend(friendId);
};

export const getReceivedRequests = async () => {
  return await friendApi.getReceivedRequests();
};

export const getSentRequests = async () => {
  return await friendApi.getSentRequests();
};
