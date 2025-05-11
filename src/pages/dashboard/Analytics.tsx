
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Analytics = () => {
  const monthlyData = [
    { month: 'Jan', visits: 65, referrals: 28, virtualCare: 15 },
    { month: 'Feb', visits: 59, referrals: 20, virtualCare: 18 },
    { month: 'Mar', visits: 80, referrals: 32, virtualCare: 22 },
    { month: 'Apr', visits: 81, referrals: 25, virtualCare: 30 },
    { month: 'May', visits: 56, referrals: 15, virtualCare: 28 },
  ];

  const pieData = [
    { name: 'Checkups', value: 45 },
    { name: 'Treatments', value: 25 },
    { name: 'Tests', value: 20 },
    { name: 'Consultations', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Health Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Care Summary</CardTitle>
            <CardDescription>Visit types and distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Visits Summary</CardTitle>
            <CardDescription>Trend of in-person and virtual visits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="visits" name="In-person Visits" fill="#1890ff" />
                  <Bar dataKey="virtualCare" name="Virtual Care" fill="#36cfc9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Health Trends</CardTitle>
          <CardDescription>All metrics over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="visits" name="Visits" fill="#1890ff" />
                <Bar dataKey="referrals" name="Referrals" fill="#fa8c16" />
                <Bar dataKey="virtualCare" name="Virtual Care" fill="#36cfc9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
