import { useState } from "react";

import SettingsSidebar from "../features/settings/components/SettingsSidebar";
import ProfileSettings from "../features/settings/components/ProfileSettings";
import AccountSettings from "../features/settings/components/AccountSettings";
import PasswordSettings from "../features/settings/components/PasswordSettings";
import AppearanceSettings from "../features/settings/components/AppearanceSettings";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;

      case "account":
        return <AccountSettings />;

      case "password":
        return <PasswordSettings />;

      case "appearance":
        return <AppearanceSettings />;

      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="min-h-full p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>

          <p className="text-muted-foreground text-sm">
            Manage your account and preferences.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[220px_1fr]">
          <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

          <main>{renderContent()}</main>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
