
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Providers = () => {
  // Mock data for healthcare providers
  const providers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      location: "Health Insights Medical Center",
      phone: "(555) 123-4567",
      email: "sarah.johnson@healthinsights.com",
      bio: "Dr. Johnson specializes in cardiovascular health with over 15 years of experience. Board certified in Cardiology and Internal Medicine."
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurologist",
      location: "Health Insights Specialty Clinic",
      phone: "(555) 123-4568",
      email: "michael.chen@healthinsights.com",
      bio: "Dr. Chen is a renowned neurologist focusing on neurological disorders and stroke prevention. He has been with Health Insights for 10 years."
    },
    {
      id: 3,
      name: "Dr. Emily Peters",
      specialty: "Family Medicine",
      location: "Health Insights Family Practice",
      phone: "(555) 123-4569",
      email: "emily.peters@healthinsights.com",
      bio: "Dr. Peters provides comprehensive primary care for patients of all ages. She has a special interest in preventative health and women's health."
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Orthopedic Surgeon",
      location: "Health Insights Surgical Center",
      phone: "(555) 123-4570",
      email: "james.wilson@healthinsights.com",
      bio: "Dr. Wilson is a leading orthopedic surgeon specializing in sports medicine and joint replacement surgeries."
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Healthcare Providers</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Find a Provider</CardTitle>
          <CardDescription>Search for healthcare providers in our network</CardDescription>
          <div className="mt-2 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name, specialty, or location..." className="pl-8" />
          </div>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {providers.map((provider) => (
          <Card key={provider.id}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-4">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <CardTitle>{provider.name}</CardTitle>
                  <CardDescription>{provider.specialty}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">{provider.bio}</p>
                
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{provider.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{provider.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{provider.email}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View Profile</Button>
                  <Button size="sm">Schedule Appointment</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Providers;
