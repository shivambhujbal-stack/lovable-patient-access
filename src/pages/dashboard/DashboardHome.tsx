
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, MessageSquare, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricsPanel } from "@/components/dashboard/MetricsPanel";
import { HealthTrendsChart } from "@/components/dashboard/HealthTrendsChart";

const DashboardHome = () => {
  // Mock data for timeline with Indian names
  const timelineEvents = [
    {
      date: "May 5, 2025",
      title: "Annual Physical Exam",
      desc: "Completed with Dr. Arun Sharma. General health assessed as good."
    },
    {
      date: "April 22, 2025",
      title: "Blood Test Results",
      desc: "Cholesterol levels within normal range. Vitamin D slightly low."
    },
    {
      date: "April 10, 2025",
      title: "Medication Change",
      desc: "Dosage adjusted for hypertension medication following review."
    }
  ];
  
  // Mock data for notifications
  const notifications = [
    {
      title: "Appointment Reminder",
      desc: "Cardiology check-up tomorrow at 10:00 AM"
    },
    {
      title: "Prescription Ready",
      desc: "Your prescription is ready for pickup"
    },
    {
      title: "Test Results Available",
      desc: "New blood work results are ready to view"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Dashboard Overview</h2>
      
      <MetricsPanel />
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <HealthTrendsChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Health Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {timelineEvents.map((event, i) => (
                <div key={i} className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    {i < timelineEvents.length - 1 && (
                      <div className="w-px h-full bg-gray-300 my-1"></div>
                    )}
                  </div>
                  <div className="pb-6">
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                    <h4 className="text-lg font-semibold mt-1">{event.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Notifications</span>
                <BellRing className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2"></div>
                    <div>
                      <h5 className="text-sm font-medium">{notification.title}</h5>
                      <p className="text-xs text-gray-500">{notification.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-left">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start text-left">
                  <FileText className="h-4 w-4 mr-2" />
                  Request Medical Records
                </Button>
                <Button variant="outline" className="w-full justify-start text-left">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Doctor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
