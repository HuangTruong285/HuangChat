import { Search, LogOut } from "lucide-react";
import avatar from "../../assets/image/Avatar.jpg";

import ConversationItem from "./ConversationItem";

export default function ConversationSidebar({
  conversations,
  loading,
  activeConversation,
  onSelectConversation,
}) {
  return (
    <aside className="border-sidebar-border bg-sidebar text-sidebar-foreground flex w-80 flex-col border-r">
      {/* ============================== CURRENT USER ============================== */}
      <div className="border-sidebar-border flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <img
              src={avatar}
              alt="Avatar"
              className="border-sidebar-border h-12 w-12 rounded-full border object-cover"
            />

            {/* Online status */}
            <span className="border-sidebar absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 bg-emerald-500" />
          </div>

          {/* User information */}
          <div>
            <h3 className="text-sidebar-foreground text-sm font-semibold">
              Hoang
            </h3>

            <p className="text-muted-foreground text-xs">online</p>
          </div>
        </div>

        {/* Logout */}
        <button
          className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-lg p-2 transition"
          title="Đăng xuất"
        >
          <LogOut size={18} />
        </button>
      </div>

      {/* ============================== SEARCH ============================== */}
      <div className="p-3">
        <div className="relative">
          <Search
            className="text-muted-foreground absolute top-2.5 left-3"
            size={18}
          />

          <input
            type="text"
            placeholder="Tìm kiếm cuộc trò chuyện..."
            className="border-input bg-background text-foreground focus:ring-ring w-full rounded-xl border py-2 pr-4 pl-10 text-sm transition outline-none focus:ring-2"
          />
        </div>
      </div>

      {/* ============================== CONVERSATIONS ============================== */}
      {loading ? (
        <div className="text-muted-foreground p-4 text-sm">
          Đang tải cuộc trò chuyện...
        </div>
      ) : conversations.length === 0 ? (
        <div className="text-muted-foreground flex flex-1 items-center justify-center p-4 text-center text-sm">
          Chưa có cuộc trò chuyện nào
        </div>
      ) : (
        <div className="flex-1 space-y-1 overflow-y-auto px-2 pb-2">
          {conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={activeConversation?.id === conversation.id}
              onClick={() => onSelectConversation(conversation)}
            />
          ))}
        </div>
      )}
    </aside>
  );
}
