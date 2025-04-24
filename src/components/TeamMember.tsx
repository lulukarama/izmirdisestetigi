
import { Facebook, Instagram, Linkedin } from "lucide-react";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

const TeamMember = ({ name, role, image, social }: TeamMemberProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-custom transition-all hover:shadow-custom-hover duration-300">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full aspect-[3/4] object-cover object-center transition-transform duration-500 hover:scale-105"
        />
        
        {/* Social Media */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-5">
          <div className="flex gap-4">
            {social.facebook && (
              <a href={social.facebook} className="text-white hover:text-dental-orange" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </a>
            )}
            {social.instagram && (
              <a href={social.instagram} className="text-white hover:text-dental-orange" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} className="text-white hover:text-dental-orange" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-dental-purple text-sm">{role}</p>
      </div>
    </div>
  );
};

export default TeamMember;
