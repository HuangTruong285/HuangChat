import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

const FriendSearch = ({ value, onChange }) => {
  return (
    <div className="relative">
      <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tìm kiếm người dùng..."
        className="pl-9"
      />
    </div>
  );
};

export default FriendSearch;
