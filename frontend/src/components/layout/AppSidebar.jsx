import { MessageSquare, User, Settings, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    {
      path: "/chat",
      icon: MessageSquare,
      label: "Tin nhắn",
    },
    {
      path: "/friend",
      icon: User,
      label: "Bạn bè",
    },
    {
      path: "/setting",
      icon: Settings,
      label: "Cài đặt",
    },
  ];

  return (
    <aside className="border-sidebar-border bg-sidebar text-sidebar-foreground flex w-16 flex-col items-center border-r py-4">
      {/* Logo */}
      <div className="bg-sidebar-primary text-sidebar-primary-foreground mb-8 flex h-10 w-10 items-center justify-center rounded-xl shadow-sm">
        <MessageSquare size={20} />
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-3">
        {menus.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path;

          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              title={label}
              className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon size={20} />
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        title="Đăng xuất"
        className="text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive flex h-11 w-11 items-center justify-center rounded-xl transition"
      >
        <LogOut size={20} />
      </button>
    </aside>
  );
}
