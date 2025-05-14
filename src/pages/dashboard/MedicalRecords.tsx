
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Search, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const MedicalRecords = () => {
  const [records, setRecords] = useState([
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
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    doctor: "Dr. Sarah Johnson",
    type: "Examination",
    file: null
  });

  const doctors = [
    "Dr. Sarah Johnson",
    "Dr. Michael Chen", 
    "Dr. James Wilson",
    "Dr. Emily Peters"
  ];

  const recordTypes = [
    "Examination",
    "Lab Results",
    "Specialist",
    "Immunization",
    "Prescription",
    "Surgery",
    "Dental",
    "Vision"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleUpload = () => {
    if (!formData.file || !formData.title) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and select a file to upload.",
        variant: "destructive"
      });
      return;
    }

    // Simulate upload process
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Add the new record to the list
        const fileSize = formData.file.size;
        let sizeString = fileSize < 1024 * 1024 
          ? `${Math.round(fileSize / 1024)} KB` 
          : `${(fileSize / (1024 * 1024)).toFixed(1)} MB`;
        
        const newRecord = {
          id: records.length + 1,
          title: formData.title,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          doctor: formData.doctor,
          type: formData.type,
          size: sizeString
        };

        setRecords([newRecord, ...records]);
        setFormData({
          title: "",
          doctor: "Dr. Sarah Johnson",
          type: "Examination",
          file: null
        });
        setIsUploading(false);
        setUploadProgress(0);

        toast({
          title: "Upload Successful",
          description: `${newRecord.title} has been uploaded successfully.`
        });
      }
    }, 300);
  };

  const handleSearch = (e) => {
    // Future implementation: Search functionality
    console.log("Searching for:", e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-3xl font-bold">Medical Records</h2>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Upload New Record
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Upload Medical Record</DialogTitle>
                <DialogDescription>
                  Upload a new medical record to your health profile.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    placeholder="Enter record title" 
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="doctor">Doctor</Label>
                  <Select 
                    name="doctor" 
                    value={formData.doctor} 
                    onValueChange={(value) => setFormData({...formData, doctor: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor} value={doctor}>
                          {doctor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Record Type</Label>
                  <Select 
                    name="type" 
                    value={formData.type} 
                    onValueChange={(value) => setFormData({...formData, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select record type" />
                    </SelectTrigger>
                    <SelectContent>
                      {recordTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="file">Upload File</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="file"
                      type="file"
                      className="cursor-pointer"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                {isUploading && (
                  <div className="mt-2">
                    <div className="bg-gray-200 h-2 rounded-full">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-center mt-1">{uploadProgress}% complete</p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button onClick={handleUpload} disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-pulse" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Record
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
            <Input 
              placeholder="Search records..." 
              className="pl-8" 
              onChange={handleSearch}
            />
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
