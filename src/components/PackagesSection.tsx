import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import AppointmentModal from "./AppointmentModal";

const PackagesSection = () => {
  const { t } = useLanguage();
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const packages = [
    {
      id: 1,
      name: "Basic Checkup",
      description: "Complete dental examination, cleaning, and X-rays for preventive care",
      price: "$99",
      features: ["Dental Examination", "Professional Cleaning", "X-rays", "Treatment Plan"]
    },
    {
      id: 2,
      name: "Whitening Package",
      description: "Professional teeth whitening treatment for a brighter, confident smile",
      price: "$299",
      features: ["Dental Checkup", "Professional Whitening", "Take-home Kit", "Follow-up Session"]
    },
    {
      id: 3,
      name: "Implant Package",
      description: "Complete dental implant solution including consultation and surgery",
      price: "$2,999",
      features: ["Initial Consultation", "3D Imaging", "Implant Surgery", "Crown Placement"]
    },
    {
      id: 4,
      name: "Smile Makeover",
      description: "Comprehensive smile transformation with multiple treatments",
      price: "$4,999",
      features: ["Full Assessment", "Custom Treatment Plan", "Multiple Procedures", "Follow-up Care"]
    }
  ];

  return (
    <section className="section-padding bg-gray-50 animate-fade-in opacity-0" id="packages">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('dentalPackages')}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('packagesDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="relative group hover:shadow-custom-hover transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl mb-2">{pkg.name}</CardTitle>
                <CardDescription className="text-2xl font-bold text-dental-purple">
                  {pkg.price}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <ul className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-dental-purple rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-dental-purple hover:bg-dental-purple/90"
                  onClick={() => setIsAppointmentModalOpen(true)}
                >
                  {t('bookNow')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal 
        isOpen={isAppointmentModalOpen} 
        onClose={() => setIsAppointmentModalOpen(false)} 
      />
    </section>
  );
};

export default PackagesSection;
