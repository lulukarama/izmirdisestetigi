
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const { t } = useLanguage();

  // Temporary mock data - would typically come from an API
  const blogPosts = [
    {
      id: 1,
      title: "Latest Advances in Dental Implant Technology",
      excerpt: "Discover how modern dental implant procedures are revolutionizing tooth replacement with minimal recovery time.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      date: "2024-04-20"
    },
    {
      id: 2,
      title: "Tips for Maintaining Optimal Oral Health",
      excerpt: "Learn the essential daily habits and professional recommendations for keeping your smile bright and healthy.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      date: "2024-04-18"
    },
    {
      id: 3,
      title: "The Role of AI in Modern Dentistry",
      excerpt: "Explore how artificial intelligence is transforming dental diagnostics and treatment planning.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      date: "2024-04-15"
    }
  ];

  return (
    <section className="section-padding animate-fade-in opacity-0" id="blog">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('latestBlogPosts')}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('blogSectionDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-custom-hover transition-all duration-300">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{post.excerpt}</p>
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
      </div>
    </section>
  );
};

export default BlogSection;
