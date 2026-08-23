import { Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import FriendItem from "./FriendItem";

const FriendList = ({ friends = [], loading = false, onUnfriend }) => {
  if (loading) {
    return (
      <Card>
        <CardContent className="flex min-h-75 items-center justify-center">
          <p className="text-muted-foreground text-sm">
            Đang tải danh sách bạn bè...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (friends.length === 0) {
    return (
      <Card>
        <CardContent className="flex min-h-75 flex-col items-center justify-center text-center">
          <div className="bg-muted mb-4 flex size-12 items-center justify-center rounded-full">
            <Users className="text-muted-foreground size-6" />
          </div>

          <h3 className="font-medium">Chưa có bạn bè</h3>

          <p className="text-muted-foreground mt-1 text-sm">
            Hãy tìm kiếm và kết bạn với những người bạn biết.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {friends.map((friend) => (
          <FriendItem key={friend.id} friend={friend} onUnfriend={onUnfriend} />
        ))}
      </CardContent>
    </Card>
  );
};

export default FriendList;
