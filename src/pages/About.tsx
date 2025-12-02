import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Globe2, Users2, Award, CheckCircle, Target, Eye, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Globe2, value: "50+", labelKey: "countriesServed" },
    { icon: Users2, value: "500+", labelKey: "happyClients" },
    { icon: Award, value: "15+", labelKey: "yearsExperience" },
    { icon: CheckCircle, value: "1000+", labelKey: "successfulProjects" }
  ];

  const values = [
    {
      icon: Target,
      titleKey: "excellence",
      descKey: "excellenceDesc"
    },
    {
      icon: Eye,
      titleKey: "transparency",
      descKey: "transparencyDesc"
    },
    {
      icon: Heart,
      titleKey: "integrity",
      descKey: "integrityDesc"
    }
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
              {t("aboutTitle")}
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              {t("buildingBridges")}
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary text-center">
              {t("ourStory")}
            </h2>
            <div className="prose prose-lg mx-auto text-text-secondary leading-relaxed">
              <p className="text-lg mb-6">
                {t("ourStoryP1")}
              </p>
              <p className="text-lg mb-6">
                {t("ourStoryP2")}
              </p>
              <p className="text-lg">
                {t("ourStoryP3")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary text-center">
            {t("ourImpact")}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-elegant transition-shadow duration-300 bg-white border-0 shadow-md">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-gold rounded-full flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-primary-navy" />
                    </div>
                    <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-text-secondary font-medium">{t(stat.labelKey)}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary text-center">
            {t("ourValues")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center p-8 hover:shadow-elegant transition-shadow duration-300 bg-white border-0 shadow-md">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-4">{t(value.titleKey)}</h3>
                    <p className="text-text-secondary leading-relaxed">{t(value.descKey)}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-white">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t("ourMission")}</h2>
              <p className="text-lg leading-relaxed text-white/90">
                {t("missionText")}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">{t("ourVision")}</h2>
              <p className="text-lg leading-relaxed text-white/90">
                {t("visionText")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
            {t("readyToWork")}
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            {t("readyToWorkDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-elegant px-8 py-4"
              >
                {t("contactUsToday")}
              </Button>
            </Link>
            <Link to="/services">
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4"
              >
                {t("exploreServices")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
