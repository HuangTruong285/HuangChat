import {
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Send,
  Smile,
  Image as ImageIcon,
} from "lucide-react";

export default function ChatArea() {
  return (
    <div className="flex h-screen flex-1 flex-col bg-slate-950 text-slate-100">
      {/* 1. Header: Thông tin đối phương & Actions */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
              alt="Avatar"
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-500"></span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100">Thảo Minh</h3>
            <p className="text-xs text-emerald-400">Đang hoạt động</p>
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

      {/* 2. Nội dung hội thoại (Messages Container) */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {/* Mốc thời gian */}
        <div className="flex justify-center">
          <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-[11px] text-slate-500">
            Hôm nay, 10:30
          </span>
        </div>

        {/* Tin nhắn từ người khác (Bên trái) */}
        <div className="flex items-start space-x-2">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
            alt="Avatar"
            className="mt-1 h-8 w-8 rounded-full object-cover"
          />
          <div className="max-w-[70%]">
            <div className="rounded-2xl rounded-tl-none bg-slate-800 p-3 text-sm text-slate-200">
              Chào bạn! Dự án MERN Stack của chúng ta làm tới đâu rồi nhỉ?
            </div>
            <span className="mt-1 block pl-1 text-[10px] text-slate-500">
              10:32 AM
            </span>
          </div>
        </div>

        {/* Tin nhắn gửi đi (Bên phải - Của mình) */}
        <div className="flex items-start justify-end space-x-2">
          <div className="max-w-[70%]">
            <div className="rounded-2xl rounded-tr-none bg-indigo-600 p-3 text-sm text-white shadow-md shadow-indigo-600/10">
              Mình đang dựng giao diện Sidebar với ChatArea xong rồi này! Cực
              mượt luôn.
            </div>
            <span className="mt-1 block pr-1 text-right text-[10px] text-slate-500">
              10:35 AM
            </span>
          </div>
        </div>

        {/* Tin nhắn hình ảnh gửi đi (Bên phải) */}
        <div className="flex items-start justify-end space-x-2">
          <div className="max-w-[60%]">
            <div className="rounded-2xl rounded-tr-none bg-indigo-600 p-1.5">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80"
                alt="Attachment"
                className="max-h-60 w-full rounded-xl object-cover"
              />
            </div>
            <span className="mt-1 block pr-1 text-right text-[10px] text-slate-500">
              10:36 AM
            </span>
          </div>
        </div>

        {/* Tin nhắn nhận phản hồi (Bên trái) */}
        <div className="flex items-start space-x-2">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
            alt="Avatar"
            className="mt-1 h-8 w-8 rounded-full object-cover"
          />
          <div className="max-w-[70%]">
            <div className="rounded-2xl rounded-tl-none bg-slate-800 p-3 text-sm text-slate-200">
              Xịn quá! Tối nay đi ăn lẩu mừng hoàn thành xong UI không bạn? 🍲
            </div>
            <span className="mt-1 block pl-1 text-[10px] text-slate-500">
              10:42 AM
            </span>
          </div>
        </div>
      </div>

      {/* 3. Ô nhập tin nhắn (Input Footer) */}
      <div className="border-t border-slate-800 bg-slate-900/30 p-4">
        <div className="flex items-center space-x-2 rounded-2xl border border-slate-800 bg-slate-900 p-2 transition-colors focus-within:border-indigo-500/50">
          {/* Nút đính kèm file/ảnh */}
          <button className="p-2 text-slate-400 transition-colors hover:text-indigo-400">
            <Paperclip size={18} />
          </button>
          <button className="p-2 text-slate-400 transition-colors hover:text-indigo-400">
            <ImageIcon size={18} />
          </button>

          {/* Input chính */}
          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            className="flex-1 bg-transparent px-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
          />

          {/* Emoji & Send Button */}
          <button className="p-2 text-slate-400 transition-colors hover:text-amber-400">
            <Smile size={18} />
          </button>
          <button className="rounded-xl bg-indigo-600 p-2.5 text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-500 active:scale-95">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
