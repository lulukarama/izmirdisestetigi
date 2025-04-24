import { useState, useEffect } from "react";
import { Menu, X, Phone, Globe, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { Link, useNavigate } from "react-router-dom";
import AppointmentModal from "./AppointmentModal";

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'tr' : 'en');
  };

  const handleNavigation = (section: string) => {
    navigate('/', { replace: true });
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-2">
              <Link to="/" className="flex items-center">
                <img 
                  src="/lovable-uploads/83a7815a-a265-4521-b0fc-e92f824f7141.png" 
                  alt="Izmir Diş Estetiği" 
                  className="h-20 w-auto" 
                />
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNavigation('home')} className="font-medium text-gray-800 hover:text-dental-purple transition-colors">
              <span>{t('home')}</span>
            </button>
            <button onClick={() => handleNavigation('services')} className="font-medium text-gray-800 hover:text-dental-purple transition-colors">
              <span>{t('services')}</span>
            </button>
            <button onClick={() => handleNavigation('team')} className="font-medium text-gray-800 hover:text-dental-purple transition-colors">
              <span>{t('ourTeam')}</span>
            </button>
            <button onClick={() => handleNavigation('testimonials')} className="font-medium text-gray-800 hover:text-dental-purple transition-colors">
              <span>{t('testimonials')}</span>
            </button>
            <button onClick={() => handleNavigation('contact')} className="font-medium text-gray-800 hover:text-dental-purple transition-colors">
              <span>{t('contact')}</span>
            </button>
            <Link 
              to="/blog" 
              className="font-medium text-gray-800 hover:text-dental-purple transition-colors flex items-center gap-2"
            >
              <Newspaper size={16} />
              <span>{t('blog')}</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleLanguage} 
              className="flex items-center gap-1"
            >
              <Globe size={16} />
              <span>{language === 'en' ? 'TR' : 'EN'}</span>
            </Button>
            
            <Button 
              className="bg-dental-purple hover:bg-dental-purple/90 flex items-center gap-2"
              onClick={() => setIsAppointmentModalOpen(true)}
            >
              <Phone size={18} />
              <span>{t('bookAppointment')}</span>
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleLanguage} 
              className="flex items-center gap-1"
            >
              <Globe size={16} />
              <span>{language === 'en' ? 'TR' : 'EN'}</span>
            </Button>
          
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  handleNavigation('home');
                  setIsMobileMenuOpen(false);
                }}
                className="font-medium text-gray-800 hover:text-dental-purple"
              >
                <span>{t('home')}</span>
              </button>
              <button 
                onClick={() => {
                  handleNavigation('services');
                  setIsMobileMenuOpen(false);
                }}
                className="font-medium text-gray-800 hover:text-dental-purple"
              >
                <span>{t('services')}</span>
              </button>
              <button 
                onClick={() => {
                  handleNavigation('team');
                  setIsMobileMenuOpen(false);
                }}
                className="font-medium text-gray-800 hover:text-dental-purple"
              >
                <span>{t('ourTeam')}</span>
              </button>
              <button 
                onClick={() => {
                  handleNavigation('testimonials');
                  setIsMobileMenuOpen(false);
                }}
                className="font-medium text-gray-800 hover:text-dental-purple"
              >
                <span>{t('testimonials')}</span>
              </button>
              <button 
                onClick={() => {
                  handleNavigation('contact');
                  setIsMobileMenuOpen(false);
                }}
                className="font-medium text-gray-800 hover:text-dental-purple"
              >
                <span>{t('contact')}</span>
              </button>
              <Link 
                to="/blog" 
                className="font-medium text-gray-800 hover:text-dental-purple flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Newspaper size={16} />
                <span>{t('blog')}</span>
              </Link>
              <Button 
                className="bg-dental-purple hover:bg-dental-purple/90 flex items-center gap-2"
                onClick={() => {
                  setIsAppointmentModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                <Phone size={18} />
                <span>{t('bookAppointment')}</span>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Appointment Modal */}
      <AppointmentModal 
        isOpen={isAppointmentModalOpen} 
        onClose={() => setIsAppointmentModalOpen(false)} 
      />
    </header>
  );
};

export default Navbar;
