
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BlogGrid = () => {
  const { t } = useLanguage();

  // Expanded mock data for blog page - would typically come from an API
  const blogPosts = [
    {
      id: 1,
      title: "Latest Advances in Dental Implant Technology",
      excerpt: "Discover how modern dental implant procedures are revolutionizing tooth replacement with minimal recovery time.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      date: "2024-04-20",
      category: "Dental Technology"
    },
    {
      id: 2,
      title: "Tips for Maintaining Optimal Oral Health",
      excerpt: "Learn the essential daily habits and professional recommendations for keeping your smile bright and healthy.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      date: "2024-04-18",
      category: "Oral Health"
    },
    {
      id: 3,
      title: "The Role of AI in Modern Dentistry",
      excerpt: "Explore how artificial intelligence is transforming dental diagnostics and treatment planning.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      date: "2024-04-15",
      category: "Innovation"
    },
    {
      id: 4,
      title: "Children's Dental Care: What Parents Should Know",
      excerpt: "Key insights into pediatric dental care and how to establish good oral hygiene habits from a young age.",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
      date: "2024-04-10",
      category: "Pediatric Dentistry"
    },
    {
      id: 5,
      title: "The Connection Between Oral Health and Overall Wellness",
      excerpt: "Understanding the crucial link between your dental health and your body's overall well-being.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
      date: "2024-04-05",
      category: "Wellness"
    },
    {
      id: 6,
      title: "Cosmetic Dentistry Trends in 2024",
      excerpt: "Discover the latest trends in cosmetic dentistry that are helping people achieve their dream smiles.",
      image: "https://images.unsplash.com/photo-1571748982800-fa51082c2224",
      date: "2024-04-02",
      category: "Cosmetic Dentistry"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogPosts.map((post) => (
        <Card key={post.id} className="group hover:shadow-custom-hover transition-all duration-300 flex flex-col h-full">
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute top-2 right-2 bg-dental-purple text-white text-xs px-2 py-1 rounded">
              {post.category}
            </div>
          </div>
          <CardHeader>
            <CardTitle className="text-xl mb-2 line-clamp-2">{post.title}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
          </CardContent>
          <CardFooter>
            <Link to={`/blog/${post.id}`}>
              <Button variant="ghost" className="text-dental-purple hover:text-dental-purple/90 p-0 flex items-center gap-2">
                {t('readMore')} <ArrowRight size={16} />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default BlogGrid;
