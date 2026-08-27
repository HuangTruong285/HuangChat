import { KeyRound, Palette, ShieldUser, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const settingsItems = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
  {
    id: "account",
    label: "Account",
    icon: ShieldUser,
  },
  {
    id: "password",
    label: "Password",
    icon: KeyRound,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
  },
];

const SettingsSidebar = ({ activeTab, onTabChange }) => {
  return (
    <Card className="h-fit">
      <CardContent className="p-2">
        <nav className="space-y-1">
          {settingsItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;

            return (
              <Button
                key={item.id}
                type="button"
                variant={active ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </CardContent>
    </Card>
  );
};

export default SettingsSidebar;
