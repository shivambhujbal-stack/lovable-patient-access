
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const VitalSigns = () => {
  const [dateRange, setDateRange] = useState("week");
  
  // Mock data for vital signs
  const bloodPressureData = [
    { date: "May 1", systolic: 120, diastolic: 80, heart: 72 },
    { date: "May 2", systolic: 118, diastolic: 79, heart: 70 },
    { date: "May 3", systolic: 122, diastolic: 82, heart: 74 },
    { date: "May 4", systolic: 121, diastolic: 81, heart: 73 },
    { date: "May 5", systolic: 125, diastolic: 83, heart: 76 },
    { date: "May 6", systolic: 123, diastolic: 82, heart: 75 },
    { date: "May 7", systolic: 120, diastolic: 80, heart: 72 },
  ];
  
  const bloodGlucoseData = [
    { date: "May 1", fasting: 95, afterMeal: 120 },
    { date: "May 2", fasting: 92, afterMeal: 118 },
    { date: "May 3", fasting: 97, afterMeal: 125 },
    { date: "May 4", fasting: 94, afterMeal: 122 },
    { date: "May 5", fasting: 96, afterMeal: 126 },
    { date: "May 6", fasting: 93, afterMeal: 119 },
    { date: "May 7", fasting: 95, afterMeal: 121 },
  ];
  
  const weightData = [
    { date: "May 1", weight: 70.5 },
    { date: "May 2", weight: 70.3 },
    { date: "May 3", weight: 70.2 },
    { date: "May 4", weight: 70.4 },
    { date: "May 5", weight: 70.1 },
    { date: "May 6", weight: 70.0 },
    { date: "May 7", weight: 69.8 },
  ];
  
  const temperatureData = [
    { date: "May 1", temperature: 36.6 },
    { date: "May 2", temperature: 36.7 },
    { date: "May 3", temperature: 36.5 },
    { date: "May 4", temperature: 36.6 },
    { date: "May 5", temperature: 36.8 },
    { date: "May 6", temperature: 36.7 },
    { date: "May 7", temperature: 36.6 },
  ];
  
  // Latest readings
  const latestBP = bloodPressureData[bloodPressureData.length - 1];
  const latestGlucose = bloodGlucoseData[bloodGlucoseData.length - 1];
  const latestWeight = weightData[weightData.length - 1];
  const latestTemperature = temperatureData[temperatureData.length - 1];
  
  // A custom tooltip for the charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 border rounded-md shadow-sm">
          <p className="text-sm font-medium">{label}</p>
          <div className="mt-2">
            {payload.map((entry, index) => (
              <p key={index} className="text-sm" style={{ color: entry.color }}>
                {`${entry.name}: ${entry.value}`}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Vital Signs</h2>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          View All Records
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Blood Pressure</CardDescription>
            <CardTitle>{latestBP.systolic}/{latestBP.diastolic} mmHg</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Heart Rate: {latestBP.heart} bpm</p>
            <p className="text-xs text-muted-foreground mt-1">Last updated: Today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Blood Glucose</CardDescription>
            <CardTitle>{latestGlucose.fasting} mg/dL</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">After Meal: {latestGlucose.afterMeal} mg/dL</p>
            <p className="text-xs text-muted-foreground mt-1">Last updated: Today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Weight</CardDescription>
            <CardTitle>{latestWeight.weight} kg</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">BMI: 23.4 (Normal)</p>
            <p className="text-xs text-muted-foreground mt-1">Last updated: Today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Temperature</CardDescription>
            <CardTitle>{latestTemperature.temperature}°C</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Status: Normal</p>
            <p className="text-xs text-muted-foreground mt-1">Last updated: Today</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="bloodPressure" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bloodPressure">Blood Pressure</TabsTrigger>
          <TabsTrigger value="bloodGlucose">Blood Glucose</TabsTrigger>
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="temperature">Temperature</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bloodPressure" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blood Pressure Trends</CardTitle>
              <CardDescription>Systolic, Diastolic, and Heart Rate</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bloodPressureData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="systolic" stroke="#ef4444" name="Systolic (mmHg)" strokeWidth={2} />
                  <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" name="Diastolic (mmHg)" strokeWidth={2} />
                  <Line type="monotone" dataKey="heart" stroke="#10b981" name="Heart Rate (bpm)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bloodGlucose" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blood Glucose Trends</CardTitle>
              <CardDescription>Fasting and After Meal Readings</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bloodGlucoseData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="fasting" stroke="#8b5cf6" name="Fasting (mg/dL)" strokeWidth={2} />
                  <Line type="monotone" dataKey="afterMeal" stroke="#ec4899" name="After Meal (mg/dL)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="weight" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weight Trends</CardTitle>
              <CardDescription>Daily Weight Measurements</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="weight" stroke="#f59e0b" name="Weight (kg)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="temperature" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Temperature Trends</CardTitle>
              <CardDescription>Daily Temperature Readings</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={temperatureData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[36, 38]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="temperature" stroke="#6366f1" name="Temperature (°C)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Record New Vital Signs</CardTitle>
          <CardDescription>Enter your latest measurements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline">Record Blood Pressure</Button>
            <Button variant="outline">Record Blood Glucose</Button>
            <Button variant="outline">Record Weight</Button>
            <Button variant="outline">Record Temperature</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VitalSigns;
