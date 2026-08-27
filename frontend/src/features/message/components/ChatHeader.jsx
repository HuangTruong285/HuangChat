import {
  Phone,
  Video,
  MoreVertical,
  User,
  BellOff,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import AvatarDefault from "@/assets/image/Avatar.png";

const ChatHeader = ({ conversation }) => {
  const avatarUrl = conversation?.avatarUrl ?? AvatarDefault;
  const title = conversation?.title ?? "Chọn một cuộc trò chuyện";

  // Lấy 2 chữ cái đầu tiên làm Fallback Avatar
  const fallbackText = title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <TooltipProvider delayDuration={150}>
      <div className="border-border bg-sidebar flex items-center justify-between border-b p-3 sm:px-4">
        {/* Thông tin hội thoại */}
        <div className="flex min-w-0 items-center space-x-3">
          <div className="relative shrink-0">
            <Avatar className="h-10 w-10">
              <AvatarImage src={avatarUrl} alt="avatar" />
              <AvatarFallback>{fallbackText}</AvatarFallback>
            </Avatar>
          </div>

          <div className="min-w-0">
            <h3 className="text-foreground truncate text-sm font-semibold">
              {title}
            </h3>
          </div>
        </div>

        {/* Nút thao tác cuộc gọi & menu tùy chọn */}
        <div className="flex items-center space-x-1">
          {/* Nút Gọi thoại */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground h-9 w-9"
                aria-label="Gọi thoại"
              >
                <Phone size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Gọi thoại</TooltipContent>
          </Tooltip>

          {/* Nút Gọi video */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground h-9 w-9"
                aria-label="Gọi video"
              >
                <Video size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Gọi video</TooltipContent>
          </Tooltip>

          {/* Menu tùy chọn thêm */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground h-9 w-9"
                    aria-label="Tùy chọn khác"
                  >
                    <MoreVertical size={18} />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom">Tùy chọn</TooltipContent>
            </Tooltip>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Xem thông tin
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <BellOff className="mr-2 h-4 w-4" />
                Tắt thông báo
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
                <Trash2 className="mr-2 h-4 w-4" />
                Xóa cuộc trò chuyện
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ChatHeader;
