import { RefreshCw, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

const FriendHeader = ({ onRefresh, refreshing = false }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl">
          <Users className="size-6" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Bạn bè</h1>

          <p className="text-muted-foreground text-sm">
            Kết nối và trò chuyện cùng bạn bè
          </p>
        </div>
      </div>

      {/* Actions */}
      <Button
        variant="outline"
        size="icon"
        onClick={onRefresh}
        disabled={refreshing}
        title="Làm mới"
      >
        <RefreshCw className={`size-4 ${refreshing ? "animate-spin" : ""}`} />
      </Button>
    </div>
  );
};

export default FriendHeader;
