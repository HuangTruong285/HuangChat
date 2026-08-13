// ============================== PRIMITIVE MAPPER ==============================
// Trả về một thành viên
export const toParticipant = (participant) => {
  if (!participant) return null;

  return {
    userId: participant.userId?._id
      ? participant.userId._id.toString()
      : participant.userId?.toString(),
    displayName: participant.userId?.displayName ?? null,
    avatarUrl: participant.userId?.avatarUrl ?? null,
    joinedAt: participant.joinedAt ?? null,
  };
};

// Trả về một nhóm
export const toGroup = (group) => {
  if (!group) return null;

  return {
    name: group.name ?? "",
    avatarUrl: group.avatarUrl ?? "",
    createdBy: group.createdBy?._id
      ? group.createdBy._id.toString()
      : (group.createdBy?.toString() ?? null),
  };
};

// Trả về tin nhắn gần nhất
export const toLastMessage = (lastMessage) => {
  if (!lastMessage) return null;
  return {
    id: lastMessage.id?.toString() ?? null,
    content: lastMessage.content ?? "",
    senderId: lastMessage.senderId?._id
      ? lastMessage.senderId._id.toString()
      : (lastMessage.senderId?.toString() ?? null),
    createdAt: lastMessage.createdAt ?? null,
  };
};

// ============================== CONVERSATION MAPPER ==============================
// Trả về conversation tổng quát
/*
 * id : Id cuộc hội thoại
 * type : Loại cuộc hội thoại
 * participants : Danh sách thành viên
 * group : Thông tin về nhóm
 * lastMessage : Tin nhắn cuối cùng
 * lastMessageAt : Thời gian tin nhắn cuối cùng
 * seenBy : Danh sách Id những người đã xem tin nhắn cuối cùng
 * unreadCounts : Danh sách số tin nhắn chưa đọc của mỗi người (Id)
 * createdAt : Thời gian tạo cuộc hội thoại
 * updatedAt : Thời gian cập nhật cuộc hội thoại
 */
