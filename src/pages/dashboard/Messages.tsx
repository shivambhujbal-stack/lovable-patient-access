
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Send, User, Plus } from "lucide-react";

const Messages = () => {
  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Cardiologist",
      lastMessage: "Your test results look good. Let's schedule a follow-up.",
      time: "10:30 AM",
      unread: true,
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Neurologist",
      lastMessage: "Please fill out the symptom questionnaire before our next appointment.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 3,
      name: "Nurse Emily",
      role: "Primary Care",
      lastMessage: "Your prescription has been sent to the pharmacy.",
      time: "Monday",
      unread: false,
    },
  ];

  // Mock messages for the active conversation
  const messages = [
    {
      id: 1,
      senderId: "doctor",
      text: "Hello! How have you been feeling since our last appointment?",
      time: "10:15 AM"
    },
    {
      id: 2,
      senderId: "patient",
      text: "Much better, thank you. The new medication seems to be working well.",
      time: "10:20 AM"
    },
    {
      id: 3,
      senderId: "doctor",
      text: "That's great to hear! Any side effects?",
      time: "10:22 AM"
    },
    {
      id: 4,
      senderId: "patient",
      text: "None that I've noticed so far.",
      time: "10:25 AM"
    },
    {
      id: 5,
      senderId: "doctor",
      text: "Your test results look good. Let's schedule a follow-up.",
      time: "10:30 AM"
    },
  ];

  const activeConversation = conversations[0];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Messages</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Conversations</span>
              <Button size="sm" variant="ghost">
                <Plus className="h-4 w-4" />
              </Button>
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <div 
                  key={conversation.id}
                  className={`p-3 rounded-lg cursor-pointer ${
                    conversation.id === activeConversation.id 
                      ? "bg-muted" 
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium truncate">{conversation.name}</h3>
                        <span className="text-xs text-muted-foreground shrink-0">{conversation.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{conversation.role}</p>
                      <p className="text-sm truncate mt-1">
                        {conversation.unread && (
                          <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
                        )}
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>{activeConversation.name}</CardTitle>
                <CardDescription>{activeConversation.role}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.senderId === "patient" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.senderId === "patient" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.senderId === "patient" 
                        ? "text-primary-foreground/70" 
                        : "text-muted-foreground"
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
