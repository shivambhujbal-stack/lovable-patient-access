
import { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock data for doctors and appointments
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Dr. Elizabeth Taylor",
    specialty: "General Practitioner",
    image: "/placeholder.svg"
  },
  {
    id: 4, 
    name: "Dr. Rajesh Gupta",
    specialty: "Orthopedic Surgeon",
    image: "/placeholder.svg"
  }
];

// Mock data for booked slots
const bookedSlots = [
  { doctorId: 1, date: "2025-05-15", time: "10:00 AM" },
  { doctorId: 2, date: "2025-05-15", time: "2:30 PM" },
  { doctorId: 3, date: "2025-05-16", time: "9:15 AM" },
];

// Available time slots
const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", 
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM"
];

// Form type definition
type AppointmentFormValues = {
  doctor: string;
  date: Date;
  time: string;
  reason: string;
};

export function AppointmentScheduleForm({ onSuccess }: { onSuccess: () => void }) {
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const form = useForm<AppointmentFormValues>({
    defaultValues: {
      doctor: "",
      date: undefined,
      time: "",
      reason: "",
    },
  });

  // Check if a time slot is booked
  const isSlotBooked = (doctorId: number, date: Date | undefined, time: string) => {
    if (!date) return false;
    
    const dateString = format(date, "yyyy-MM-dd");
    return bookedSlots.some(
      slot => 
        slot.doctorId === doctorId && 
        slot.date === dateString && 
        slot.time === time
    );
  };

  // Get available time slots for selected doctor and date
  const getAvailableTimeSlots = () => {
    if (!selectedDoctor || !selectedDate) return timeSlots;
    
    const doctorId = parseInt(selectedDoctor);
    return timeSlots.map(time => ({
      time,
      booked: isSlotBooked(doctorId, selectedDate, time)
    }));
  };

  const availableSlots = getAvailableTimeSlots();

  // Handle form submission
  const onSubmit = (data: AppointmentFormValues) => {
    console.log("Appointment scheduled:", data);
    
    // Show success message
    toast({
      title: "Appointment Scheduled",
      description: `Your appointment with ${doctors.find(d => d.id === parseInt(data.doctor))?.name} on ${format(data.date, "MMMM d, yyyy")} at ${data.time} has been confirmed.`,
      variant: "default",
    });
    
    // Close the dialog
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="doctor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Doctor</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedDoctor(value);
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id.toString()}>
                      {doctor.name} - {doctor.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose your preferred healthcare provider.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Appointment Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Select a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      setSelectedDate(date);
                    }}
                    disabled={(date) =>
                      date < new Date() || // Can't select dates in the past
                      date > new Date(new Date().setMonth(new Date().getMonth() + 3)) // Can't schedule more than 3 months in advance
                    }
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select your preferred appointment date.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Appointment Time</FormLabel>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {availableSlots.map((slot) => (
                  <Button
                    key={slot.time}
                    type="button"
                    variant={field.value === slot.time ? "default" : "outline"}
                    onClick={() => field.onChange(slot.time)}
                    disabled={slot.booked}
                    className={cn(
                      "h-10",
                      slot.booked && "bg-muted opacity-50 cursor-not-allowed",
                      field.value === slot.time && !slot.booked && "bg-primary text-primary-foreground",
                      slot.booked && field.value !== slot.time && "border-green-500"
                    )}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {slot.time}
                    {slot.booked && (
                      <span className="ml-2 inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                    )}
                  </Button>
                ))}
              </div>
              <FormDescription>
                Green indicators show already booked slots.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for Visit</FormLabel>
              <FormControl>
                <textarea
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Briefly describe the reason for your appointment..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This helps the doctor prepare for your visit.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit">Schedule Appointment</Button>
        </div>
      </form>
    </Form>
  );
}
