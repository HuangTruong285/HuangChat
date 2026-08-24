import * as friendApi from "./friend.api";

// ==============================
// FRIENDS
// ==============================

export const getFriends = () => {
  return friendApi.getFriends();
};

export const unfriend = (userId) => {
  return friendApi.unfriend(userId);
};

// ==============================
// FRIEND REQUEST
// ==============================

export const sendFriendRequest = ({ to, message = "" }) => {
  return friendApi.sendFriendRequest({ to, message });
};

export const acceptFriendRequest = (requestId) => {
  return friendApi.acceptFriendRequest(requestId);
};

export const rejectFriendRequest = (requestId) => {
  return friendApi.rejectFriendRequest(requestId);
};

export const cancelFriendRequest = (requestId) => {
  return friendApi.cancelFriendRequest(requestId);
};

// ==============================
// REQUEST LIST
// ==============================

export const getReceivedRequests = () => {
  return friendApi.getReceivedRequests();
};

export const getSentRequests = () => {
  return friendApi.getSentRequests();
};

// ==============================
// RELATIONSHIP
// ==============================

export const getRelationshipStatus = (userId) => {
  return friendApi.getRelationshipStatus(userId);
};
