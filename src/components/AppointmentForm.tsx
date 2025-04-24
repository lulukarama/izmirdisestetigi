import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from "@/lib/supabase";

const AppointmentForm = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target as HTMLFormElement;
    const formData = {
      full_name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      service: (form.elements.namedItem('service') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      preferred_date: (form.elements.namedItem('date') as HTMLInputElement).value,
      status: 'pending'
    };

    try {
      const { error } = await supabase
        .from('appointments')
        .insert([formData]);

      if (error) throw error;

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success(t('appointmentSuccess'));
      
      // Reset form
      form.reset();
      
      // Reset submission state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting appointment:', error);
      toast.error('Failed to submit appointment. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-custom p-6 lg:p-8">
      <h3 className="text-2xl font-bold mb-6">{t('requestAppointment')}</h3>
      
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="h-16 w-16 bg-dental-green/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="text-dental-green h-8 w-8" />
          </div>
          <h4 className="text-xl font-semibold mb-2">{t('thankYou')}</h4>
          <p className="text-gray-600">
            {t('appointmentSuccess')}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                {t('fullName')}
              </label>
              <Input 
                id="name" 
                name="name"
                placeholder="John Doe" 
                required 
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                {t('email')}
              </label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="john@example.com" 
                required 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
                {t('phoneNumber')}
              </label>
              <Input 
                id="phone" 
                name="phone"
                placeholder="+90 (555) 000-0000" 
                required 
              />
            </div>
            <div>
              <label htmlFor="service" className="block mb-2 text-sm font-medium text-gray-700">
                {t('preferredService')}
              </label>
              <select 
                id="service"
                name="service"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                required
              >
                <option value="">{t('selectService')}</option>
                <option value="General Checkup">{t('generalCheckup')}</option>
                <option value="Teeth Whitening">{t('teethWhitening')}</option>
                <option value="Dental Implants">{t('dentalImplants')}</option>
                <option value="Cosmetic Dentistry">{t('cosmeticDentistry')}</option>
                <option value="Orthodontics">{t('orthodontics')}</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
              {t('message')}
            </label>
            <Textarea 
              id="message" 
              placeholder={t('messagePlaceholder')} 
              rows={4}
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-700">
              {t('preferredDate')}
            </label>
            <Input 
              id="date" 
              type="date" 
              required 
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-dental-purple hover:bg-dental-purple/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('submitting') : t('submitAppointment')}
          </Button>
        </form>
      )}
    </div>
  );
};

export default AppointmentForm;
