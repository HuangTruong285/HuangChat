import ProfileHeader from "../features/user/components/ProfileHeader";
import ProfileInfo from "../features/user/components/ProfileInfo";

import useAuth from "../features/auth/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-full p-4 md:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <ProfileHeader user={user} />
        <ProfileInfo user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
