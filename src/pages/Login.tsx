
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, LogIn, Smartphone } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(30);
  const { login, verifyOtp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        variant: "destructive",
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setOtpSent(true);
      setResendDisabled(true);
      
      let countDown = 30;
      setResendCountdown(countDown);
      
      const timer = setInterval(() => {
        countDown -= 1;
        setResendCountdown(countDown);
        
        if (countDown <= 0) {
          clearInterval(timer);
          setResendDisabled(false);
        }
      }, 1000);
      
      toast({
        title: "OTP sent successfully",
        description: `A verification code has been sent to ${phoneNumber}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send OTP",
        description: "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // First step authentication
      await login(email, password, false);
      setShowOtpStep(true);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "Please enter the 6-digit verification code",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Verify OTP and complete the login process
      await verifyOtp(email, otp);
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: "The verification code is incorrect or has expired",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showOtpStep) {
    return (
      <div className="auth-container flex items-center justify-center p-4 min-h-screen animate-fadeIn">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-medical-700">Patient Insights Portal</h1>
            <p className="text-muted-foreground mt-2">Verify your identity</p>
          </div>
          
          <Card className="shadow-lg border-medical-200">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-semibold text-center">Two-Factor Authentication</CardTitle>
              <CardDescription className="text-center">
                Enter the verification code to complete sign in
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                {!otpSent ? (
                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile Number</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your mobile number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="flex-1 border-medical-200 focus:border-medical-500"
                      />
                      <Button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isSubmitting || !phoneNumber}
                        className="whitespace-nowrap bg-medical-600 hover:bg-medical-700"
                      >
                        {isSubmitting ? "Sending..." : "Send OTP"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">Verification Code</Label>
                      <div className="flex justify-center py-2">
                        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      <p className="text-sm text-center text-muted-foreground">
                        Enter the 6-digit code sent to {phoneNumber}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <Button
                        type="button"
                        variant="link"
                        disabled={resendDisabled}
                        onClick={handleSendOtp}
                        className="text-medical-600"
                      >
                        {resendDisabled 
                          ? `Resend code in ${resendCountdown}s` 
                          : "Resend verification code"}
                      </Button>
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || otp.length !== 6}
                      className="w-full medical-gradient hover:opacity-90 transition-opacity"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Verifying...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <Smartphone className="mr-2 h-4 w-4" />
                          Verify and Sign in
                        </span>
                      )}
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
            
            <CardFooter className="flex justify-center">
              <Button 
                variant="ghost" 
                onClick={() => setShowOtpStep(false)}
                className="text-medical-600"
              >
                Go back to login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container flex items-center justify-center p-4 min-h-screen animate-fadeIn">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-medical-700">Patient Insights Portal</h1>
          <p className="text-muted-foreground mt-2">Access your health information</p>
        </div>
        
        <Card className="shadow-lg border-medical-200">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleInitialSubmit} className="space-y-4">
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
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-medical-600 hover:text-medical-800">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10 border-medical-200 focus:border-medical-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
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
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    Continue
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full">
              <Button variant="outline" className="border-medical-200">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="border-medical-200">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22,12c0-5.523-4.477-10-10-10S2,6.477,2,12c0,4.991,3.657,9.128,8.438,9.878 v-6.987h-2.54V12h2.54V9.797c0-2.506,1.492-3.89,3.777-3.89c1.094,0,2.238,0.195,2.238,0.195v2.46h-1.26 c-1.243,0-1.63,0.771-1.63,1.562V12h2.773l-0.443,2.89h-2.33v6.988C18.343,21.128,22,16.991,22,12z"
                  />
                </svg>
                Facebook
              </Button>
            </div>
            
            <p className="text-center text-sm text-muted-foreground mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-medical-600 hover:text-medical-800 font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
