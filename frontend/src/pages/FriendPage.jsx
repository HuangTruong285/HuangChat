import { Search, MessageCircle, UserPlus } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";

const friends = [
  {
    id: "1",
    displayName: "Nguyễn Văn A",
    username: "nguyenvana",
    avatar: "https://i.pravatar.cc/100?img=1",
    status: "online",
  },
  {
    id: "2",
    displayName: "Trần Văn B",
    username: "tranvanb",
    avatar: "https://i.pravatar.cc/100?img=2",
    status: "offline",
  },
  {
    id: "3",
    displayName: "Lê Văn C",
    username: "levanc",
    avatar: "https://i.pravatar.cc/100?img=3",
    status: "online",
  },
];

export default function FriendsPage() {
  return (
    <div className="bg-background text-foreground h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Bạn bè</h1>

          <p className="text-muted-foreground mt-1 text-sm">
            Quản lý bạn bè và tìm kiếm người dùng
          </p>
        </div>

        <div className="relative mb-6">
          <Search
            size={20}
            className="text-muted-foreground absolute top-3 left-4"
          />

          <input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            className="border-input bg-card text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-xl border py-3 pr-4 pl-11 text-sm shadow-sm outline-none focus:ring-2"
          />
        </div>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Bạn bè</h2>

            <span className="text-muted-foreground text-sm">3 người</span>
          </div>

          <div className="space-y-2">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="border-border bg-card flex items-center gap-4 rounded-xl border p-4 shadow-sm"
              >
                <img
                  src={friend.avatar}
                  alt={friend.displayName}
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="text-card-foreground font-medium">
                    {friend.displayName}
                  </h3>

                  <p className="text-muted-foreground text-sm">
                    @{friend.username}
                  </p>
                </div>

                <button className="bg-primary text-primary-foreground flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition hover:opacity-90">
                  <MessageCircle size={16} />
                  Nhắn tin
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
