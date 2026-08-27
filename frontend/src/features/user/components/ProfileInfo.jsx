import { Mail, Phone, User } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProfileInfo = ({ user }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Username */}
        <div className="flex gap-4">
          <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <User className="text-muted-foreground h-5 w-5" />
          </div>

          <div>
            <p className="text-muted-foreground text-sm">Username</p>

            <p className="font-medium">@{user.username}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex gap-4">
          <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <Mail className="text-muted-foreground h-5 w-5" />
          </div>

          <div>
            <p className="text-muted-foreground text-sm">Email</p>

            <p className="font-medium">{user.email}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex gap-4">
          <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <Phone className="text-muted-foreground h-5 w-5" />
          </div>

          <div>
            <p className="text-muted-foreground text-sm">Phone</p>

            <p className="font-medium">chua lam</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;
