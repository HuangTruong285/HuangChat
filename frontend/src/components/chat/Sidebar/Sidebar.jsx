import { Search, LogOut, MessageSquare, Settings, User } from "lucide-react";
import avatar from "../../../assets/image/Avatar.jpg";

export default function Sidebar() {
  return (
    <div className="flex h-screen w-80 flex-col border-r border-slate-800 bg-slate-900 text-slate-100">
      {/* 1. Header: Thông tin User */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-950/50 p-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={avatar}
              alt="Avatar"
              className="h-12 w-12 rounded-full border border-slate-700"
            />
            <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full bg-emerald-500"></span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100">Hoang</h3>
            <p className="text-xs text-slate-400">online</p>
          </div>
        </div>
        <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-rose-400">
          <LogOut size={18} />
        </button>
      </div>

      {/* 2. Ô tìm kiếm */}
      <div className="p-3">
        <div className="relative">
          <Search
            className="absolute top-2.5 left-3 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            className="w-full rounded-xl bg-slate-800 py-2 pr-4 pl-10 text-sm text-slate-200 transition-all placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* 3. Danh sách cuộc trò chuyện */}
      <div className="flex-1 space-y-1 overflow-y-auto px-2">
        {/* Item Active (Đang chọn) */}
        <div className="flex cursor-pointer items-center space-x-3 rounded-xl bg-indigo-600 p-3 text-white shadow-lg shadow-indigo-600/20">
          <div className="relative">
            <img src={avatar} alt="Avatar" className="h-11 w-11 rounded-full" />
            <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full bg-emerald-500"></span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-baseline justify-between">
              <h4 className="truncate text-sm font-medium">Thảo Minh</h4>
              <span className="text-[10px] text-indigo-200">10:42</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="truncate text-xs text-indigo-100">
                Tối nay đi ăn lẩu không bạn?
              </p>
              <span className="ml-2 rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                2
              </span>
            </div>
          </div>
        </div>
        {/* Item Normal (Online) */}
        <div className="flex cursor-pointer items-center space-x-3 rounded-xl p-3 text-slate-300 transition-all hover:bg-slate-800/60 hover:text-slate-100">
          <div className="relative">
            <img src={avatar} alt="Avatar" className="h-11 w-11 rounded-full" />
            <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-500"></span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-baseline justify-between">
              <h4 className="truncate text-sm font-medium">Hoàng Nam</h4>
              <span className="text-[10px] text-slate-500">09:15</span>
            </div>
            <p className="truncate text-xs text-slate-400">
              Gửi cho mình xin file thiết kế với
            </p>
          </div>
        </div>

        {/* Item Normal (Offline) */}
        <div className="flex cursor-pointer items-center space-x-3 rounded-xl p-3 text-slate-300 transition-all hover:bg-slate-800/60 hover:text-slate-100">
          <div className="relative">
            <img src={avatar} alt="Avatar" className="h-11 w-11 rounded-full" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-baseline justify-between">
              <h4 className="truncate text-sm font-medium">Mỹ Duyên</h4>
              <span className="text-[10px] text-slate-500">Hôm qua</span>
            </div>
            <p className="truncate text-xs text-slate-400">Okie bạn nha!</p>
          </div>
        </div>
      </div>

      {/* 4. Footer Thanh điều hướng */}
      <div className="flex justify-around border-t border-slate-800 bg-slate-950/30 p-3">
        <button className="rounded-lg p-2 text-indigo-400 hover:bg-slate-800">
          <MessageSquare size={20} />
        </button>
        <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200">
          <User size={20} />
        </button>
        <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200">
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
}