export const toConversation = (conversation) => {
  if (!conversation) return null;

  return {
    id: conversation._id?.toString(),
    type: conversation.type,
    participants: conversation.participants?.map(toParticipant) ?? [],
    group: toGroup(conversation.group),
    lastMessage: toLastMessage(conversation.lastMessage),
    lastMessageAt: conversation.lastMessageAt ?? null,
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

// Trả về danh sách conversation tổng quát
export const toConversationList = (conversations = []) => {
  return conversations.map(toConversation);
};

// ============================== CONVERSATION LIST ITEM ==============================
/*
 * id : Id cuộc hội thoại
 * type : Loại cuộc hội thoại (direct/group)
 * title : Tiêu đề của hồi thoại (UserName/GroupName)
 * avatarUrl : Ảnh đại diện
 * lastMessage : Tin nhắn cuối cùng
 * lastMessageAt : Thời gian tin nhắn cuối cùng được gửi
 * unreadCount : Số tin nhắn chưa đọc của bản thân
 */
export const toConversationListItem = (conversation, currentUserId) => {
  if (!conversation) return null;

  const currentUserIdString = currentUserId?.toString();
  const unreadCount =
    conversation.unreadCounts?.get?.(currentUserIdString) ??
    conversation.unreadCounts?.[currentUserIdString] ??
    0;

  let title = "";
  let avatarUrl = "";
  if (conversation.type === "group") {
    title = conversation.group?.name ?? "Unnamed group";
    avatarUrl = conversation.group?.avatarUrl ?? "";
  }
  if (conversation.type == "direct") {
    const otherParticipant = conversation.participants?.find((participant) => {
      const userId = participant.userId?._id
        ? participant.userId._id.toString()
        : participant.userId.toString();

      return userId !== currentUserIdString;
    });

    const user = otherParticipant?.userId;

    title = user?.displayName ?? user?.username ?? "Unknown user";

    avatarUrl = user?.avatarUrl ?? "";
  }

  return {
    id: conversation._id?.toString(),
    type: conversation.type,
    title,
    avatarUrl,
    lastMessage: toLastMessage(conversation.lastMessage),
    lastMessageAt: conversation.lastMessageAt ?? null,
    unreadCount,
  };
};

// ============================== CONVERSATION DETAIL ==============================
/*
 * id : Id cuộc hội thoại
 * type : Loại cuộc hội thoại
 * participants : Danh sách thành viên
 * group : Thông tin về nhóm
 * lastMessage : Tin nhắn cuối cùng
 * lastMessageAt : Thời gian tin nhắn cuối cùng
 * seenBy : Danh sách Id những người đã xem tin nhắn cuối cùng
 * unreadCounts : Danh sách số tin nhắn chưa đọc của mỗi người (Id)
 * createdAt : Thời gian tạo cuộc hội thoại
 * updatedAt : Thời gian cập nhật cuộc hội thoại
 * unreadCount: Số tin nhắn chưa đọc của chính mình
 * isGroup: Có phải là nhóm không
 * memberCount : Số lượng thành viên
 */
export const toConversationDetail = (conversation, currentUserId) => {
  if (!conversation) return null;

  const base = toConversation(conversation);

  const currentUserIdString = currentUserId.toString();
  const unreadCount =
    conversation.unreadCounts?.get?.(currentUserIdString) ??
    conversation.unreadCounts?.[currentUserIdString] ??
    0;

  return {
    ...base,
    unreadCount,
    isGroup: conversation.type === "group",
    memberCount: conversation.participants?.length ?? 0,
  };
};

// Trả về cuộc hội thoại trực tiếp (direct)
export const toDirectConversation = (conversation, currentUserId) => {
  if (!conversation || conversation.type !== "direct") {
    return null;
  }

  const currentUserIdString = currentUserId.toString();

  const otherParticipant = conversation.participants?.find((participant) => {
    const userId = participant.userId?._id
      ? participant.userId._id.toString()
      : participant.userId.toString();

    return userId !== currentUserIdString;
  });

  const user = otherParticipant?.userId;

  if (!user) return null;

  const unreadCount =
    conversation.unreadCounts?.get?.(currentUserIdString) ??
    conversation.unreadCounts?.[currentUserIdString] ??
    0;

  return {
    id: conversation._id.toString(),
    type: "direct",
    user: {
      id: user._id.toString(),
      username: user.username,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl ?? "",
      status: user.status ?? "offline",
    },

    lastMessage: toLastMessage(conversation.lastMessage),
    lastMessageAt: conversation.lastMessageAt ?? null,
    unreadCount,
  };
};

// Trả về cuộc hội thoại dành cho nhóm (group)
export const toGroupConversation = (conversation, currentUserId) => {
  if (!conversation || conversation.type !== "group") {
    return null;
  }

  const currentUseridString = currentUserId.toString();
  const unreadCount =
    conversation.unreadCounts.get?.(currentUserIdString) ??
    conversation.unreadCounts?.[currentUserIdString] ??
    0;

  return {
    id: conversation._id.toString(),
    type: "group",
    group: toGroup(conversation.group),
    participants: conversation.participants.map(toParticipant) ?? [],
    memberCount: conversation.participants?.length ?? 0,
    lastMessage: toLastMessage(conversation.lastMessage),
    lastMessageAt: conversation.lastMessageAt ?? null,
    unreadCount,
  };
};

// Trả về thông tin 1 thành viên trong cuộc hội thoại
export const toConversationMember = (participant) => {
  if (!participant) return null;

  const user = participant.userId;

  return {
    id: user?._id ? user._id.toString() : participant.userId.toString(),
    username: user?.username ?? null,
    displayName: user?.displayName ?? null,
    avatarUrl: user?.avatarURL ?? "",
    status: user?.status ?? "offline",
    joinedAt: participant.joinedAt ?? null,
  };
};

// Trả về conversation phù hợp cho search và notification
export const toConversationPreview = (conversation) => {
  if (!conversation) return null;

  return {
    id: conversation._id.toString(),
    type: conversation.type,
    lastMessage: toLastMessage(conversation.lastMessage),
    lastMessageAt: conversation.lastMessageAt ?? null,
  };
};
