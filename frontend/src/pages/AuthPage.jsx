import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-xl transition-all">
        {/* Tiêu đề & Chuyển đổi tab */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {isLogin ? "Chào mừng trở lại" : "Tạo tài khoản mới"}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {isLogin ? "Chưa có tài khoản" : "Đã có tài khoản từ trước?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 font-semibold text-indigo-600 underline hover:text-indigo-500 focus:outline-none"
            >
              {isLogin ? "Đăng ký ngay" : "Đăng nhập tại đây"}
            </button>
          </p>
        </div>

        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
