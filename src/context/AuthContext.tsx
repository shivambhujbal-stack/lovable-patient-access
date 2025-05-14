
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

type User = {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor' | 'admin';
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, skipTwoFactor?: boolean) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  verifyOtp: (email: string, otp: string) => Promise<void>;
};

type SignupData = {
  email: string;
  password: string;
  name: string;
  dateOfBirth: string;
  gender: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pendingUser, setPendingUser] = useState<{email: string} | null>(null);
  const { toast } = useToast();

  // Check if user is logged in when the app loads
  useEffect(() => {
    const checkAuthStatus = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string, skipTwoFactor: boolean = false) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to authenticate
      if (email && password.length >= 6) {
        if (skipTwoFactor) {
          // Complete login immediately if skipping 2FA
          const mockUser = {
            id: '123456',
            email,
            name: email.split('@')[0],
            role: 'patient' as const
          };
          
          localStorage.setItem('user', JSON.stringify(mockUser));
          setUser(mockUser);
          
          toast({
            title: "Login successful",
            description: "Welcome back to Patient Insights Portal!",
          });
        } else {
          // Set the user as pending, waiting for OTP verification
          setPendingUser({ email });
          
          toast({
            title: "First step complete",
            description: "Please complete verification to continue",
          });
        }
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    setIsLoading(true);
    try {
      // Simulate OTP verification
      if (otp.length === 6) {
        // Check if the OTP is valid (in a real app, this would validate against a sent OTP)
        // For demo, we'll accept any 6-digit code
        
        // Create the user after successful verification
        const mockUser = {
          id: '123456',
          email,
          name: email.split('@')[0],
          role: 'patient' as const
        };
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        setPendingUser(null);
        
        toast({
          title: "Verification successful",
          description: "Welcome back to Patient Insights Portal!",
        });
      } else {
        throw new Error('Invalid verification code');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: error instanceof Error ? error.message : "Please check the verification code and try again",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupData) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to register
      // For now, we'll simulate a successful signup
      if (userData.email && userData.password.length >= 6) {
        // Mock user for demo
        const mockUser = {
          id: '123456',
          email: userData.email,
          name: userData.name,
          role: 'patient' as const
        };
        
        // Store user in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        
        toast({
          title: "Account created",
          description: "Welcome to Patient Insights Portal!",
        });
      } else {
        throw new Error('Invalid signup data');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Please check your information and try again",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      signup,
      logout,
      verifyOtp 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
