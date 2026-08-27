import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const applyTheme = (value) => {
  const root = document.documentElement;

  root.classList.remove("light", "dark");

  if (value === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    root.classList.add(systemTheme);
    return;
  }

  root.classList.add(value);
};

const AppearanceSettings = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "system";
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleThemeChange = (value) => {
    setTheme(value);

    localStorage.setItem("theme", value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>

        <CardDescription>Customize how WebChat looks.</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <Label>Theme</Label>

          <RadioGroup
            value={theme}
            onValueChange={handleThemeChange}
            defaultValue="system"
          >
            {/* Light */}
            <div className="flex items-center gap-3">
              <RadioGroupItem value="light" id="theme-light" />

              <Label htmlFor="theme-light">Light</Label>
            </div>

            {/* Dark */}
            <div className="flex items-center gap-3">
              <RadioGroupItem value="dark" id="theme-dark" />

              <Label htmlFor="theme-dark">Dark</Label>
            </div>

            {/* System */}
            <div className="flex items-center gap-3">
              <RadioGroupItem value="system" id="theme-system" />

              <Label htmlFor="theme-system">System</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
