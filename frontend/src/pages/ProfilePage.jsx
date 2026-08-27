import ProfileHeader from "../features/user/components/ProfileHeader";
import ProfileInfo from "../features/user/components/ProfileInfo";

const ProfilePage = () => {
  return (
    <div className="min-h-full p-4 md:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <ProfileHeader />
        <ProfileInfo />
      </div>
    </div>
  );
};

export default ProfilePage;
