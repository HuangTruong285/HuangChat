import { UserPlus } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import FriendRequestItem from "./FriendRequestItem";

const FriendRequestList = ({
  requests = [],
  loading = false,
  onAccept,
  onReject,
}) => {
  if (loading) {
    return (
      <Card>
        <CardContent className="flex min-h-75 items-center justify-center">
          <p className="text-muted-foreground text-sm">
            Đang tải lời mời kết bạn...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (requests.length == 0) {
    return (
      <Card>
        <CardContent className="flex min-h-75 flex-col items-center justify-center text-center">
          <div className="bg-muted mb-4 flex size-12 items-center justify-center rounded-full">
            <UserPlus className="text-muted-foreground size-6" />
          </div>
          <h3 className="font-medium">Chưa có lời mời kết bạn</h3>
          <p className="text-muted-foreground mt-1 text-sm">
            Các lời mời kết bạn bạn nhận được sẽ xuất hiện ở đây.
          </p>
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="space-y-3">
      {requests.map((request) => (
        <FriendRequestItem
          key={request.id}
          request={request}
          onAccept={onAccept}
          onReject={onReject}
        />
      ))}
    </div>
  );
};

export default FriendRequestList;
