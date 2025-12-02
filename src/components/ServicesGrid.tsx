import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
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
  Plane
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ServicesGrid = () => {
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

  return (
    <section id="services" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            {t("ourServices")}
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {t("servicesSubtitle")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Link key={index} to={`/services/${service.id}`}>
                <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white/80 backdrop-blur-sm cursor-pointer h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="inline-block px-3 py-1 bg-primary-gold/20 text-primary-gold text-sm rounded-full font-medium mb-2">
                      {t(service.categoryKey)}
                    </div>
                    <CardTitle className="text-xl font-bold text-primary group-hover:text-primary-navy transition-colors">
                      {t(service.titleKey)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-text-secondary leading-relaxed">
                      {t(service.descKey)}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
