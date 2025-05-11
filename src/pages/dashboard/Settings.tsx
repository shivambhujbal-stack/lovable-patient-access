
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Settings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Account Settings</h2>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="appointment-reminders" className="flex flex-col space-y-1">
                <span>Appointment Reminders</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Receive notifications about upcoming appointments
                </span>
              </Label>
              <Switch id="appointment-reminders" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="test-results" className="flex flex-col space-y-1">
                <span>Test Results</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Be notified when new test results are available
                </span>
              </Label>
              <Switch id="test-results" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="medication-reminders" className="flex flex-col space-y-1">
                <span>Medication Reminders</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Receive medication reminder notifications
                </span>
              </Label>
              <Switch id="medication-reminders" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="newsletter" className="flex flex-col space-y-1">
                <span>Health Newsletter</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Receive our monthly health newsletter
                </span>
              </Label>
              <Switch id="newsletter" />
            </div>
            
            <div className="pt-4">
              <Button>Save Preferences</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            
            <div className="pt-4">
              <Button>Update Password</Button>
            </div>
            
            <div className="flex items-center justify-between space-x-2 pt-6">
              <Label htmlFor="two-factor" className="flex flex-col space-y-1">
                <span>Two-Factor Authentication</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Add an extra layer of security to your account
                </span>
              </Label>
              <Switch id="two-factor" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
