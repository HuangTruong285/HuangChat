import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const AppearanceSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>

        <p className="text-muted-foreground text-sm">
          Customize how WebChat looks.
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <Label>Theme</Label>

          <RadioGroup defaultValue="system">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="light" id="light" />

              <Label htmlFor="light">Light</Label>
            </div>

            <div className="flex items-center gap-3">
              <RadioGroupItem value="dark" id="dark" />

              <Label htmlFor="dark">Dark</Label>
            </div>

            <div className="flex items-center gap-3">
              <RadioGroupItem value="system" id="system" />

              <Label htmlFor="system">System</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
