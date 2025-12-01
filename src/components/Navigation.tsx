import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useState } from "react";

const Navigation = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleServiceSelect = (serviceId: string) => {
    navigate(`/services/${serviceId}`);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            GlobalTrade Corp
          </Link>
          
          {/* Desktop Search */}
          <div className="hidden lg:flex items-center space-x-6">
            <SearchBar onServiceSelect={handleServiceSelect} />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/services" className="text-text-secondary hover:text-primary transition-colors">
              {t("services")}
            </Link>
            <Link to="/about" className="text-text-secondary hover:text-primary transition-colors">
              {t("about")}
            </Link>
            <Link to="/contact" className="text-text-secondary hover:text-primary transition-colors">
              {t("contact")}
            </Link>
            <Select value={language} onValueChange={(value) => setLanguage(value as "en" | "fr" | "pt")}>
              <SelectTrigger className="w-[140px] border-border/50">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
              </SelectContent>
            </Select>
            <Link to="/contact">
              <Button variant="default" className="bg-gradient-primary hover:opacity-90 transition-opacity">
                {t("getStarted")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-6 mt-8">
                <SheetClose asChild>
                  <Link to="/" className="text-lg font-semibold text-primary hover:text-primary-navy transition-colors">
                    Home
                  </Link>
                </SheetClose>
                
                <SheetClose asChild>
                  <Link to="/services" className="text-lg font-semibold text-primary hover:text-primary-navy transition-colors">
                    {t("services")}
                  </Link>
                </SheetClose>
                
                <SheetClose asChild>
                  <Link to="/about" className="text-lg font-semibold text-primary hover:text-primary-navy transition-colors">
                    {t("about")}
                  </Link>
                </SheetClose>
                
                <SheetClose asChild>
                  <Link to="/contact" className="text-lg font-semibold text-primary hover:text-primary-navy transition-colors">
                    {t("contact")}
                  </Link>
                </SheetClose>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-text-secondary mb-3">Language</p>
                  <Select value={language} onValueChange={(value) => setLanguage(value as "en" | "fr" | "pt")}>
                    <SelectTrigger className="w-full border-border/50">
                      <Globe className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="pt">Português</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4">
                  <SearchBar onServiceSelect={handleServiceSelect} />
                </div>

                <SheetClose asChild>
                  <Link to="/contact">
                    <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                      {t("getStarted")}
                    </Button>
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;