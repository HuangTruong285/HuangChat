import { toPublicUser } from "../user/index.js";

// HELPER
const toId = (value) => {
  if (!value) return null;

  return value._id ? value._id.toString() : value.toString();
};

// ==============================
// MAP FRIEND
// ==============================
export const toFriend = (friend) => {
  if (!friend) return null;

  return {
    id: toId(friend._id),
    userA: toId(friend.userA),
    userB: toId(friend.userB),
    createdAt: friend.createdAt,
    updatedAt: friend.updatedAt,
  };
};

// ==============================
// MAP FRIEND LIST
// ==============================
export const toFriendList = (friends = []) => {
  return friends.map(toFriend);
};

// ==============================
// MAP FRIEND + OTHER USER
// ==============================
export const toFriendWithUser = (friend, userId) => {
  if (!friend || !userId) return null;

  const currentUserId = userId.toString();
  const userAId = toId(friend.userA);

  const otherUser = userAId === currentUserId ? friend.userB : friend.userA;

  return {
    id: toId(friend._id),
    user: otherUser?._id ? toPublicUser(otherUser) : null,
    createdAt: friend.createdAt,
  };
};

// ==============================
// MAP FRIEND + OTHER USER LIST
// ==============================
export const toFriendWithUserList = (friends = [], userId) => {
  return friends.map((friend) => toFriendWithUser(friend, userId));
};

// ==============================
// MAP FRIEND REQUEST
// ==============================
export const toFriendRequest = (friendRequest) => {
  if (!friendRequest) return null;

  return {
    id: toId(friendRequest._id),
    from: toId(friendRequest.from),
    to: toId(friendRequest.to),
    message: friendRequest.message ?? "",
    createdAt: friendRequest.createdAt,
    updatedAt: friendRequest.updatedAt,
  };
};

// ==============================
// MAP RECEIVED REQUEST
// ==============================
export const toReceivedFriendRequest = (friendRequest) => {
  if (!friendRequest) return null;

  return {
    id: toId(friendRequest._id),
    user: toPublicUser(friendRequest.from),
    message: friendRequest.message ?? "",
    createdAt: friendRequest.createdAt,
  };
};

// ==============================
// MAP SENT REQUEST
// ==============================
export const toSentFriendRequest = (friendRequest) => {
  if (!friendRequest) return null;

  return {
    id: toId(friendRequest._id),
    user: toPublicUser(friendRequest.to),
    message: friendRequest.message ?? "",
    createdAt: friendRequest.createdAt,
  };
};

// ==============================
// MAP FRIEND REQUEST LIST
// ==============================
export const toFriendRequestList = (friendRequests = []) => {
  return friendRequests.map(toFriendRequest);
};

// ==============================
// MAP RECEIVED LIST
// ==============================
export const toReceivedFriendRequestList = (friendRequests = []) => {
  return friendRequests.map(toReceivedFriendRequest);
};

// ==============================
// MAP SENT LIST
// ==============================
export const toSentFriendRequestList = (friendRequests = []) => {
  return friendRequests.map(toSentFriendRequest);
};
