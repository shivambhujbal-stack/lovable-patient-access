
import { Link, useLocation } from "react-router-dom";
import { 
  Activity, 
  Calendar, 
  FileText, 
  User, 
  Users, 
  Settings, 
  Home, 
  PieChart,
  MessageSquare,
  Clock
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";

export const DashboardSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Calendar, label: "Appointments", path: "/dashboard/appointments" },
    { icon: Activity, label: "Vitals", path: "/dashboard/vitals" },
    { icon: FileText, label: "Medical Records", path: "/dashboard/records" },
    { icon: PieChart, label: "Analytics", path: "/dashboard/analytics" },
    { icon: MessageSquare, label: "Messages", path: "/dashboard/messages" },
    { icon: Users, label: "Providers", path: "/dashboard/providers" },
    { icon: Clock, label: "History", path: "/dashboard/history" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b border-border/50">
        <div className="flex h-14 items-center px-4">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-primary">Health Insights</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.path)}
                tooltip={item.label}
              >
                <Link to={item.path} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link to="/dashboard/settings" className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Profile">
              <Link to="/dashboard/profile" className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
