
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  comment: string;
  rating: number;
  image?: string;
}

const TestimonialCard = ({ name, comment, rating, image }: TestimonialCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-custom">
      {/* Rating Stars */}
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            size={18} 
            className={i < rating ? "text-dental-orange fill-dental-orange" : "text-gray-300"} 
          />
        ))}
      </div>
      
      {/* Testimonial Text */}
      <p className="text-gray-700 mb-6 italic">"{comment}"</p>
      
      {/* Client Info */}
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-full overflow-hidden mr-4 bg-dental-purple/10 flex items-center justify-center">
          {image ? (
            <img 
              src={image} 
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-dental-purple font-bold text-lg">
              {name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-xs text-gray-500">Verified Patient</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
