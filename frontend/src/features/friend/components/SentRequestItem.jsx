import { Clock, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const SentRequestItem = ({ request, onCancel, onViewProfile }) => {
  const displayName = request?.displayName || "Người dùng";
  const username = request?.username || "username";
  const avatarURL = request?.avatarURL || "";
  const createdAt = request?.createdAt || "Vừa gửi";

  return (
    <div className="bg-card flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between">
      {/* User */}
      <div className="flex min-w-0 items-center gap-3">
        <Avatar className="size-12">
          <AvatarImage src={avatarURL} alt={displayName} />

          <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-medium">{displayName}</h3>

            <Badge variant="secondary" className="hidden sm:inline-flex">
              Đã gửi
            </Badge>
          </div>

          <p className="text-muted-foreground truncate text-sm">@{username}</p>

          <div className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
            <Clock className="size-3" />
            <span>{createdAt}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewProfile?.(request)}
        >
          Xem hồ sơ
        </Button>

        <Button variant="outline" size="sm" onClick={() => onCancel?.(request)}>
          <X className="size-4" />
          Hủy lời mời
        </Button>
      </div>
    </div>
  );
};

export default SentRequestItem;
