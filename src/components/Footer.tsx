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
            <h3 className="font-semibold mb-4 text-primary-gold">Services</h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>General Trading</li>
              <li>Food & Beverages</li>
              <li>Car Export</li>
              <li>HR Consultancy</li>
              <li>E-Commerce</li>
              <li>Logistics</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-primary-gold">Contact</h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>biqueglobalenterprise@gmail.com</li>
              <li>+971527759591</li>
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