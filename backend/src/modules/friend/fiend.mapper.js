// ============================== MAP FRIEND ==============================
export const toFriend = (friend) => {
  if (!friend) return null;

  return {
    id: friend._id?.toString(),
    userA: friend.userA?._id
      ? friend.userA._id.toString()
      : friend.userA?.toString(),
    userB: friend.userB?._id
      ? friend.userB._id.toString()
      : friend.userB?.toString(),
    createdAt: friend.createdAt,
    updatedAt: friend.updatedAt,
  };
};

// ============================== MAP FRIEND LIST ==============================
export const toFriendList = (friend = []) => {
  return friends.map(toFriend);
};

export const toFriendWithUser = (friend, userId) => {
  if (!friend) return null;

  const currentUserId = userId.toString();

  const otherUser =
    friend.userA?._id?.toString() === currentUserId
      ? friend.userB
      : friend.userA;

  return {
    id: friend._id.toString(),
    user: otherUser?._id
      ? {
          id: otherUser._id.toString(),
          username: otherUser.username,
          displayName: otherUser.displayName,
          avatarUrl: otherUser.avatarUrl,
        }
      : null,
    createdAt: friend.createdAt,
  };
};

// ============================== MAP FRIEND REQUEST ==============================
export const toFriendRequest = (friendRequest) => {
  if (!friendRequest) return null;
  return {
    id: friendRequest._id?.toString(),
    from: friendRequest.from?._id
      ? friendRequest.from._id.toString()
      : friendRequest.from?.toString(),
    to: friendRequest.to?._id
      ? friendRequest.to._id.toString()
      : friendRequest.to?.toString(),
    message: friendRequest.message ?? "",
    createdAt: friendRequest.createdAt,
    updatedAt: friendRequest.updatedAt,
  };
};

// ============================== MAP FRIEND REQUEST LIST ==============================
export const toFriendRequestList = (friendRequests = []) => {
  return friendRequests.map(toFriendRequest);
};
