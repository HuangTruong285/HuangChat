import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

import * as userService from "@/features/user/user.service";
import ProfileCard from "@/features/user/components/ProfileCard";

const UserProfilePage = () => {
  const { userId } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);

        const data = await userService.getPublicProfile(userId);

        setProfile(data);
      } catch (error) {
        console.error("Failed to load public profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <Loader2 className="size-5 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <p className="text-muted-foreground">User not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <ProfileCard user={profile.user} />

      <p className="text-muted-foreground mt-6 text-center text-sm">
        Relationship: {profile.relationship}
      </p>
    </div>
  );
};

export default UserProfilePage;
