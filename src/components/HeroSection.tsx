import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import AppointmentModal from "./AppointmentModal";

const HeroSection = () => {
  const {
    t
  } = useLanguage();
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  return <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Hero Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">{t('heroTitle')}</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              {t('heroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-dental-purple hover:bg-dental-purple/90 flex items-center gap-2"
                onClick={() => setIsAppointmentModalOpen(true)}
              >
                <Calendar size={20} />
                <span>{t('bookAppointment')}</span>
              </Button>
              <Button size="lg" variant="outline" className="flex items-center gap-2">
                <span>{t('learnMore')}</span>
                <ArrowRight size={20} />
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div>
                <div className="text-3xl font-bold text-dental-purple">12+</div>
                <div className="text-sm text-gray-600">{t('yearsOfExperience')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-dental-orange">5000+</div>
                <div className="text-sm text-gray-600">{t('happyPatients')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-dental-blue">15+</div>
                <div className="text-sm text-gray-600">{t('dentalSpecialists')}</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-dental-blue/20 blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-dental-orange/20 blur-2xl"></div>
            
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-custom">
              <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2668&auto=format&fit=crop" alt="Dentist with patient" className="w-full h-full object-cover" />
              
              {/* Accent Elements */}
              
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="wave-divider"></div>

      {/* Appointment Modal */}
      <AppointmentModal 
        isOpen={isAppointmentModalOpen} 
        onClose={() => setIsAppointmentModalOpen(false)} 
      />
    </section>;
};
export default HeroSection;