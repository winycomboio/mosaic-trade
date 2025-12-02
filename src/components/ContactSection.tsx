import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Mail,
      titleKey: "emailUs",
      details: "biqueglobalenterprise@gmail.com",
      subtitle: ""
    },
    {
      icon: Phone,
      titleKey: "callUs",
      details: "+971527759591",
      subtitle: ""
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

  return (
    <section id="contact" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            {t("getInTouch")}
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {t("contactDescription")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-elegant border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">{t("sendMessage")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder={t("fullName")} className="border-border/50 focus:border-primary" />
                  <Input placeholder={t("emailAddress")} type="email" className="border-border/50 focus:border-primary" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder={t("companyName")} className="border-border/50 focus:border-primary" />
                  <Input placeholder={t("phoneNumber")} className="border-border/50 focus:border-primary" />
                </div>
                <Input placeholder={t("subject")} className="border-border/50 focus:border-primary" />
                <Textarea 
                  placeholder={t("message")}
                  rows={6}
                  className="border-border/50 focus:border-primary resize-none"
                />
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-elegant"
                >
                  {t("send")}
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-elegant transition-shadow duration-300 bg-white border-0 shadow-md">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary-navy" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">{t(info.titleKey)}</h3>
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
  );
};

export default ContactSection;
