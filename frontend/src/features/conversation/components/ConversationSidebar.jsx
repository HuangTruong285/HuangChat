import { useState } from "react";
import { Search } from "lucide-react";
import useAuth from "../../auth/useAuth";
import ConversationItem from "./ConversationItem";

// Import các component từ Shadcn UI
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarBadge,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function ConversationSidebar({
  conversations = [],
  loading,
  activeConversation,
  onSelectConversation,
}) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // Lọc danh sách hội thoại theo từ khóa tìm kiếm
  const filteredConversations = conversations.filter((conversation) =>
    conversation.title?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Lấy chữ cái đầu làm Fallback khi avatar lỗi
  const userInitial = user?.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : "U";

  return (
    <aside className="border-sidebar-border bg-sidebar text-sidebar-foreground flex h-full w-80 flex-col border-r">
      {/* ============================== CURRENT USER ============================== */}
      <div className="flex items-center justify-between p-4">
        <div className="flex min-w-0 items-center gap-3">
          {/* Avatar */}
          <div className="shrink-0">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={
                  user?.avatarUrl ??
                  "https://i.pravatar.cc/256?img=12&utm_source=chatgpt.com"
                }
                alt={user?.name ?? "Avatar"}
              />
              <AvatarFallback>{userInitial}</AvatarFallback>
              <AvatarBadge className="bg-emerald-500" />
            </Avatar>
          </div>

          {/* Thông tin user */}
          <div className="min-w-0">
            <h3 className="text-sidebar-foreground truncate text-sm font-semibold">
              {user?.displayName ?? "Người dùng"}
            </h3>
            <p className="text-muted-foreground text-xs">Trực tuyến</p>
          </div>
        </div>
      </div>

      <Separator />
      {/* ============================== SEARCH & ACTION ============================== */}
      <div className="p-3">
        <div className="relative">
          <Search
            className="text-muted-foreground absolute top-2.5 left-3"
            size={18}
          />
          <Input
            type="text"
            placeholder="Tìm kiếm cuộc trò chuyện..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-background h-9 rounded-xl pl-9 text-sm"
          />
        </div>
      </div>

      {/* ============================== CONVERSATIONS LIST ============================== */}
      <ScrollArea className="flex-1 px-2">
        {loading ? (
          /* Skeleton Loading State */
          <div className="space-y-3 p-2">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex items-center gap-3 p-2">
                <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredConversations.length === 0 ? (
          /* Empty State */
          <div className="text-muted-foreground flex flex-col items-center justify-center p-8 text-center text-sm">
            <p>
              {searchQuery
                ? "Không tìm thấy cuộc trò chuyện nào"
                : "Chưa có cuộc trò chuyện nào"}
            </p>
          </div>
        ) : (
          /* Danh sách cuộc trò chuyện */
          <div className="space-y-1 pb-2">
            {filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isActive={activeConversation?.id === conversation.id}
                onSelectConversation={() => onSelectConversation(conversation)}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </aside>
  );
}
