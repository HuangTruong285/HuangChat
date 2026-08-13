import { User, Lock, Settings } from "lucide-react";

import AppLayout from "../components/layout/AppLayout";

export default function SettingsPage() {
  return (
    <div className="bg-background text-foreground h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold">Cài đặt</h1>

        <p className="text-muted-foreground mt-1 text-sm">
          Quản lý tài khoản và thông tin cá nhân
        </p>

        <div className="mt-8 grid grid-cols-[220px_1fr] gap-8">
          {/* Settings navigation */}
          <aside className="space-y-1">
            <button className="bg-accent text-accent-foreground flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium">
              <User size={18} />
              Hồ sơ
            </button>

            <button className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition">
              <Lock size={18} />
              Mật khẩu
            </button>

            <button className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition">
              <Settings size={18} />
              Tài khoản
            </button>
          </aside>

          {/* Content */}
          <section className="border-border bg-card rounded-2xl border p-6 shadow-sm">
            <h2 className="text-card-foreground text-lg font-semibold">
              Hồ sơ cá nhân
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="text-muted-foreground mb-2 block text-sm">
                  Tên hiển thị
                </label>

                <input
                  defaultValue="Hoang"
                  className="border-input bg-background text-foreground focus:ring-ring w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2"
                />
              </div>

              <div>
                <label className="text-muted-foreground mb-2 block text-sm">
                  Username
                </label>

                <input
                  defaultValue="hoang"
                  className="border-input bg-background text-foreground focus:ring-ring w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2"
                />
              </div>

              <div>
                <label className="text-muted-foreground mb-2 block text-sm">
                  Bio
                </label>

                <textarea
                  rows={4}
                  className="border-input bg-background text-foreground focus:ring-ring w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2"
                />
              </div>

              <div className="flex justify-end">
                <button className="bg-primary text-primary-foreground rounded-lg px-5 py-2.5 text-sm font-medium transition hover:opacity-90">
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
