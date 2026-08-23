import { Clock, UserPlus, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import SentRequestItem from "./SentRequestItem";

const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const SentRequestList = ({ requests = [], loading = false, onCancel }) => {
  if (requests.length === 0) {
    return (
      <div className="bg-card flex min-h-75 flex-col items-center justify-center rounded-xl border text-center">
        <div className="bg-muted mb-4 flex size-12 items-center justify-center rounded-full">
          <UserPlus className="text-muted-foreground size-6" />
        </div>

        <h3 className="font-medium">Chưa gửi lời mời nào</h3>

        <p className="text-muted-foreground mt-1 text-sm">
          Những lời mời kết bạn bạn đã gửi sẽ xuất hiện ở đây.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {requests.map((request) => (
        <SentRequestItem key={request.id} request={request} />
      ))}
    </div>
  );
};

export default SentRequestList;
