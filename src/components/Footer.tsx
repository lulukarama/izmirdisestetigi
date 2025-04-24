import { useState } from "react";
import { Facebook, Instagram, Youtube, MessageCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import AppointmentModal from "./AppointmentModal";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and About */}
          <div>
            <div className="mb-4">
              <img 
                src="/lovable-uploads/83a7815a-a265-4521-b0fc-e92f824f7141.png" 
                alt="Izmir Diş Estetiği" 
                className="h-24 w-auto brightness-0 invert p-1 rounded-md"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Providing quality dental care with a focus on patient comfort and the latest technology for beautiful, healthy smiles.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-dental-orange transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-dental-orange transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-dental-orange transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-dental-orange transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                  {t('home')}
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  {t('aboutUs')}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                  {t('services')}
                </a>
              </li>
              <li>
                <a href="#team" className="text-gray-400 hover:text-white transition-colors">
                  {t('ourTeam')}
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">
                  {t('testimonials')}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  {t('contact')}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('ourServices')}</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('teethWhitening')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('dentalImplants')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('cosmeticDentistry')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('orthodontics')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('oralSurgery')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('preventiveCare')}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('contactUs')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-3 mt-1">
                  <Phone size={18} className="text-dental-orange" />
                </div>
                <span className="text-gray-400">+90 (232) 123-4567</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1">
                  <Mail size={18} className="text-dental-orange" />
                </div>
                <span className="text-gray-400">info@izmirdisestetigi.com</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <Button 
                className="bg-dental-purple hover:bg-dental-purple/90 w-full"
                onClick={() => setIsAppointmentModalOpen(true)}
              >
                {t('bookAppointment')}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Izmir Diş Estetiği. {t('allRightsReserved')}
            </p>
            <div className="flex space-x-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">{t('privacyPolicy')}</a>
              <a href="#" className="hover:text-white transition-colors">{t('termsOfService')}</a>
              <a href="#" className="hover:text-white transition-colors">{t('sitemap')}</a>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal 
        isOpen={isAppointmentModalOpen} 
        onClose={() => setIsAppointmentModalOpen(false)} 
      />
    </footer>
  );
};

export default Footer;
