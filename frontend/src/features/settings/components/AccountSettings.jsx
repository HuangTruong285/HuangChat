import { LogOut, Mail, Phone, ShieldCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AccountSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>

          <p className="text-muted-foreground text-sm">
            Manage your account information.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <div className="relative">
              <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

              <Input
                id="email"
                className="pl-9"
                value="example@gmail.com"
                disabled
              />
            </div>

            <p className="text-muted-foreground text-xs">
              Your email address cannot be changed here.
            </p>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>

            <div className="relative">
              <Phone className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

              <Input id="phone" className="pl-9" defaultValue="0123456789" />
            </div>
          </div>

          <div className="flex justify-end border-t pt-6">
            <Button>Save changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Account information */}
      <Card>
        <CardHeader>
          <CardTitle>Account information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Account status</p>

              <p className="text-muted-foreground text-sm">
                Current status of your account.
              </p>
            </div>

            <Badge variant="secondary">Active</Badge>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <ShieldCheck className="text-muted-foreground h-5 w-5" />

              <div>
                <p className="font-medium">Email verification</p>

                <p className="text-muted-foreground text-sm">
                  Your email verification status.
                </p>
              </div>
            </div>

            <Badge variant="secondary">Not verified</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive">Account actions</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">Sign out</p>

              <p className="text-muted-foreground text-sm">
                Sign out from your current account.
              </p>
            </div>

            <Button variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;
