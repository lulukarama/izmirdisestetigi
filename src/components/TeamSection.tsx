
import TeamMember from "./TeamMember";
import { useLanguage } from "@/context/LanguageContext";

const TeamSection = () => {
  const { t } = useLanguage();
  
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Emily Johnson",
      role: "Cosmetic Dentist",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2670&auto=format&fit=crop",
      social: {
        facebook: "#",
        instagram: "#",
        linkedin: "#"
      }
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Orthodontist",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2670&auto=format&fit=crop",
      social: {
        facebook: "#",
        instagram: "#",
        linkedin: "#"
      }
    },
    {
      id: 3,
      name: "Dr. Sarah Williams",
      role: "Oral Surgeon",
      image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=2670&auto=format&fit=crop",
      social: {
        facebook: "#",
        instagram: "#",
        linkedin: "#"
      }
    },
    {
      id: 4,
      name: "Dr. Robert Miller",
      role: "Periodontist",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2670&auto=format&fit=crop",
      social: {
        facebook: "#",
        instagram: "#",
        linkedin: "#"
      }
    }
  ];
  
  return (
    <section id="team" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-dental-purple font-medium mb-2">{t('ourSpecialists')}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('teamTitle')}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('teamDescription')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <TeamMember
              key={member.id}
              name={member.name}
              role={member.role}
              image={member.image}
              social={member.social}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
