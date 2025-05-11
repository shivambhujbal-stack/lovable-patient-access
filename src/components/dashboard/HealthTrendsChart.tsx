
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Mock data - in a real app, this would come from an API
const data = [
  { month: 'Jan', patients: 65, reviews: 42, satisfaction: 89 },
  { month: 'Feb', patients: 59, reviews: 38, satisfaction: 86 },
  { month: 'Mar', patients: 80, reviews: 56, satisfaction: 91 },
  { month: 'Apr', patients: 81, reviews: 64, satisfaction: 92 },
  { month: 'May', patients: 56, reviews: 39, satisfaction: 84 },
  { month: 'Jun', patients: 55, reviews: 42, satisfaction: 88 },
  { month: 'Jul', patients: 40, reviews: 31, satisfaction: 87 },
];

export const HealthTrendsChart = () => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Health Insights Trends</CardTitle>
        <CardDescription>
          Patient visits, reviews, and satisfaction rates over the past 7 months
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="patients" name="Patient Visits" fill="#1890ff" />
              <Bar yAxisId="left" dataKey="reviews" name="Reviews" fill="#36cfc9" />
              <Bar yAxisId="right" dataKey="satisfaction" name="Satisfaction %" fill="#40a9ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
