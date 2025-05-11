
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin } from "lucide-react";

const Profile = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">My Profile</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 rounded-full p-6 mb-2">
              <User className="h-16 w-16 text-primary" />
            </div>
            <CardTitle>Rahul Sharma</CardTitle>
            <CardDescription>Patient ID: #123456</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>rahul.sharma@example.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>123 Main St, New Delhi, 110001</span>
              </div>
            </div>
            <div className="pt-4">
              <Button variant="outline" className="w-full">Upload Photo</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="Rahul" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Sharma" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="rahul.sharma@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="(555) 123-4567" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" defaultValue="123 Main St" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="New Delhi" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" defaultValue="Delhi" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Zip Code</Label>
                  <Input id="zip" defaultValue="110001" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergency-contact">Emergency Contact</Label>
                <Input id="emergency-contact" defaultValue="Anita Sharma - (555) 987-6543" />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Insurance Information</CardTitle>
            <CardDescription>Manage your insurance details</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="insurance-provider">Insurance Provider</Label>
                  <Input id="insurance-provider" defaultValue="Health First Insurance" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="policy-number">Policy Number</Label>
                  <Input id="policy-number" defaultValue="POL-123456789" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="group-number">Group Number</Label>
                  <Input id="group-number" defaultValue="GRP-987654" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plan-type">Plan Type</Label>
                  <Input id="plan-type" defaultValue="PPO" />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button>Save Insurance Info</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
