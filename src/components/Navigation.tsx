import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

const Navigation = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const handleServiceSelect = (serviceId: string) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            GlobalTrade Corp
          </Link>
          <div className="hidden lg:flex items-center space-x-6">
            <SearchBar onServiceSelect={handleServiceSelect} />
          </div>
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
            <Button variant="default" className="bg-gradient-primary hover:opacity-90 transition-opacity">
              {t("getStarted")}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;