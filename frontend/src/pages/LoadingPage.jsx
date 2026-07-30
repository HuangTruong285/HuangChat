import { useState, useEffect } from "react";

const LOADING_TEXTS = [
  "Đang tải lịch sử trò chuyện...",
  "Đang khôi phục các cuộc trò chuyện...",
  "Đang dọn dẹp phòng chat...",
  "Đang kết nối máy chủ bảo mật...",
];

export default function LoadingPage() {
  const [textIndex, setTextIndex] = useState(0);

  // Xoay vòng các câu thông báo trạng thái
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % LOADING_TEXTS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 p-4 text-slate-100 select-none">
      {/* Background Skeleton mờ phía sau tạo cảm giác giao diện chat đang load */}
      <div className="pointer-events-none absolute inset-0 flex gap-6 overflow-hidden p-6 opacity-10">
        {/* Sidebar skeleton */}
        <div className="hidden h-full w-1/4 space-y-4 border-r border-slate-700 md:block">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex animate-pulse items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-700"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 w-3/4 rounded bg-slate-700"></div>
                <div className="h-2 w-1/2 rounded bg-slate-800"></div>
              </div>
            </div>
          ))}
        </div>
        {/* Chat area skeleton */}
        <div className="flex-1 space-y-6">
          <div className="h-8 w-48 animate-pulse rounded bg-slate-700"></div>
          <div className="h-16 w-2/3 animate-pulse rounded-2xl bg-slate-800"></div>
          <div className="ml-auto h-12 w-1/2 animate-pulse rounded-2xl bg-indigo-900/50"></div>
          <div className="h-20 w-3/4 animate-pulse rounded-2xl bg-slate-800"></div>
        </div>
      </div>

      {/* Main Loader Card */}
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center rounded-3xl border border-slate-700/60 bg-slate-800/80 p-8 text-center shadow-2xl backdrop-blur-md">
        {/* Animated Chat Bubble Logo */}
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
          {/* Vòng sáng xung quanh */}
          <div className="absolute inset-0 animate-pulse rounded-2xl bg-indigo-500/20 blur-xl"></div>

          {/* Khung Icon chính */}
          <div className="relative -rotate-3 transform rounded-2xl bg-linear-to-tr from-indigo-600 to-violet-500 p-4 shadow-lg transition-transform duration-300 hover:rotate-0">
            <svg
              className="h-10 w-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>

          {/* 3 chấm typing nhảy nhót ở góc */}
          <div className="absolute -top-1 -right-1 flex gap-1 rounded-full border-2 border-slate-700 bg-slate-900 px-2 py-1 shadow">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.3s]"></span>
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.15s]"></span>
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400"></span>
          </div>
        </div>

        {/* Text trạng thái */}
        <h3 className="mb-1 text-lg font-semibold text-slate-100">
          Đang chuẩn bị cuộc trò chuyện
        </h3>

        <p className="h-6 text-sm font-medium text-indigo-300 transition-all duration-300">
          {LOADING_TEXTS[textIndex]}
        </p>

        {/* Progress bar hiệu ứng sóng */}
        <div className="relative mt-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-700/50">
          <div className="absolute inset-y-0 w-1/2 animate-[loading-bar_1.8s_infinite_ease-in-out] rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        </div>
      </div>
    </div>
  );
}
