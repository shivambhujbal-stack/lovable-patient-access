
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogIn, UserPlus, Activity, FileText, Shield, ArrowRight, Check } from "lucide-react";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Nav */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <svg className="h-9 w-9 text-medical-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span className="ml-2 font-bold text-xl">Patient Insights Portal</span>
            </div>
            <nav className="hidden md:flex">
              <ul className="flex space-x-8">
                <li><a href="#home" className="text-gray-700 hover:text-medical-600 font-medium">Home</a></li>
                <li><a href="#about" className="text-gray-700 hover:text-medical-600 font-medium">About</a></li>
                <li><a href="#services" className="text-gray-700 hover:text-medical-600 font-medium">Services</a></li>
                <li><a href="#testimonials" className="text-gray-700 hover:text-medical-600 font-medium">Testimonials</a></li>
                <li><a href="#contact" className="text-gray-700 hover:text-medical-600 font-medium">Contact</a></li>
              </ul>
            </nav>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button>
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="flex items-center">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="medical-gradient hover:opacity-90 flex items-center">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-medical-100 to-blue-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your <span className="text-medical-700">Health Journey</span>, Reimagined
              </h1>
              <p className="text-xl text-gray-700">
                Experience healthcare management simplified. Access records, track progress, and 
                communicate with providers in one secure platform.
              </p>
              <div className="pt-4 flex space-x-4">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button size="lg" className="medical-gradient hover:opacity-90">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/signup">
                      <Button size="lg" className="medical-gradient hover:opacity-90">
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline">
                        Learn More
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-8 md:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Medical professional with digital tablet" 
                className="rounded-lg shadow-xl max-w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">About Patient Insights Portal</h2>
            <div className="h-1 w-24 bg-medical-600 mx-auto mt-4 mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing how patients interact with their healthcare data
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                At Patient Insights Portal, we believe healthcare should be accessible, transparent, 
                and patient-centered. Our platform bridges the gap between patients and their health 
                information, empowering individuals to take control of their wellness journey.
              </p>
              
              <div className="space-y-4">
                {[
                  "Secure access to complete medical records",
                  "Easy communication with healthcare providers",
                  "Personalized health insights and recommendations",
                  "Simplified appointment scheduling"
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-medical-600 mr-2 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Healthcare team meeting" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <div className="h-1 w-24 bg-medical-600 mx-auto mt-4 mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed to enhance your healthcare experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Activity className="h-10 w-10 text-medical-600" />,
                title: "Health Monitoring",
                description: "Track vital health metrics in real-time with intuitive visualizations and personalized insights."
              },
              {
                icon: <FileText className="h-10 w-10 text-medical-600" />,
                title: "Medical Records",
                description: "Access your complete medical history including test results, diagnoses, and treatments anytime."
              },
              {
                icon: <Shield className="h-10 w-10 text-medical-600" />,
                title: "Secure Messaging",
                description: "Communicate directly with your healthcare providers through our encrypted messaging system."
              }
            ].map((service, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">{service.title}</h3>
                <p className="text-gray-600 text-center">{service.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
              <Button size="lg" className="medical-gradient hover:opacity-90">
                {isAuthenticated ? "Access Services" : "Get Started"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
            <div className="h-1 w-24 bg-medical-600 mx-auto mt-4 mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Read about the experiences of patients and providers using our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "The Patient Insights Portal has transformed how I manage my chronic condition. Having all my medical information in one place has been life-changing.",
                author: "Sarah M.",
                role: "Patient"
              },
              {
                quote: "As a physician, this platform streamlines patient communication and gives me a comprehensive view of their health history. It's an invaluable tool.",
                author: "Dr. James Wilson",
                role: "Cardiologist"
              },
              {
                quote: "The appointment scheduling and medication tracking features have made managing my family's healthcare so much simpler. Highly recommended!",
                author: "Michael T.",
                role: "Parent"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <svg className="h-6 w-6 text-medical-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                </div>
                <p className="text-gray-600 italic mb-6">{testimonial.quote}</p>
                <div>
                  <p className="font-medium text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Get In Touch</h2>
            <div className="h-1 w-24 bg-medical-600 mx-auto mt-4 mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions or need assistance? We're here to help.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Us</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-medical-500 focus:border-medical-500" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-medical-500 focus:border-medical-500" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-700">Subject</label>
                  <input type="text" id="subject" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-medical-500 focus:border-medical-500" />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">Message</label>
                  <textarea id="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-medical-500 focus:border-medical-500"></textarea>
                </div>
                <div>
                  <Button className="w-full medical-gradient hover:opacity-90">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="h-6 w-6 text-medical-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-600">123 Healthcare Avenue, Medical District, CA 92010</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="h-6 w-6 text-medical-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">info@patientinsightsportal.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="h-6 w-6 text-medical-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">(123) 456-7890</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Office Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday:</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday:</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Patient Insights Portal</h3>
              <p className="text-sm">Your trusted partner in healthcare management and wellness</p>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold uppercase mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold uppercase mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Protection</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold uppercase mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.017 10.017 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold mb-2">Subscribe to our newsletter</h4>
                <div className="flex">
                  <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-md w-full text-gray-900 text-sm focus:outline-none" />
                  <button className="bg-medical-600 text-white px-4 py-2 rounded-r-md text-sm hover:bg-medical-700 focus:outline-none">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>&copy; 2025 Patient Insights Portal. All rights reserved.</p>
              <p className="mt-4 md:mt-0">Designed for better healthcare management</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
