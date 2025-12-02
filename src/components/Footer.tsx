import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const services = [
    { nameKey: "generalTrading", id: "general-trading" },
    { nameKey: "foodBeverages", id: "food-beverages" },
    { nameKey: "carExport", id: "car-export" },
    { nameKey: "hrConsultancy", id: "hr-consultancy" },
    { nameKey: "ecommerce", id: "ecommerce" },
    { nameKey: "logistics", id: "logistics" },
  ];

  return (
    <footer className="bg-primary-navy text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-4">
              Bique Global Enterprise
            </div>
            <p className="text-white/80 mb-4 leading-relaxed">
              {t("footerDescription")}
            </p>
            <div className="text-white/60 text-sm">
              © 2024 Bique Global Enterprise. {t("allRightsReserved")}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-primary-gold">{t("quickLinks")}</h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>
                <Link to="/services" className="hover:text-primary-gold transition-colors">
                  {t("services")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-gold transition-colors">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-gold transition-colors">
                  {t("contact")}
                </Link>
              </li>
              {services.slice(0, 3).map((service) => (
                <li key={service.id}>
                  <Link 
                    to={`/services/${service.id}`} 
                    className="hover:text-primary-gold transition-colors"
                  >
                    {t(service.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-primary-gold">{t("contact")}</h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>
                <a href="mailto:biqueglobalenterprise@gmail.com" className="hover:text-primary-gold transition-colors">
                  biqueglobalenterprise@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+971527759591" className="hover:text-primary-gold transition-colors">
                  +971527759591
                </a>
              </li>
              <li>123 Business District</li>
              <li>Global Trade Center</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
