import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "biqueglobalenterprise@gmail.com",
    subtitle: ""
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+971527759591",
    subtitle: ""
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "123 Business District",
    subtitle: "Global Trade Center, Suite 500"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Mon - Fri: 9:00 AM - 6:00 PM",
    subtitle: "Sat: 10:00 AM - 4:00 PM"
  }
];

const services = [
  "General Trading",
  "Food & Beverages",
  "Car Export",
  "HR Consultancy",
  "Precious Metals & Gems",
  "E-Commerce",
  "Business Management",
  "Crude Oil Trading",
  "Logistics",
  "Agriculture & Fertilizer",
  "Travel Agency"
];

const Contact = () => {
  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="flex items-center mb-8">
            <Link to="/">
              <Button variant="ghost" className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
              Get In Touch
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Ready to expand your business globally? Contact us today to discuss 
              how we can help you achieve your international trade goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-elegant border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary flex items-center">
                    <Send className="w-6 h-6 mr-2" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Full Name *
                      </label>
                      <Input 
                        placeholder="Your full name" 
                        className="border-border/50 focus:border-primary" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Email Address *
                      </label>
                      <Input 
                        placeholder="your.email@example.com" 
                        type="email" 
                        className="border-border/50 focus:border-primary" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Company Name
                      </label>
                      <Input 
                        placeholder="Your company name" 
                        className="border-border/50 focus:border-primary" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Phone Number
                      </label>
                      <Input 
                        placeholder="+1 (555) 123-4567" 
                        className="border-border/50 focus:border-primary" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Service of Interest
                    </label>
                    <Select>
                      <SelectTrigger className="border-border/50 focus:border-primary">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service.toLowerCase().replace(/\s+/g, '-')}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Subject *
                    </label>
                    <Input 
                      placeholder="Brief subject of your inquiry" 
                      className="border-border/50 focus:border-primary" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Message *
                    </label>
                    <Textarea 
                      placeholder="Tell us about your business needs, project requirements, or any questions you have..." 
                      rows={6}
                      className="border-border/50 focus:border-primary resize-none"
                    />
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-elegant"
                  >
                    Send Message
                  </Button>

                  <p className="text-sm text-text-secondary text-center">
                    We'll get back to you within 24 hours during business days.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary mb-6">Contact Information</h3>
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-elegant transition-shadow duration-300 bg-white border-0 shadow-md">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-primary-navy" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">{info.title}</h4>
                        <p className="text-text-secondary text-sm mb-1">{info.details}</p>
                        <p className="text-text-secondary text-sm">{info.subtitle}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 bg-white border-0 shadow-md">
              <h3 className="font-semibold text-primary mb-3">How do I get started?</h3>
              <p className="text-text-secondary text-sm">
                Simply contact us through this form or call us directly. We'll schedule a consultation to understand your needs and provide a customized solution.
              </p>
            </Card>
            
            <Card className="p-6 bg-white border-0 shadow-md">
              <h3 className="font-semibold text-primary mb-3">What countries do you serve?</h3>
              <p className="text-text-secondary text-sm">
                We operate in over 50 countries worldwide, with extensive networks in North America, Europe, Asia, and the Middle East.
              </p>
            </Card>
            
            <Card className="p-6 bg-white border-0 shadow-md">
              <h3 className="font-semibold text-primary mb-3">Do you handle customs clearance?</h3>
              <p className="text-text-secondary text-sm">
                Yes, we provide comprehensive customs clearance services and ensure all regulatory requirements are met for smooth international transactions.
              </p>
            </Card>
            
            <Card className="p-6 bg-white border-0 shadow-md">
              <h3 className="font-semibold text-primary mb-3">What are your payment terms?</h3>
              <p className="text-text-secondary text-sm">
                Payment terms vary by service and project scope. We offer flexible arrangements including letters of credit, wire transfers, and trade financing options.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Start Your Global Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Don't wait to expand your business internationally. Our team is ready to help you navigate global markets and achieve your business goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-gold hover:opacity-90 text-primary-navy font-semibold px-8 py-4 text-lg transition-all duration-300 shadow-luxury"
            >
              Call Us Now
            </Button>
            <Link to="/services">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg transition-all duration-300"
              >
                View Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;