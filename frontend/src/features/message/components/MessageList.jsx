import { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquareDashed } from "lucide-react";

export default function MessageList({ messages = [], loading }) {
  const scrollContainerRef = useRef(null);
  const bottomRef = useRef(null);

  // Tự động cuộn xuống dưới cùng (chỉ cuộn nếu người dùng đang ở gần đáy)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Kiểm tra xem người dùng có đang ở gần đáy không (trong khoảng 150px)
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      150;

    // Nếu đang ở gần đáy hoặc mới tải danh sách, tiến hành cuộn mượt xuống
    if (isNearBottom || messages.length <= 1) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      ref={scrollContainerRef}
      className="flex-1 space-y-4 overflow-y-auto scroll-smooth p-4"
    >
      {loading ? (
        /* Trạng thái Loading: Hiển thị Skeleton bong bóng tin nhắn */
        <div className="space-y-4">
          <div className="flex items-end gap-2">
            <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
            <Skeleton className="h-12 w-48 rounded-2xl rounded-bl-none" />
          </div>
          <div className="flex items-end justify-end gap-2">
            <Skeleton className="h-16 w-64 rounded-2xl rounded-br-none" />
          </div>
          <div className="flex items-end gap-2">
            <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
            <Skeleton className="h-10 w-36 rounded-2xl rounded-bl-none" />
          </div>
        </div>
      ) : messages.length === 0 ? (
        /* Trạng thái chưa có tin nhắn (Căn giữa tuyệt đối) */
        <div className="flex h-full flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted/50 mb-3 rounded-full p-4">
            <MessageSquareDashed className="text-muted-foreground/60 h-8 w-8" />
          </div>
          <p className="text-muted-foreground text-sm font-medium">
            Chưa có tin nhắn nào
          </p>
          <p className="text-muted-foreground/70 mt-1 text-xs">
            Hãy gửi tin nhắn để bắt đầu cuộc trò chuyện!
          </p>
        </div>
      ) : (
        /* Danh sách tin nhắn */
        messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))
      )}

      {/* Điểm neo để scrollIntoView */}
      <div ref={bottomRef} />
    </div>
  );
}
