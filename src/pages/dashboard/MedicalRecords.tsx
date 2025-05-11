
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MedicalRecords = () => {
  const records = [
    {
      id: 1,
      title: "Annual Physical Results",
      date: "May 5, 2025",
      doctor: "Dr. Sarah Johnson",
      type: "Examination",
      size: "1.2 MB"
    },
    {
      id: 2,
      title: "Blood Work Analysis",
      date: "April 22, 2025",
      doctor: "Dr. Michael Chen",
      type: "Lab Results",
      size: "850 KB"
    },
    {
      id: 3,
      title: "Cardiology Report",
      date: "March 15, 2025",
      doctor: "Dr. James Wilson",
      type: "Specialist",
      size: "2.4 MB"
    },
    {
      id: 4,
      title: "Vaccination Record",
      date: "February 8, 2025",
      doctor: "Dr. Emily Peters",
      type: "Immunization",
      size: "540 KB"
    },
    {
      id: 5,
      title: "Allergy Test Results",
      date: "January 20, 2025",
      doctor: "Dr. Michael Chen",
      type: "Lab Results",
      size: "1.1 MB"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-3xl font-bold">Medical Records</h2>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Upload New Record
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Request Records
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Medical Documents</CardTitle>
          <CardDescription>Access and download your medical records</CardDescription>
          <div className="mt-2 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search records..." className="pl-8" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {records.map((record) => (
              <div key={record.id} className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{record.title}</h3>
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-sm text-muted-foreground">
                      <span>Date: {record.date}</span>
                      <span>Doctor: {record.doctor}</span>
                      <span>Type: {record.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-3 md:mt-0">
                  <span className="text-xs text-muted-foreground">{record.size}</span>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalRecords;
