import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 mx-auto flex max-w-7xl items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        {/* LOGO */}
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white shadow-lg shadow-indigo-600/20">
          C
        </div>
        <span className="bg-linear-to-r from-indigo-600 to-cyan-600 bg-clip-text text-xl font-bold tracking-wider text-transparent">
          ChatNe
        </span>
      </div>

      <div>
        <Link
          to="/auth"
          className="transform rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-700"
        >
          Đăng nhập / Đăng ký
        </Link>
      </div>
    </nav>
  );
}
