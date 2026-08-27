import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import DefaultAvatar from "@/assets/image/Avatar.png";

const MessageItem = ({ message }) => {
  const isMine = message.isMine;
  const avatarUrl = message.sender.avatarUrl ?? DefaultAvatar;

  // Lấy chữ cái đầu tên người gửi để làm Avatar Fallback
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={`flex items-start gap-2 ${
        isMine ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar người gửi (Chỉ hiển thị đối với tin nhắn của người khác) */}
      {!isMine && (
        <Avatar className="mt-1 h-8 w-8 shrink-0">
          <AvatarImage src={avatarUrl} alt="Avatar" />
          <AvatarFallback className="bg-slate-700 text-[10px] text-slate-200">
            {getInitials(message.sender.displayName)}
          </AvatarFallback>
        </Avatar>
      )}

      {/* Nội dung bong bóng tin nhắn */}
      <div className="max-w-[70%]">
        <div
          className={`rounded-2xl p-3 text-sm text-slate-200 ${
            isMine
              ? "rounded-tr-none bg-indigo-600"
              : "rounded-tl-none bg-slate-800"
          }`}
        >
          {/* Tin nhắn dạng Văn bản */}
          {message.type === "text" && (
            <p className="wrap-break-word whitespace-pre-wrap">
              {message.content}
            </p>
          )}

          {/* Tin nhắn dạng Hình ảnh (Có Dialog để xem phóng to) */}
          {message.type === "image" && (
            <Dialog>
              <DialogTrigger asChild>
                <img
                  src={message.imgUrl}
                  alt="Attachment"
                  className="max-h-60 max-w-full cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-90"
                />
              </DialogTrigger>
              <DialogContent className="max-w-3xl border-none bg-transparent p-0 shadow-none">
                <img
                  src={message.imgUrl}
                  alt="Attachment full view"
                  className="max-h-[85vh] w-full rounded-lg object-contain"
                />
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Thời gian gửi tin nhắn */}
        <span
          className={`mt-1 block text-[10px] text-slate-500 ${
            isMine ? "pr-1 text-right" : "pl-1"
          }`}
        >
          {message.createdAt}
        </span>
      </div>
    </div>
  );
};

export default MessageItem;
