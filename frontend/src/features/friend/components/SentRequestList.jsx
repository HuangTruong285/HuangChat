import { UserPlus } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import SentRequestItem from "./SentRequestItem";

const SentRequestList = ({ requests = [], loading = false, onCancel }) => {
  if (loading) {
    return (
      <Card>
        <CardContent className="flex min-h-75 items-center justify-center">
          <p className="text-muted-foreground text-sm">
            Đang tải lời mời đã gửi...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="flex min-h-75 flex-col items-center justify-center text-center">
          <div className="bg-muted mb-4 flex size-12 items-center justify-center rounded-full">
            <UserPlus className="text-muted-foreground size-6" />
          </div>

          <h3 className="font-medium">Chưa gửi lời mời nào</h3>

          <p className="text-muted-foreground mt-1 text-sm">
            Những lời mời kết bạn bạn đã gửi sẽ xuất hiện ở đây.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {requests.map((request) => (
        <SentRequestItem
          key={request.id}
          request={request}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
};

export default SentRequestList;
