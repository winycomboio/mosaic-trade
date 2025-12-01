import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AIChatBot from "@/components/AIChatBot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ServicesGrid />
      <AboutSection />
      <ContactSection />
      <Footer />
      <AIChatBot />
    </div>
  );
};

export default Index;
