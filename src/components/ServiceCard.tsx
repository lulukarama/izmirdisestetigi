
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const ServiceCard = ({ title, description, icon: Icon, color }: ServiceCardProps) => {
  const { t } = useLanguage();
  
  const bgColorClass = {
    purple: "bg-dental-purple/10",
    orange: "bg-dental-orange/10",
    green: "bg-dental-green/10",
    blue: "bg-dental-blue/10",
  }[color];
  
  const textColorClass = {
    purple: "text-dental-purple",
    orange: "text-dental-orange",
    green: "text-dental-green",
    blue: "text-dental-blue",
  }[color];

  return (
    <div className="bg-white p-6 rounded-xl shadow-custom transition-all hover:shadow-custom-hover hover:-translate-y-1 duration-300 flex flex-col h-full">
      <div className={cn("p-4 rounded-lg w-16 h-16 flex items-center justify-center mb-5", bgColorClass)}>
        <Icon size={32} className={textColorClass} />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 text-sm flex-grow">{description}</p>
      <a href="#" className={cn("inline-flex items-center mt-5 font-medium text-sm", textColorClass)}>
        {t('learnMoreLink')}
        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </div>
  );
};

export default ServiceCard;
