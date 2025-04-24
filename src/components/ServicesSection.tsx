
import ServiceCard from "./ServiceCard";
import { Smile, Gem, Sparkles, Star, Scissors, Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      id: 1,
      titleKey: 'teethWhitening',
      descriptionKey: 'teethWhiteningDesc',
      icon: Sparkles,
      color: "blue"
    },
    {
      id: 2,
      titleKey: 'dentalImplants',
      descriptionKey: 'dentalImplantsDesc',
      icon: Shield,
      color: "green"
    },
    {
      id: 3,
      titleKey: 'cosmeticDentistry',
      descriptionKey: 'cosmeticDentistryDesc',
      icon: Gem,
      color: "purple"
    },
    {
      id: 4,
      titleKey: 'orthodontics',
      descriptionKey: 'orthodonticsDesc',
      icon: Smile,
      color: "orange"
    },
    {
      id: 5,
      titleKey: 'oralSurgery',
      descriptionKey: 'oralSurgeryDesc',
      icon: Scissors,
      color: "purple"
    },
    {
      id: 6,
      titleKey: 'preventiveCare',
      descriptionKey: 'preventiveCareDesc',
      icon: Star,
      color: "orange"
    }
  ];

  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-dental-purple font-medium mb-2">{t('ourServices')}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('servicesTitle')}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('servicesDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard 
              key={service.id}
              title={t(service.titleKey as any)}
              description={t(service.descriptionKey as any)}
              icon={service.icon}
              color={service.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
