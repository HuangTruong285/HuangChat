import { Check, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const FriendRequestItem = ({ request, onAccept, onReject }) => {
  const displayName = request.user.displayName || "Người dùng";
  const username = request.user.username || "";
  const avatarUrl = request.user.avatarUrl || "";
  const message = request.message || "";

  return (
    <div className="bg-card flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between">
      {/* User */}
      <div className="flex min-w-0 items-center gap-3">
        <Avatar className="size-12">
          <AvatarImage src={avatarUrl} alt={displayName} />
          <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <h3 className="truncate font-medium">{displayName}</h3>
          <p className="text-muted-foreground truncate text-sm">@{username}</p>
          {message && (
            <p className="text-muted-foreground mt-1 truncate text-sm">
              {message}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 gap-2">
        <Button size="sm" onClick={() => onAccept(request.id)}>
          <Check className="size-4" />
          Chấp nhận
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => onReject(request.id)}
        >
          <X className="size-4" />
          Từ chối
        </Button>
      </div>
    </div>
  );
};

export default FriendRequestItem;
