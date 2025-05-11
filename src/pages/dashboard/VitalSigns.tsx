
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Heart, Thermometer, Droplet } from "lucide-react";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const VitalSigns = () => {
  // Mock data for vital signs
  const vitalHistory = [
    { date: '2025-01-01', systolic: 120, diastolic: 80, heart: 72, temp: 98.6, oxygen: 98 },
    { date: '2025-02-01', systolic: 122, diastolic: 82, heart: 75, temp: 98.7, oxygen: 97 },
    { date: '2025-03-01', systolic: 118, diastolic: 78, heart: 70, temp: 98.5, oxygen: 99 },
    { date: '2025-04-01', systolic: 121, diastolic: 81, heart: 73, temp: 98.8, oxygen: 98 },
    { date: '2025-05-01', systolic: 119, diastolic: 79, heart: 74, temp: 98.6, oxygen: 97 },
  ];

  const currentVitals = {
    bloodPressure: "120/80 mmHg",
    heartRate: "72 bpm",
    oxygenLevel: "98%",
    temperature: "98.6°F"
  };

  // Configuration for the chart
  const chartConfig = {
    systolic: { label: "Systolic", theme: { light: '#1890ff', dark: '#1890ff' } },
    diastolic: { label: "Diastolic", theme: { light: '#36cfc9', dark: '#36cfc9' } },
    heart: { label: "Heart Rate", theme: { light: '#f5222d', dark: '#f5222d' } }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Vital Signs</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentVitals.bloodPressure}</div>
            <p className="text-xs text-muted-foreground">Last recorded: May 1, 2025</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentVitals.heartRate}</div>
            <p className="text-xs text-muted-foreground">Last recorded: May 1, 2025</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Oxygen Level</CardTitle>
            <Droplet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentVitals.oxygenLevel}</div>
            <p className="text-xs text-muted-foreground">Last recorded: May 1, 2025</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentVitals.temperature}</div>
            <p className="text-xs text-muted-foreground">Last recorded: May 1, 2025</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Vital Signs History</CardTitle>
          <CardDescription>Track your vital signs over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vitalHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={(props) => <ChartTooltipContent {...props} />} />
                  <Line type="monotone" dataKey="systolic" stroke="#1890ff" name="Systolic" />
                  <Line type="monotone" dataKey="diastolic" stroke="#36cfc9" name="Diastolic" />
                  <Line type="monotone" dataKey="heart" stroke="#f5222d" name="Heart Rate" />
                </LineChart>
              </ResponsiveContainer>
              <ChartLegend content={(props) => <ChartLegendContent {...props} />} />
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VitalSigns;
