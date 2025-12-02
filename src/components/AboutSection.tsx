import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Award, Globe2, Users2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const AboutSection = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Globe2, value: "50+", labelKey: "countriesServed" },
    { icon: Users2, value: "500+", labelKey: "happyClients" },
    { icon: Award, value: "15+", labelKey: "yearsExperience" },
    { icon: CheckCircle, value: "1000+", labelKey: "successfulProjects" }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              {t("aboutTitle")}
            </h2>
            <p className="text-lg text-text-secondary mb-6 leading-relaxed">
              {t("aboutText1")}
            </p>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              {t("aboutText2")}
            </p>
            <Link to="/about">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-elegant"
              >
                {t("learnMore")}
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-elegant transition-shadow duration-300 bg-white border-0 shadow-md">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-gold rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary-navy" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-text-secondary font-medium">{t(stat.labelKey)}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
