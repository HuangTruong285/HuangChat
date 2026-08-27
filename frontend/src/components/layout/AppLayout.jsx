import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";

export default function AppLayout() {
  return (
    <div className="bg-background flex h-screen overflow-hidden">
      {/* Main application navigation */}
      <AppSidebar />

      {/* Page content */}
      <main className="min-h-0 min-w-0 flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
