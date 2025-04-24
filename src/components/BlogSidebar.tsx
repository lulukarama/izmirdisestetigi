
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const BlogSidebar = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const categories = [
    { name: "Dental Technology", count: 5 },
    { name: "Oral Health", count: 8 },
    { name: "Cosmetic Dentistry", count: 4 },
    { name: "Pediatric Dentistry", count: 3 },
    { name: "Innovation", count: 2 },
    { name: "Wellness", count: 6 }
  ];

  const recentPosts = [
    {
      id: 1,
      title: "Latest Advances in Dental Implant Technology",
      date: "2024-04-20"
    },
    {
      id: 2,
      title: "Tips for Maintaining Optimal Oral Health",
      date: "2024-04-18"
    },
    {
      id: 3,
      title: "The Role of AI in Modern Dentistry",
      date: "2024-04-15"
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search for:", searchTerm);
    // Here you would typically handle the search logic
  };

  return (
    <div className="space-y-8">
      {/* Search Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{t('search')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder={t('searchBlog')}
              className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-dental-purple"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" variant="outline" size="icon">
              <Search size={18} />
              <span className="sr-only">{t('search')}</span>
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Categories Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{t('categories')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.name} className="flex justify-between items-center">
                <Link to="#" className="text-gray-700 hover:text-dental-purple transition-colors">
                  {category.name}
                </Link>
                <span className="text-sm bg-gray-100 text-gray-600 px-2 rounded-full">
                  {category.count}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Recent Posts Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{t('recentPosts')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <Link to={`/blog/${post.id}`} className="group">
                  <h4 className="text-sm font-medium text-gray-800 group-hover:text-dental-purple transition-colors">
                    {post.title}
                  </h4>
                  <span className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Newsletter Subscription */}
      <Card className="bg-gradient-to-r from-dental-purple/10 to-dental-blue/10">
        <CardHeader>
          <CardTitle className="text-xl">{t('newsletter')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">{t('newsletterDescription')}</p>
          <form className="space-y-4">
            <input
              type="email"
              placeholder={t('emailPlaceholder')}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-dental-purple"
              required
            />
            <Button type="submit" className="w-full bg-dental-purple hover:bg-dental-purple/90">
              {t('subscribe')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogSidebar;
