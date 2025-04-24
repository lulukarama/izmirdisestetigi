import { useState, useRef, useEffect } from "react";
import TestimonialCard from "./TestimonialCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

const TestimonialsSection = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  const testimonials = [
    {
      id: 1,
      name: "Jennifer Smith",
      comment: "My experience with this dental clinic has been excellent. The staff is friendly and professional, and Dr. Johnson completely transformed my smile. I couldn't be happier with the results!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Roberts",
      comment: "I used to be terrified of dentists, but this team made me feel completely comfortable. The procedures were painless and the results are amazing. I now look forward to my dental visits!",
      rating: 5
    },
    {
      id: 3,
      name: "Sarah Thompson",
      comment: "The orthodontic treatment I received was top-notch. Dr. Chen was attentive to all my concerns and the office staff was always helpful with insurance matters and scheduling.",
      rating: 4
    },
    {
      id: 4,
      name: "David Wilson",
      comment: "I had severe dental issues and was in a lot of pain. The emergency service was prompt and Dr. Williams performed my root canal with such expertise that I barely felt anything. Highly recommended!",
      rating: 5
    },
    {
      id: 5,
      name: "Emily Davis",
      comment: "The children's dentistry here is exceptional. My kids used to be scared of dental visits, but now they actually look forward to them! The pediatric dentist is wonderful with children.",
      rating: 5
    },
    {
      id: 6,
      name: "Robert Johnson",
      comment: "I've been coming here for years and have always received excellent care. The hygienists are thorough yet gentle, and the dentists are knowledgeable and explain everything clearly.",
      rating: 4
    }
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (!testimonialsRef.current) return;
    
    const scrollAmount = testimonialsRef.current.clientWidth;
    const maxIndex = Math.ceil(testimonials.length / 2) - 1;
    
    if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'right' && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  useEffect(() => {
    if (!testimonialsRef.current) return;
    
    const scrollAmount = testimonialsRef.current.clientWidth;
    testimonialsRef.current.scrollTo({
      left: currentIndex * scrollAmount,
      behavior: 'smooth'
    });
  }, [currentIndex]);

  return (
    <section id="testimonials" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-dental-purple font-medium mb-2">{t('testimonialsSection')}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('testimonialsTitle')}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('testimonialsDescription')}
          </p>
        </div>
        
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-10 md:block hidden">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white shadow-md"
              onClick={() => handleScroll('left')}
              disabled={currentIndex === 0}
            >
              <ArrowLeft size={20} />
            </Button>
          </div>
          
          <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10 md:block hidden">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white shadow-md"
              onClick={() => handleScroll('right')}
              disabled={currentIndex >= Math.ceil(testimonials.length / 2) - 1}
            >
              <ArrowRight size={20} />
            </Button>
          </div>
          
          {/* Testimonials Slider */}
          <div 
            ref={testimonialsRef}
            className="overflow-x-auto scrollbar-none pb-8 -mx-4 px-4 snap-x snap-mandatory scroll-smooth"
          >
            <div className="flex flex-nowrap gap-6" style={{ width: `${Math.ceil(testimonials.length / 2) * 100}%` }}>
              {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, groupIndex) => (
                <div key={groupIndex} className="w-full flex-shrink-0 snap-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials
                      .slice(groupIndex * 2, groupIndex * 2 + 2)
                      .map(testimonial => (
                        <TestimonialCard
                          key={testimonial.id}
                          name={testimonial.name}
                          comment={testimonial.comment}
                          rating={testimonial.rating}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="flex justify-center gap-2 mt-8 md:hidden">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full" 
              onClick={() => handleScroll('left')}
              disabled={currentIndex === 0}
            >
              <ArrowLeft size={20} />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full" 
              onClick={() => handleScroll('right')}
              disabled={currentIndex >= Math.ceil(testimonials.length / 2) - 1}
            >
              <ArrowRight size={20} />
            </Button>
          </div>
          
          {/* Dots Navigation */}
          <div className="flex justify-center gap-1.5 mt-6">
            {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  currentIndex === index ? "bg-dental-purple w-6" : "bg-gray-300"
                )}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
