
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const History = () => {
  // Mock data for medical history with Indian names
  const medicalHistory = [
    {
      id: 1,
      date: "May 5, 2025",
      type: "Annual Physical Exam",
      provider: "Dr. Arun Sharma",
      notes: "General health assessment completed. All vitals within normal range. Recommended maintaining current exercise regimen and dietary habits."
    },
    {
      id: 2,
      date: "April 22, 2025",
      type: "Blood Work",
      provider: "Lab Services",
      notes: "Comprehensive metabolic panel and lipid profile. Cholesterol levels within normal range. Vitamin D slightly low - supplement recommended."
    },
    {
      id: 3,
      date: "April 10, 2025",
      type: "Medication Review",
      provider: "Dr. Priya Patel",
      notes: "Reviewed current medications. Adjusted hypertension medication dosage. No adverse reactions reported."
    },
    {
      id: 4,
      date: "March 15, 2025",
      type: "Cardiology Consultation",
      provider: "Dr. Rajesh Gupta",
      notes: "EKG performed. Results normal. No signs of cardiovascular disease. Follow-up recommended in 6 months."
    },
    {
      id: 5,
      date: "February 8, 2025",
      type: "Vaccination",
      provider: "Nurse Anjali",
      notes: "Annual flu vaccination administered. No adverse reactions observed during 15-minute wait period."
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Medical History</h2>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Export History
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Complete Medical Timeline</CardTitle>
          <CardDescription>Your healthcare events and history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {medicalHistory.map((event, i) => (
              <div key={event.id} className="relative flex">
                <div className="flex flex-col items-center mr-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                    <Calendar className="h-5 w-5" />
                  </div>
                  {i < medicalHistory.length - 1 && (
                    <div className="w-px h-full bg-border absolute top-10 bottom-0 left-5"></div>
                  )}
                </div>
                <div className="pb-8">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold">{event.type}</h3>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-3.5 w-3.5" />
                      {event.date}
                    </span>
                    <span className="flex items-center">
                      <User className="mr-1 h-3.5 w-3.5" />
                      {event.provider}
                    </span>
                  </div>
                  <p className="text-sm mt-2">{event.notes}</p>
                  <div className="mt-3">
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
