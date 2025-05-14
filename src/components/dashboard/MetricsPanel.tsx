
import { useState, useEffect } from "react";
import { ArrowDown, ArrowUp, Activity, Users, FileText, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type MetricProps = {
  title: string;
  value: string | number;
  description: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon: React.ReactNode;
};

const Metric = ({ title, value, description, trend, icon }: MetricProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-9 w-9 rounded-full bg-primary/10 p-2 text-primary">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <CardDescription className="flex items-center">
        {trend && (
          <span className={`mr-1 flex items-center text-sm ${trend.isPositive ? "text-green-500" : "text-red-500"}`}>
            {trend.isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
            {Math.abs(trend.value)}%
          </span>
        )}
        <span className="text-xs text-muted-foreground">{description}</span>
      </CardDescription>
    </CardContent>
  </Card>
);

// Generate a random number within a specific range
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Format a number with commas
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const MetricsPanel = () => {
  // Initial metric values
  const [patientVisits, setPatientVisits] = useState(2345);
  const [responseTime, setResponseTime] = useState(24);
  const [healthIndex, setHealthIndex] = useState(88.2);
  const [reportsGenerated, setReportsGenerated] = useState(1458);

  // Update metrics every second
  useEffect(() => {
    const interval = setInterval(() => {
      // Small random fluctuations
      setPatientVisits(prev => {
        const change = getRandomNumber(-10, 15);
        return Math.max(2000, prev + change); // Ensure doesn't go below 2000
      });
      
      setResponseTime(prev => {
        const change = getRandomNumber(-1, 1) * 0.5;
        return Math.max(18, Math.min(30, Number((prev + change).toFixed(1)))); // Between 18-30
      });
      
      setHealthIndex(prev => {
        const change = getRandomNumber(-10, 10) * 0.1;
        return Number((prev + change).toFixed(1));
      });
      
      setReportsGenerated(prev => {
        const change = getRandomNumber(-5, 8);
        return Math.max(1400, prev + change); // Ensure doesn't go below 1400
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  // Prepare metrics for rendering
  const metrics = [
    {
      title: "Patient Visits",
      value: formatNumber(patientVisits),
      description: "from last month",
      trend: { value: patientVisits > 2345 ? 12 : 10, isPositive: patientVisits >= 2345 },
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Avg. Response Time",
      value: `${responseTime} mins`,
      description: `from ${responseTime > 24 ? '30' : '28'} mins`,
      trend: { value: responseTime <= 24 ? 14 : 8, isPositive: responseTime <= 24 },
      icon: <Clock className="h-5 w-5" />
    },
    {
      title: "Healthcare Index",
      value: healthIndex.toFixed(1),
      description: healthIndex < 88 ? "requires attention" : "good standing",
      trend: { value: healthIndex >= 88 ? 2 : 4, isPositive: healthIndex >= 88 },
      icon: <Activity className="h-5 w-5" />
    },
    {
      title: "Reports Generated",
      value: formatNumber(reportsGenerated),
      description: "this quarter",
      trend: { value: reportsGenerated >= 1458 ? 5 : 3, isPositive: reportsGenerated >= 1458 },
      icon: <FileText className="h-5 w-5" />
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Metric key={index} {...metric} />
      ))}
    </div>
  );
};
