
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Activity, Calendar, FileText, User, BellRing } from "lucide-react";

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Patient Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2 border-gray-300"
            >
              <LogOut size={16} />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Upcoming Appointments
                </CardTitle>
                <Calendar className="h-5 w-5 text-medical-600" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">
                  Next: May 15, 2025 - Dr. Smith
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Recent Vital Signs
                </CardTitle>
                <Activity className="h-5 w-5 text-medical-600" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">Normal</p>
                <p className="text-xs text-muted-foreground">
                  BP: 120/80, HR: 72 bpm
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Test Results
                </CardTitle>
                <FileText className="h-5 w-5 text-medical-600" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">
                  1 new since last visit
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Medications
                </CardTitle>
                <svg className="h-5 w-5 text-medical-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">4</p>
                <p className="text-xs text-muted-foreground">
                  2 require refills
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Health Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[
                    {
                      date: "May 5, 2025",
                      title: "Annual Physical Exam",
                      desc: "Completed with Dr. Sarah Johnson. General health assessed as good.",
                      icon: <User className="h-5 w-5 text-white" />
                    },
                    {
                      date: "April 22, 2025",
                      title: "Blood Test Results",
                      desc: "Cholesterol levels within normal range. Vitamin D slightly low.",
                      icon: <FileText className="h-5 w-5 text-white" />
                    },
                    {
                      date: "April 10, 2025",
                      title: "Medication Change",
                      desc: "Dosage adjusted for hypertension medication following review.",
                      icon: <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    }
                  ].map((event, i) => (
                    <div key={i} className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-medical-600">
                          {event.icon}
                        </div>
                        {i < 2 && <div className="w-px h-full bg-gray-300 my-1"></div>}
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
                    <BellRing className="h-5 w-5 text-medical-600" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
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
                    ].map((notification, i) => (
                      <div key={i} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-medical-600 mt-2 mr-2"></div>
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
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Request Medication Refill
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Send Message to Doctor
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <FileText className="h-4 w-4 mr-2" />
                      View Medical Records
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
