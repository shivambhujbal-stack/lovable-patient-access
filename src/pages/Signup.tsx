
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, Eye, EyeOff, UserPlus } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    dateOfBirth: "",
    gender: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const validateStep1 = () => {
    if (!formData.email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Email is required",
      });
      return false;
    }
    
    if (!formData.password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password is required",
      });
      return false;
    }
    
    if (formData.password.length < 6) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password must be at least 6 characters",
      });
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords don't match",
      });
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    if (!formData.name) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Full name is required",
      });
      return false;
    }
    
    if (!formData.dateOfBirth) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Date of birth is required",
      });
      return false;
    }
    
    if (!formData.gender) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select your gender",
      });
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    setIsSubmitting(true);
    
    try {
      await signup(formData);
      navigate("/dashboard");
    } catch (error) {
      // Error is handled in the auth context
      console.error("Signup failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container flex items-center justify-center p-4 min-h-screen animate-fadeIn">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-medical-700">Patient Insights Portal</h1>
          <p className="text-muted-foreground mt-2">Register for secure access to your health information</p>
        </div>
        
        <Card className="shadow-lg border-medical-200">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">
              Enter your details to create your patient account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <div className={`flex-1 border-t-4 ${currentStep >= 1 ? 'border-medical-600' : 'border-gray-300'}`}></div>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${currentStep >= 1 ? 'bg-medical-600' : 'bg-gray-300'}`}>
                  {currentStep > 1 ? <CheckCircle size={20} /> : 1}
                </div>
                <div className={`flex-1 border-t-4 ${currentStep >= 2 ? 'border-medical-600' : 'border-gray-300'}`}></div>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${currentStep >= 2 ? 'bg-medical-600' : 'bg-gray-300'}`}>
                  {currentStep > 2 ? <CheckCircle size={20} /> : 2}
                </div>
                <div className="flex-1 border-t-4 border-gray-300"></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span className={currentStep === 1 ? "text-medical-700 font-medium" : ""}>Account</span>
                <span className={currentStep === 2 ? "text-medical-700 font-medium" : ""}>Personal Info</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {currentStep === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-medical-200 focus:border-medical-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input 
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
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
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 6 characters long
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input 
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="border-medical-200 focus:border-medical-500"
                    />
                  </div>
                  
                  <Button 
                    type="button" 
                    onClick={handleNextStep}
                    className="w-full medical-gradient hover:opacity-90 transition-opacity"
                  >
                    Continue
                  </Button>
                </>
              )}
              
              {currentStep === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name"
                      type="text" 
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-medical-200 focus:border-medical-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input 
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                      className="border-medical-200 focus:border-medical-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select onValueChange={handleSelectChange}>
                      <SelectTrigger className="border-medical-200 focus:border-medical-500">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handlePrevStep}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="flex-1 medical-gradient hover:opacity-90 transition-opacity"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Create Account
                        </span>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </CardContent>
          
          <CardFooter>
            <p className="text-center text-sm text-muted-foreground w-full">
              Already have an account?{" "}
              <Link to="/login" className="text-medical-600 hover:text-medical-800 font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
