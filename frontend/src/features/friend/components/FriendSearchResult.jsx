import { UserPlus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const getInitials = (name = "") => {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const FriendSearchResult = ({ users = [], loading = false, onSendRequest }) => {
  // ==============================
  // LOADING
  // ==============================
  if (loading) {
    return (
      <div className="mt-4 rounded-xl border p-4">
        <p className="text-muted-foreground text-sm">Đang tìm kiếm...</p>
      </div>
    );
  }

  // ==============================
  // EMPTY
  // ==============================
  if (users.length === 0) {
    return (
      <div className="mt-4 rounded-xl border p-8 text-center">
        <p className="text-muted-foreground text-sm">
          Không tìm thấy người dùng
        </p>
      </div>
    );
  }

  // ==============================
  // RESULTS
  // ==============================
  return (
    <div className="mt-4 space-y-2">
      <p className="text-muted-foreground px-1 text-sm">Kết quả tìm kiếm</p>

      <div className="divide-y rounded-xl border">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between gap-4 p-4"
          >
            {/* User info */}
            <div className="flex min-w-0 items-center gap-3">
              <Avatar className="size-10">
                <AvatarImage src={user.avatarUrl} alt={user.displayName} />

                <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="truncate font-medium">{user.displayName}</p>

                <p className="text-muted-foreground truncate text-sm">
                  @{user.username}
                </p>
              </div>
            </div>

            {/* Action */}
            <Button size="sm" onClick={() => onSendRequest(user.id)}>
              <UserPlus className="size-4" />
              Thêm bạn
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendSearchResult;
