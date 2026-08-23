import { MessageCircle, MoreHorizontal } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarBadge,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const FriendItem = ({ friend, onMessage, onUnfriend, onViewProfile }) => {
  const isOnline = friend?.status === "online";

  const displayName = friend?.displayName || "Người dùng";
  const username = friend?.username || "";
  const avatarURL = friend?.avatarURL || "";

  return (
    <div className="flex items-center justify-between gap-4 border-b p-4 last:border-b-0">
      {/* User */}
      <div className="flex min-w-0 items-center gap-3">
        <Avatar className="size-12">
          <AvatarImage src={avatarURL} alt={displayName} />

          <AvatarFallback>{getInitials(displayName)}</AvatarFallback>

          {isOnline && <AvatarBadge className="bg-green-500" />}
        </Avatar>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-medium">{displayName}</h3>

            {isOnline && (
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Online
              </Badge>
            )}
          </div>

          <p className="text-muted-foreground truncate text-sm">@{username}</p>

          <p className="text-muted-foreground text-xs">
            {isOnline ? "Đang hoạt động" : "Ngoại tuyến"}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => onMessage?.(friend)}>
          <MessageCircle className="size-4" />

          <span className="hidden md:inline">Nhắn tin</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Thêm tuỳ chọn">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewProfile?.(friend)}>
              Xem trang cá nhân
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              onClick={() => onUnfriend?.(friend.id)}
            >
              Xoá bạn
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FriendItem;
