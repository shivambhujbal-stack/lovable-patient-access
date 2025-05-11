
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Send } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your email address",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to send a reset password link
      // For now, we'll simulate a successful response after a short delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      
      toast({
        title: "Reset link sent",
        description: "If an account exists with that email, you will receive password reset instructions.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Request failed",
        description: "We couldn't process your request. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container flex items-center justify-center p-4 min-h-screen animate-fadeIn">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-medical-700">Patient Insights Portal</h1>
          <p className="text-muted-foreground mt-2">Reset your password</p>
        </div>
        
        <Card className="shadow-lg border-medical-200">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">
              {isSubmitted ? "Check Your Email" : "Forgot Password"}
            </CardTitle>
            <CardDescription className="text-center">
              {isSubmitted 
                ? "We've sent you an email with instructions to reset your password."
                : "Enter your email and we'll send you a link to reset your password."}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {isSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="mx-auto bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
                  <Send className="h-8 w-8 text-medical-600" />
                </div>
                <p className="text-sm text-muted-foreground">
                  If you don't see the email, check other places it might be, like your junk, spam, or other folders.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-medical-200 focus:border-medical-500"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full medical-gradient hover:opacity-90 transition-opacity"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Link to="/login" className="flex items-center text-medical-600 hover:text-medical-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
