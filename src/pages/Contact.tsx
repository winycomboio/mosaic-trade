import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={props.className}
    style={props.style}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.328-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.05-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.825 0 00-3.48-8.413z" />
  </svg>
);

const Contact = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Mail,
      titleKey: "emailUs",
      details: "biqueglobalenterprise@gmail.com",
      subtitle: "",
      link: "mailto:biqueglobalenterprise@gmail.com"
    },
    {
      icon: Phone,
      titleKey: "callUs",
      details: "+971527759591",
      subtitle: "",
      link: "tel:+971527759591"
    },
    {
      icon: WhatsAppIcon,
      titleKey: "whatsApp",
      details: "+971 52 775 9591",
      subtitle: t("chatOnWhatsApp"),
      link: "https://wa.me/971527759591"
    },
    {
      icon: MapPin,
      titleKey: "visitUs",
      details: "123 Business District",
      subtitle: "Global Trade Center, Suite 500"
    },
    {
      icon: Clock,
      titleKey: "businessHours",
      details: "Mon - Fri: 9:00 AM - 6:00 PM",
      subtitle: "Sat: 10:00 AM - 4:00 PM"
    }
  ];

  const serviceKeys = [
    "generalTrading",
    "foodBeverages",
    "carExport",
    "hrConsultancy",
    "preciousMetals",
    "ecommerce",
    "businessManagement",
    "crudeOil",
    "logistics",
    "agriculture",
    "travelAgency"
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
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
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
              {t("getInTouch")}
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              {t("contactDescription")}
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
                    {t("sendMessage")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        {t("fullName")} *
                      </label>
                      <Input 
                        placeholder={t("fullName")}
                        className="border-border/50 focus:border-primary" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        {t("emailAddress")} *
                      </label>
                      <Input 
                        placeholder={t("emailAddress")}
                        type="email" 
                        className="border-border/50 focus:border-primary" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        {t("companyName")}
                      </label>
                      <Input 
                        placeholder={t("companyName")}
                        className="border-border/50 focus:border-primary" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        {t("phoneNumber")}
                      </label>
                      <Input 
                        placeholder={t("phoneNumber")}
                        className="border-border/50 focus:border-primary" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      {t("serviceOfInterest")}
                    </label>
                    <Select>
                      <SelectTrigger className="border-border/50 focus:border-primary">
                        <SelectValue placeholder={t("selectService")} />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceKeys.map((key) => (
                          <SelectItem key={key} value={key}>
                            {t(key)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      {t("subject")} *
                    </label>
                    <Input 
                      placeholder={t("subject")}
                      className="border-border/50 focus:border-primary" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      {t("message")} *
                    </label>
                    <Textarea 
                      placeholder={t("message")}
                      rows={6}
                      className="border-border/50 focus:border-primary resize-none"
                    />
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-elegant"
                  >
                    {t("send")}
                  </Button>

                  <p className="text-sm text-text-secondary text-center">
                    {t("responseTime")}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary mb-6">{t("contactInformation")}</h3>
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-elegant transition-shadow duration-300 bg-white border-0 shadow-md">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-primary-navy" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">{t(info.titleKey)}</h4>
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
            {t("faq")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 bg-white border-0 shadow-md">
              <h3 className="font-semibold text-primary mb-3">{t("faq1Title")}</h3>
              <p className="text-text-secondary text-sm">
                {t("faq1Desc")}
              </p>
            </Card>
            
            <Card className="p-6 bg-white border-0 shadow-md">
              <h3 className="font-semibold text-primary mb-3">{t("faq2Title")}</h3>
              <p className="text-text-secondary text-sm">
                {t("faq2Desc")}
              </p>
            </Card>
            
            <Card className="p-6 bg-white border-0 shadow-md">
              <h3 className="font-semibold text-primary mb-3">{t("faq3Title")}</h3>
              <p className="text-text-secondary text-sm">
                {t("faq3Desc")}
              </p>
            </Card>
            
            <Card className="p-6 bg-white border-0 shadow-md">
              <h3 className="font-semibold text-primary mb-3">{t("faq4Title")}</h3>
              <p className="text-text-secondary text-sm">
                {t("faq4Desc")}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            {t("readyToStart")}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t("readyToStartDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+971527759591">
              <Button 
                size="lg" 
                className="bg-gradient-gold hover:opacity-90 text-primary-navy font-semibold px-8 py-4 text-lg transition-all duration-300 shadow-luxury"
              >
                {t("callUsNow")}
              </Button>
            </a>
            <Link to="/services">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg transition-all duration-300"
              >
                {t("viewOurServices")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
