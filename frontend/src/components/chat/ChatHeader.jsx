import { Phone, Video, MoreVertical } from "lucide-react";
export default function ChatHeader({ conversation }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-4">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src={
              conversation?.avatar ??
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
            }
            alt={conversation?.name ?? "Avatar"}
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-500"></span>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-100">
            {conversation?.name ?? "Chọn một cuộc trò chuyện"}
          </h3>
          <p className="text-xs text-emerald-400">
            {conversation ? "Đang hoạt động" : ""}
          </p>
        </div>
      </div>

      {/* Nút thao tác cuộc gọi & menu */}
      <div className="flex items-center space-x-1 text-slate-400">
        <button className="rounded-lg p-2 transition-colors hover:bg-slate-800 hover:text-slate-200">
          <Phone size={18} />
        </button>
        <button className="rounded-lg p-2 transition-colors hover:bg-slate-800 hover:text-slate-200">
          <Video size={18} />
        </button>
        <button className="rounded-lg p-2 transition-colors hover:bg-slate-800 hover:text-slate-200">
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
}
