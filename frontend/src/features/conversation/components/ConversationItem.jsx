import avatarDefault from "@/assets/image/Avatar.png";
import { formatConversationTime } from "../../../utils/date";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ConversationItem({
  conversation,
  isActive,
  onSelectConversation,
}) {
  const unreadCount = conversation?.unreadCount ?? 0;
  const isUnread = unreadCount > 0;

  // Lấy chữ cái đầu làm Fallback khi ảnh lỗi
  const titleInitial = conversation?.title
    ? conversation.title.charAt(0).toUpperCase()
    : "C";

  // Helper hiển thị nội dung tin nhắn cuối cùng theo loại
  const renderLastMessageContent = () => {
    const lastMsg = conversation?.lastMessage;
    if (!lastMsg) return "Chưa có tin nhắn nào";

    switch (lastMsg.type) {
      case "image":
        return "[Hình ảnh]";
      case "file":
        return "[Tệp đính kèm]";
      case "audio":
        return "[Tin nhắn thoại]";
      default:
        return lastMsg.content || "";
    }
  };

  return (
    <button
      type="button"
      onClick={onSelectConversation}
      className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors ${
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
          : "hover:bg-sidebar-accent/60 text-sidebar-foreground"
      }`}
    >
      {/* Avatar & Trạng thái Online */}
      <Avatar className="h-11 w-11 shrink-0">
        <AvatarImage
          src={conversation?.avatarUrl || avatarDefault}
          alt={conversation?.title || "Avatar"}
        />
        <AvatarFallback>{titleInitial}</AvatarFallback>
      </Avatar>

      {/* Thông tin cuộc hội thoại */}
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between gap-2">
          <h4
            className={`truncate text-sm ${
              isUnread ? "text-foreground font-bold" : "font-medium"
            }`}
          >
            {conversation?.title}
          </h4>

          {conversation?.lastMessageAt && (
            <span
              className={`shrink-0 text-[10px] ${
                isUnread
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              {formatConversationTime(conversation.lastMessageAt)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <p
            className={`truncate text-xs ${
              isUnread ? "text-foreground font-medium" : "text-muted-foreground"
            }`}
          >
            {renderLastMessageContent()}
          </p>

          {/* Badge hiển thị số tin chưa đọc */}
          {isUnread && (
            <Badge
              variant="default"
              className="h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 text-[10px] font-bold"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
}
