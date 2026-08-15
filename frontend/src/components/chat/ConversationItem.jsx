import avatar from "../../assets/image/Avatar.jpg";

export default function ConversationItem({ conversation, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "hover:bg-sidebar-accent/70"
      }`}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <img
          src={conversation.avatarUrl || avatar}
          alt={conversation.title}
          className="h-11 w-11 rounded-full object-cover"
        />

        {/* Online status */}
        <span className="border-sidebar absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 bg-emerald-500" />
      </div>

      {/* Conversation information */}
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between gap-2">
          <h4 className="truncate text-sm font-medium">{conversation.title}</h4>

          <span className="text-muted-foreground shrink-0 text-[10px]">
            {conversation.lastMessageAt}
          </span>
        </div>

        <p className="text-muted-foreground truncate text-xs">
          {conversation.lastMessage?.content ?? ""}
        </p>
      </div>
    </button>
  );
}
