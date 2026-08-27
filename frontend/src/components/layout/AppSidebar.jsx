import {
  MessageSquare,
  User,
  Settings,
  LogOut,
  CircleUserRound,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../features/auth/useAuth";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menus = [
    { path: "/chat", icon: MessageSquare, label: "Tin nhắn" },
    { path: "/friend", icon: User, label: "Bạn bè" },
    { path: "/settings", icon: Settings, label: "Cài đặt" },
  ];

  // Helper kiểm tra active route (bao gồm cả route con)
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <TooltipProvider delayDuration={500}>
      <aside className="border-sidebar-border bg-sidebar text-sidebar-foreground flex w-16 flex-col items-center border-r py-4 select-none">
        {/* Logo */}
        <div
          className="bg-sidebar-primary text-sidebar-primary-foreground mb-8 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl shadow-sm transition-transform active:scale-95"
          onClick={() => navigate("/chat")}
        >
          <MessageSquare size={20} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-3">
          {menus.map(({ path, icon: Icon, label }) => {
            const active = isActive(path);

            return (
              <Tooltip key={path}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => navigate(path)}
                    aria-label={label}
                    className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                      active
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    <Icon size={20} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={12}>
                  {label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        {/* Profile */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => navigate("/profile")}
              aria-label="Hồ sơ"
              className={`mb-2 flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                isActive("/profile")
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <CircleUserRound size={20} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={12}>
            Hồ sơ
          </TooltipContent>
        </Tooltip>

        {/* Logout */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Đăng xuất"
              className="text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive flex h-11 w-11 items-center justify-center rounded-xl transition-colors"
            >
              <LogOut size={20} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={12}>
            Đăng xuất
          </TooltipContent>
        </Tooltip>
      </aside>
    </TooltipProvider>
  );
};

export default AppSidebar;
