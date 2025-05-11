
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

export const MetricsPanel = () => {
  // Mock data - in a real app, this would come from an API
  const metrics = [
    {
      title: "Patient Visits",
      value: "2,345",
      description: "from last month",
      trend: { value: 12, isPositive: true },
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Avg. Response Time",
      value: "24 mins",
      description: "from 28 mins",
      trend: { value: 14, isPositive: true },
      icon: <Clock className="h-5 w-5" />
    },
    {
      title: "Healthcare Index",
      value: "88.2",
      description: "requires attention",
      trend: { value: 2, isPositive: false },
      icon: <Activity className="h-5 w-5" />
    },
    {
      title: "Reports Generated",
      value: "1,458",
      description: "this quarter",
      trend: { value: 5, isPositive: true },
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
