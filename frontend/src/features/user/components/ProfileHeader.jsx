import { Camera, Pencil } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ProfileHeader = () => {
  return (
    <Card className="overflow-hidden">
      {/* Cover */}
      <div className="bg-muted h-32 md:h-40" />

      <CardContent className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="-mt-14 flex justify-center md:justify-start">
          <div className="relative">
            <Avatar className="border-background h-28 w-28 border-4">
              <AvatarImage src="" alt="Truong Hoang" />
              <AvatarFallback className="text-2xl">TH</AvatarFallback>
            </Avatar>

            <Button
              size="icon"
              variant="secondary"
              className="absolute right-0 bottom-0 h-9 w-9 rounded-full"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* User information */}
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Truong Hoang</h1>

            <p className="text-muted-foreground text-sm">@truong</p>

            <p className="mt-3 max-w-xl text-sm">Hello, I'm using WebChat.</p>
          </div>

          <Button>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-6 flex gap-6 border-t pt-5">
          <div>
            <p className="font-semibold">128</p>
            <p className="text-muted-foreground text-sm">Friends</p>
          </div>

          <div>
            <p className="font-semibold">24</p>
            <p className="text-muted-foreground text-sm">Photos</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
