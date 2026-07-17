import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 text-center">
      {/* Badge nhỏ */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
        <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500"></span>
        Trải nghiệm realtime mượt mà
      </div>

      <h1 className="mx-auto max-w-4xl text-5xl leading-tight font-extrabold tracking-tight text-slate-900 md:text-7xl">
        Kết nối mọi lúc, trò chuyển mọi nơi với{" "}
        <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          ChatNe
        </span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
        Nền tảng nhắn tin thế hệ mới tích hợp gọi điện video chất lượng cao,
        chia sẻ ảnh tức thì và bảo mật tuyệt đối.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          to="/auth"
          className="transform rounded-2xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-indigo-600/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-700"
        >
          Bắt đầu trò chuyện ngay
        </Link>
        <a className="rounded-2xl border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-100">
          Tìm hiểu tính năng
        </a>
      </div>

      {/* Mockup Giao diện (Placeholder trắng) */}
      <div className="mx-auto mt-16 max-w-5xl rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/50">
        <div className="flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
          {/*Bạn có thể thay bằng hình ảnh màn hình app thật */}
          <span className="font-medium text-slate-400 italic">
            [Chèn hình ảnh giao diện tại đây]
          </span>
        </div>
      </div>
    </section>
  );
}
