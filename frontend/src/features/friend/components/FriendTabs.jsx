import { Mail, Send, Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const FriendTabs = ({
  value,
  onValueChange,
  friendCount = 0,
  requestCount = 0,
  sentCount = 0,
}) => {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-full">
      <TabsList className="h-auto w-full justify-start rounded-none border-b-2 bg-transparent p-0">
        {/* Bạn bè */}
        <TabsTrigger
          value="friends"
          className="data-[state=active]:border-primary gap-2 rounded-none border-b-2 border-transparent px-5 py-3.5 data-[state=active]:bg-transparent"
        >
          <Users className="size-4" />
          <span>Bạn bè</span>
          {friendCount > 0 && <Badge variant="secondary">{friendCount}</Badge>}
        </TabsTrigger>

        {/* Lời mời */}
        <TabsTrigger
          value="requests"
          className="data-[state=active]:border-primary gap-2 rounded-none border-b-2 border-transparent px-5 py-3.5 data-[state=active]:bg-transparent"
        >
          <Mail className="size-4" />
          <span>Lời mời</span>
          {requestCount > 0 && (
            <Badge variant="secondary">{requestCount}</Badge>
          )}
        </TabsTrigger>

        {/* Đã gửi */}
        <TabsTrigger
          value="sent"
          className="data-[state=active]:border-primary gap-2 rounded-none border-b-2 border-transparent px-5 py-3.5 data-[state=active]:bg-transparent"
        >
          <Send className="size-4" />
          <span>Đã gửi</span>
          {sentCount > 0 && <Badge variant="secondary">{sentCount}</Badge>}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default FriendTabs;
