import React from "react";
import { MessageSquareOff, Home, ArrowLeft, RefreshCw } from "lucide-react";

const NotFound = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 p-4 text-slate-100">
      {/* Background Decorative Blur Effect */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/3 h-80 w-80 rounded-full bg-violet-600/15 blur-3xl" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        {/* Animated Icon Container */}
        <div className="relative mb-6">
          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
            <MessageSquareOff className="h-12 w-12 animate-pulse text-indigo-400" />
          </div>
          {/* Decorative Chat Bubble Tail */}
          <div className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full bg-indigo-500/20 blur-md" />
        </div>

        {/* Badge */}
        <span className="mb-4 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-indigo-400 uppercase">
          Lỗi 404 • Thất lạc tin nhắn
        </span>

        {/* Heading */}
        <h1 className="mb-3 bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
          Trang không tồn tại
        </h1>

        {/* Description */}
        <p className="mb-8 text-sm leading-relaxed text-slate-400 sm:text-base">
          Đoạn chat hoặc đường dẫn bạn đang tìm kiếm có vẻ đã bị xóa, đổi tên
          hoặc chưa từng tồn tại trên máy chủ.
        </p>

        {/* Action Buttons */}
        <div className="flex w-full flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-5 py-2.5 text-sm font-medium text-slate-200 transition-all duration-200 hover:border-slate-700 hover:bg-slate-800 active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </button>

          <a
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:bg-indigo-500 active:scale-[0.98]"
          >
            <Home className="h-4 w-4" />
            Về trang chủ
          </a>
        </div>

        {/* Footer info */}
        <div className="mt-12 flex w-full items-center justify-between border-t border-slate-900/80 pt-6 text-xs text-slate-500">
          <span>WebChat App</span>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1 transition-colors hover:text-slate-300"
          >
            <RefreshCw className="h-3 w-3" /> Tải lại trang
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
