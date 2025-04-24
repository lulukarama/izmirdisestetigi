import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface BlogRatingProps {
  postId: string;
  initialRating?: number;
}

const BlogRating = ({ postId, initialRating = 0 }: BlogRatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = async (value: number) => {
    try {
      // Here you would typically make an API call to save the rating
      setRating(value);
      toast.success('Thank you for your rating!');
    } catch (error) {
      toast.error('Failed to save rating. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 py-6 border-t border-b my-8">
      <h4 className="text-lg font-semibold text-gray-800">Rate this article</h4>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Button
            key={star}
            variant="ghost"
            size="icon"
            className="p-0 h-8 w-8"
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <Star
              className={`h-6 w-6 transition-colors ${
                (hoverRating || rating) >= star
                  ? 'fill-dental-purple text-dental-purple'
                  : 'text-gray-300'
              }`}
            />
          </Button>
        ))}
      </div>
      <p className="text-sm text-gray-500">
        {rating ? `You rated this ${rating} star${rating > 1 ? 's' : ''}` : 'Click to rate'}
      </p>
    </div>
  );
};

export default BlogRating; 