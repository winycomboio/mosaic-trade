import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Globe, 
  ShoppingCart, 
  Car, 
  Users, 
  Gem, 
  Monitor, 
  Briefcase, 
  Fuel, 
  Truck, 
  Wheat,
  Plane,
  ArrowLeft
} from "lucide-react";

const Services = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const services = [
    {
      id: "general-trading",
      icon: Globe,
      titleKey: "generalTrading",
      descKey: "generalTradingDesc",
      categoryKey: "categoryExportImport"
    },
    {
      id: "food-beverages",
      icon: ShoppingCart,
      titleKey: "foodBeverages",
      descKey: "foodBeveragesDesc",
      categoryKey: "categoryFB"
    },
    {
      id: "car-export",
      icon: Car,
      titleKey: "carExport",
      descKey: "carExportDesc",
      categoryKey: "categoryAutomotive"
    },
    {
      id: "hr-consultancy",
      icon: Users,
      titleKey: "hrConsultancy",
      descKey: "hrConsultancyDesc",
      categoryKey: "categoryConsultancy"
    },
    {
      id: "precious-metals",
      icon: Gem,
      titleKey: "preciousMetals",
      descKey: "preciousMetalsDesc",
      categoryKey: "categoryCommodities"
    },
    {
      id: "ecommerce",
      icon: Monitor,
      titleKey: "ecommerce",
      descKey: "ecommerceDesc",
      categoryKey: "categoryDigital"
    },
    {
      id: "business-management",
      icon: Briefcase,
      titleKey: "businessManagement",
      descKey: "businessManagementDesc",
      categoryKey: "categoryManagement"
    },
    {
      id: "crude-oil",
      icon: Fuel,
      titleKey: "crudeOil",
      descKey: "crudeOilDesc",
      categoryKey: "categoryEnergy"
    },
    {
      id: "logistics",
      icon: Truck,
      titleKey: "logistics",
      descKey: "logisticsDesc",
      categoryKey: "categorySupplyChain"
    },
    {
      id: "agriculture",
      icon: Wheat,
      titleKey: "agriculture",
      descKey: "agricultureDesc",
      categoryKey: "categoryAgriculture"
    },
    {
      id: "travel-agency",
      icon: Plane,
      titleKey: "travelAgency",
      descKey: "travelAgencyDesc",
      categoryKey: "categoryTravel"
    }
  ];

  const handleServiceSelect = (serviceId: string) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Header Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="flex items-center mb-8">
            <Link to="/">
              <Button variant="ghost" className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("backToHome")}
              </Button>
            </Link>
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
              {t("ourServices")}
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
              {t("servicesSubtitle")}
            </p>
            
            <div className="flex justify-center mb-8">
              <SearchBar onServiceSelect={handleServiceSelect} />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Link key={index} to={`/services/${service.id}`}>
                  <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white cursor-pointer h-full">
                    <CardHeader className="text-center pb-4">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      <div className="inline-block px-3 py-1 bg-primary-gold/20 text-primary-gold text-sm rounded-full font-medium mb-2">
                        {t(service.categoryKey)}
                      </div>
                      <CardTitle className="text-2xl font-bold text-primary group-hover:text-primary-navy transition-colors">
                        {t(service.titleKey)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-text-secondary leading-relaxed text-center mb-6">
                        {t(service.descKey)}
                      </CardDescription>
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                      >
                        {t("learnMore")}
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
