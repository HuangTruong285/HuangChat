// ============================== MAP PARTICIPANT ==============================
export const toParticipant = (participant) => {
  if (!participant) return null;

  return {
    userId: participant.userId?._id
      ? participant.userId._id.toString()
      : participant.userId?.toString(),
    displayName: participant.userId?.displayName ?? null,
    avatarUrl: participant.userId?.avatarUrl ?? null,
    joinedAt: participant.joinedAt,
  };
};

// ============================== MAP GROUP ==============================
export const toGroup = (group) => {
  if (!group) return null;

  return {
    name: group.name,
    avatarUrl: group.avatarUrl,
    createdBy: group.createdBy?._id
      ? group.createdBy._id.toString()
      : group.createdBy?.toString(),
  };
};

// ============================== MAP LAST MESSAGE ==============================
export const toLastMessage = (lastMessage) => {
  if (!lastMessage) return null;
  return {
    id: lastMessage.id?.toString(),
    content: lastMessage.content,
    senderId: lastMessage.senderId?._id
      ? lastMessage.senderId._id.toString()
      : lastMessage.senderId?.toString(),
    createdAt: lastMessage.createdAt,
  };
};

// ============================== MAP CONVERSATION ==============================
export const toConversation = (conversation) => {
  if (!conversation) return null;

  return {
    id: conversation._id?.toString(),
    type: conversation.type,
    participants: conversation.participants?.map(toParticipant) ?? [],
    group: toGroup(conversation.group),
    lastMessage: toLastMessage(conversation.lastMessage),
    lastMessageAt: conversation.lastMessageAt,
    seenBy:
      conversation.seenBy?.map((userId) =>
        userId?._id ? userId._id.toString() : userId.toString(),
      ) ?? [],
    unreadCounts:
      conversation.unreadCounts instanceof Map
        ? Object.fromEntries(conversation.unreadCounts)
        : (conversation.unreadCounts ?? {}),
    createdAt: conversation.createdAt,
    updatedAt: conversation.updatedAt,
  };
};

// ============================== MAP CONVERSATIONS ==============================
export const toConversationList = (conversations = []) => {
  return conversations.map(toConversation);
};
