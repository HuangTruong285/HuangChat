import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const showLogin = () => setIsLogin(true);
  const showRegister = () => setIsLogin(false);

  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 items-center justify-center bg-indigo-600 text-white lg:flex">
        <div>
          <h1 className="text-5xl font-bold">Huang Chat</h1>
          <p className="mt-4 text-lg">
            Kết nối với mọi người theo thời gian thực
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-gray-50">
        {isLogin ? (
          <LoginForm onSwitchForm={showRegister} />
        ) : (
          <RegisterForm onSwitchForm={showLogin} />
        )}
      </div>
    </div>
  );
}
