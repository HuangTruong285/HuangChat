import { useState } from "react";
import LoginForm from "../features/auth/components/LoginForm";
import RegisterForm from "../features/auth/components/RegisterForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const showLogin = () => setIsLogin(true);
  const showRegister = () => setIsLogin(false);

  return (
    <div className="bg-background flex min-h-screen">
      {/* ============================== BRAND PANEL ============================== */}
      <div className="bg-primary text-primary-foreground relative hidden flex-1 items-center justify-center overflow-hidden lg:flex">
        <div className="relative z-10 px-10 text-center">
          <h1 className="text-5xl font-bold tracking-tight">Huang Chat</h1>

          <p className="text-primary-foreground/80 mt-4 text-lg">
            Kết nối với mọi người theo thời gian thực
          </p>
        </div>
      </div>

      {/* ============================== AUTH PANEL ============================== */}
      <div className="bg-background flex flex-1 items-center justify-center px-6 py-10">
        {isLogin ? (
          <LoginForm onSwitchForm={showRegister} />
        ) : (
          <RegisterForm onSwitchForm={showLogin} />
        )}
      </div>
    </div>
  );
}
