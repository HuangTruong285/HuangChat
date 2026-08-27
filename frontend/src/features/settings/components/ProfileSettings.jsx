import { useState } from "react";
import { Camera } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialProfile = {
  displayName: "Truong Hoang",
  username: "truong",
  bio: "Hello, I'm using WebChat.",
};

const ProfileSettings = () => {
  const [form, setForm] = useState(initialProfile);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setForm(initialProfile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Profile data:", form);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>

        <p className="text-muted-foreground text-sm">
          Update your public profile information.
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Avatar */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" alt={form.displayName} />

                <AvatarFallback className="text-xl">TH</AvatarFallback>
              </Avatar>

              <Button
                type="button"
                size="icon"
                variant="secondary"
                className="absolute right-0 bottom-0 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <h3 className="font-medium">Profile picture</h3>

              <p className="text-muted-foreground text-sm">
                JPG, PNG or WebP. Maximum 5MB.
              </p>
            </div>
          </div>

          {/* Display name */}
          <div className="space-y-2">
            <Label htmlFor="displayName">Display name</Label>

            <Input
              id="displayName"
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
              placeholder="Enter your display name"
              maxLength={50}
            />
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>

            <Input
              id="username"
              name="username"
              value={`@${form.username}`}
              disabled
            />

            <p className="text-muted-foreground text-xs">
              Username cannot be changed here.
            </p>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>

            <Textarea
              id="bio"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Tell people about yourself"
              rows={4}
              maxLength={160}
            />

            <div className="flex justify-end">
              <span className="text-muted-foreground text-xs">
                {form.bio.length}/160
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t pt-6">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>

            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
