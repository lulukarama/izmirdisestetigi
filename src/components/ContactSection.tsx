
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import AppointmentForm from "./AppointmentForm";
import { useLanguage } from "@/context/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-dental-purple font-medium mb-2">{t('contactUs')}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('getInTouch')}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('contactDescription')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-xl shadow-custom p-6 lg:p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6">{t('contactInfo')}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-dental-purple/10 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-dental-purple" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{t('location')}</h4>
                    <p className="text-gray-600">
                      123 Dental Care Street<br/>
                      Izmir, Turkey 35000
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-dental-green/10 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-dental-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{t('phone')}</h4>
                    <p className="text-gray-600">
                      +90 (232) 123-4567<br/>
                      +90 (532) 987-6543
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-dental-blue/10 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-dental-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{t('email')}</h4>
                    <p className="text-gray-600">
                      info@izmirdisestetigi.com<br/>
                      appointments@izmirdisestetigi.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-dental-orange/10 p-3 rounded-lg mr-4">
                    <Clock className="h-6 w-6 text-dental-orange" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{t('workingHours')}</h4>
                    <div className="grid grid-cols-2 gap-2 text-gray-600">
                      <div>{t('monday')}</div>
                      <div>9:00 AM - 7:00 PM</div>
                      <div>{t('saturday')}</div>
                      <div>9:00 AM - 5:00 PM</div>
                      <div>{t('sunday')}</div>
                      <div>{t('closed')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="bg-white rounded-xl shadow-custom p-1 h-[300px] overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d196509.31498738193!2d27.021773937804798!3d38.36063806235455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd862a762cacd%3A0x628cbba1a59ce8fe!2zxLB6bWlyLCBUdXJrZXk!5e0!3m2!1sen!2sus!4v1649855398260!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          
          {/* Appointment Form */}
          <div>
            <AppointmentForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
