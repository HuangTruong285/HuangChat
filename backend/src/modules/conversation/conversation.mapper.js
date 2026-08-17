import { toPublicUser } from "../user/index.js";

// ==============================
// HELPER
// ==============================
const toId = (value) => {
  if (!value) return null;

  return value._id ? value._id.toString() : value.toString();
};

const getUnreadCount = (conversation, userId) => {
  if (!conversation || !userId) return 0;

  const id = userId.toString();

  return (
    conversation.unreadCounts?.get?.(id) ?? conversation.unreadCounts?.[id] ?? 0
  );
};

// ==============================
// PARTICIPANT
// ==============================
/*
 * userId : Id của thành viên
 * displayName : Tên hiện thị của thành viên
 * avatarUrl : Link tới avatar của thành viện
 * joinedAt : Thời gian thành viên tham gia cuộc hội thoại
 */
export const toParticipant = (participant) => {
  if (!participant) return null;

  const user = participant.userId;

  return {
    user: user?._id ? toPublicUser(user) : null,
    userId: toId(user),
    joinedAt: participant.joinedAt ?? null,
  };
};

// Trả về danh sách thành viên
export const toParticipants = (participants = []) => {
  return participants.map(toParticipant);
};

// ==============================
// GROUP
// ==============================
/*
 * name : Tên nhóm
 * avatarUrl : Link avatar nhóm
 * createdBy : Id người tạo nhóm
 */
export const toGroup = (group) => {
  if (!group) return null;

  return {
    name: group.name ?? "",
    avatarUrl: group.avatarUrl ?? null,
    createdBy: toId(group.createdBy),
  };
};

// ==============================
// LAST MESSAGE
// ==============================
/*
 * id : Id tin nhắn gần nhất
 * content : Nội dung tin nhắn gần nhất
 * senderId : Id người gửi tin nhắn gần nhất
 * createdAt : Thời gian tạo tin nhắn gần nhất
 */
export const toLastMessage = (lastMessage) => {
  if (!lastMessage) return null;

  return {
    id: toId(lastMessage._id),
    content: lastMessage.content ?? "",
    senderId: toId(lastMessage.senderId),
    createdAt: lastMessage.createdAt ?? null,
  };
};

// ==============================
// CONVERSATION
// ==============================
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
    id: toId(conversation._id),
    type: conversation.type,
    participants: toParticipants(conversation.participants),
    group: toGroup(conversation.group),
    lastMessage: toLastMessage(conversation.lastMessage),
    lastMessageAt: conversation.lastMessageAt ?? null,
    seenBy: conversation.seenBy?.map(toId) ?? [],
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

// ==============================
// CONVERSATION LIST ITEM
// ==============================
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
  if (!conversation || !currentUserId) return null;

  const currentId = currentUserId?.toString();

  let title = "";
  let avatarUrl = null;

  if (conversation.type === "group") {
    title = conversation.group?.name ?? "Unnamed group";
    avatarUrl = conversation.group?.avatarUrl ?? null;
  }

  if (conversation.type == "direct") {
    const otherParticipant = conversation.participants?.find((participant) => {
      toId(participant.userId) !== currentId;
    });

    const user = otherParticipant?.userId;

    title = user?.displayName ?? user?.username ?? "Unknown user";

    avatarUrl = user?.avatarUrl ?? null;
  }

  return {
    id: toId(conversation._id),
    type: conversation.type,
    title,
    avatarUrl,
    lastMessage: toLastMessage(conversation.lastMessage),
    lastMessageAt: conversation.lastMessageAt ?? null,
    unreadCount: getUnreadCount(conversation, currentUserId),
  };
};

// ==============================
// CONVERSATION DETAIL
// ==============================
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
  if (!conversation || !currentUserId) return null;

  return {
    ...toConversation(conversation),
    unreadCount: getUnreadCount(conversation, currentUserId),
    isGroup: conversation.type === "group",
    memberCount: conversation.participants?.length ?? 0,
  };
};

// ==============================
// DIRECT CONVERSATION
// ==============================
export const toDirectConversation = (conversation, currentUserId) => {
  if (!conversation || conversation.type !== "direct" || !currentUserId) {
    return null;
  }

  const currentId = currentUserId.toString();

  const otherParticipant = conversation.participants?.find(
    (participant) => toId(participant.userId) !== currentId,
  );

  const user = otherParticipant?.userId;

  if (!user?._id) return null;

  return {
    id: toId(conversation._id),
    type: "direct",
    user: toPublic(user),
    lastMessage: toLastMessage(conversation.lastMessage),
    lastMessageAt: conversation.lastMessageAt ?? null,
    unreadCount: getUnreadCount(conversation, currentUserId),
  };
};

// ==============================
// GROUP CONVERSATION
// ==============================
export const toGroupConversation = (conversation, currentUserId) => {
  if (!conversation || conversation.type !== "group" || !currentUserId) {
    return null;
  }

  const currentUseridString = currentUserId.toString();
  const unreadCount =
    conversation.unreadCounts?.get?.(currentUserIdString) ??
    conversation.unreadCounts?.[currentUserIdString] ??
    0;

  return {
    id: toId(conversation._id),
    type: "group",
    group: toGroup(conversation.group),
    participants: toParticipants(conversation.participants),
    memberCount: conversation.participants?.length ?? 0,
    lastMessage: toLastMessage(conversation.lastMessage),
    lastMessageAt: conversation.lastMessageAt ?? null,
    unreadCount: getUnreadCount(conversation, currentUserId),
  };
};

// ==============================
// CONVERSATION MEMBER
// ==============================
export const toConversationMember = (participant) => {
  if (!participant) return null;

  const user = participant.userId;

  return {
    user: user?._id ? toPublicUser(user) : null,
    joinedAt: participant.joinedAt ?? null,
  };
};

// ==============================
// CONVERSATION PREVIEW
// ==============================
export const toConversationPreview = (conversation) => {
  if (!conversation) return null;

  return {
    id: toId(conversation._id),
    type: conversation.type,
    lastMessage: toLastMessage(conversation.lastMessage),
    lastMessageAt: conversation.lastMessageAt ?? null,
  };
};
