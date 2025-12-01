import { Link } from "react-router-dom";

const services = [
  { name: "General Trading", id: "general-trading" },
  { name: "Food & Beverages", id: "food-beverages" },
  { name: "Car Export", id: "car-export" },
  { name: "HR Consultancy", id: "hr-consultancy" },
  { name: "E-Commerce", id: "ecommerce" },
  { name: "Logistics", id: "logistics" },
];

const Footer = () => {
  return (
    <footer className="bg-primary-navy text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-4">
              GlobalTrade Corp
            </div>
            <p className="text-white/80 mb-4 leading-relaxed">
              Your trusted partner in international trade, consultancy, and business solutions. 
              We connect businesses worldwide through our comprehensive services and expertise.
            </p>
            <div className="text-white/60 text-sm">
              © 2024 GlobalTrade Corp. All rights reserved.
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-primary-gold">Quick Links</h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>
                <Link to="/services" className="hover:text-primary-gold transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-gold transition-colors">
                  Contact Us
                </Link>
              </li>
              {services.slice(0, 3).map((service) => (
                <li key={service.id}>
                  <Link 
                    to={`/services/${service.id}`} 
                    className="hover:text-primary-gold transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-primary-gold">Contact</h3>
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