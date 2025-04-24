import { useEffect, useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { Link, useLocation, useParams } from 'react-router-dom';
import { Home, Smile, Users, MessageSquare, Phone, BookOpen, Calendar, MessageCircle, Search, Tag, User, MessageCircleMore, ArrowRight, ChevronRight } from 'lucide-react';
import BlogRating from "@/components/BlogRating";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from "@/lib/utils";
import AppointmentModal from "@/components/AppointmentModal";

// Mock data - would typically come from an API
const blogPosts = [
  {
    id: 1,
    title: "Latest Advances in Dental Implant Technology",
    date: "2024-04-20",
    author: "Dr. Mehmet Yılmaz",
    commentCount: 12,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    content: `
      <h2>The Evolution of Dental Implants</h2>
      <p>Modern dental implant procedures have revolutionized the field of dentistry, offering patients a permanent solution for missing teeth that looks, feels, and functions just like natural teeth.</p>
      
      <h2>Advanced Technology in Implementation</h2>
      <p>With the advent of 3D printing and computer-guided surgery, dental implant procedures have become more precise and less invasive than ever before.</p>
      
      <h2>Recovery and Long-term Care</h2>
      <p>The recovery process has been significantly improved thanks to these technological advances, with many patients able to resume their normal activities within a few days.</p>
    `
  },
  {
    id: 2,
    title: "Tips for Maintaining Optimal Oral Health",
    date: "2024-04-18",
    author: "Dr. Ayşe Demir",
    commentCount: 8,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    content: `
      <h2>Daily Oral Hygiene Practices</h2>
      <p>Maintaining good oral health requires consistent daily practices. Brushing twice a day, flossing, and using mouthwash are essential habits for preventing dental issues.</p>
      
      <h2>Professional Dental Care</h2>
      <p>Regular dental check-ups and professional cleanings play a crucial role in maintaining optimal oral health and preventing serious dental problems.</p>
      
      <h2>Diet and Oral Health</h2>
      <p>Your diet significantly impacts your oral health. Learn which foods promote healthy teeth and which ones to avoid for better dental care.</p>
    `
  },
  {
    id: 3,
    title: "The Role of AI in Modern Dentistry",
    date: "2024-04-15",
    author: "Dr. Ali Kaya",
    commentCount: 15,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    content: `
      <h3>AI in Dental Diagnostics</h3>
      <br>
      <p>Artificial Intelligence (AI) is rapidly transforming the landscape of dental diagnostics. By leveraging advanced algorithms and machine learning models, AI systems can analyze dental X-rays, 3D scans, and patient records with exceptional accuracy. These technologies help dentists detect cavities, gum disease, root canal infections, and even oral cancers much earlier than traditional methods. This not only reduces the risk of human error but also allows for quicker interventions, potentially saving patients from more invasive and costly treatments down the line. Moreover, AI-powered diagnostic tools continue to learn and improve over time, making them increasingly reliable as they are exposed to more data. In busy dental practices, these systems serve as a second set of eyes, supporting dentists in making faster, evidence-based decisions.</p>
      
      <br>
      <h3>Treatment Planning with AI</h3>
      <br>
      <p>Beyond diagnostics, AI is playing a pivotal role in the planning and personalization of dental treatments. Using data from patient histories, 3D scans, and previous treatment outcomes, AI tools can simulate various treatment paths, assess potential outcomes, and recommend the most effective strategy for each patient.

For example, orthodontic treatments can now be customized using AI-driven simulations that predict how teeth will move over time, allowing for better-fitting braces or aligners and reducing the need for adjustments. Implant procedures also benefit, as AI helps determine optimal placement based on bone density and anatomical structure.

This level of precision reduces guesswork, increases the predictability of outcomes, and enhances the overall patient experience.</p>
      <br>
      <h3>Future of AI in Dentistry</h3>
      <br>
      <p>Looking ahead, the potential of AI in dentistry is virtually limitless. We're already seeing the development of smart dental assistants — AI bots that can communicate with patients, schedule appointments, follow up with post-treatment care instructions, and even answer basic oral health questions through chat interfaces.

In the near future, AI could be integrated with augmented reality (AR) to assist in real-time during surgeries or complex procedures, offering suggestions and flagging concerns based on historical data. Predictive analytics may also become a cornerstone of preventative care, helping dentists anticipate issues before they arise by continuously monitoring patient data.

Additionally, AI may enhance dental practice management by optimizing appointment scheduling, automating administrative tasks, and analyzing business performance metrics to boost efficiency and profitability.</p>
    `
  }
];

const BlogPost = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { id } = useParams();
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  
  // Find the current blog post
  const post = blogPosts.find(p => p.id === Number(id));

  // If post not found, show 404
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Blog post not found</p>
          <Link to="/blog" className="text-dental-purple hover:text-dental-purple/90 underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Mock data for recent posts and categories
  const recentPosts = [
    { id: 1, title: "Latest Advances in Dental Implant Technology", date: "2024-04-20" },
    { id: 2, title: "Tips for Maintaining Optimal Oral Health", date: "2024-04-18" },
    { id: 3, title: "The Role of AI in Modern Dentistry", date: "2024-04-15" },
  ];

  const categories = [
    { name: "Dental Technology", count: 5 },
    { name: "Oral Health", count: 8 },
    { name: "Cosmetic Dentistry", count: 6 },
    { name: "Pediatric Dentistry", count: 4 },
    { name: "Dental Implants", count: 7 },
  ];

  useEffect(() => {
    // Add fade-in animation to content sections
    const elements = document.querySelectorAll('.animate-fade-in');
    elements.forEach(element => {
      element.classList.remove('opacity-0');
    });
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <main className="flex-1 pt-28">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 mb-8">
          <nav className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-dental-purple transition-colors">
              {t('home')}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to="/blog" className="hover:text-dental-purple transition-colors">
              {t('blog')}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900">{post.title}</span>
          </nav>
        </div>

        {/* Hero Image */}
        <div className="w-full h-[400px] relative animate-fade-in opacity-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-[800px] mx-auto animate-fade-in opacity-0">
            {/* Hero Section */}
            <div className="mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-gray-900">{post.title}</h1>
              
              {/* Post Meta Information */}
              <div className="flex items-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
            </time>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircleMore className="h-4 w-4" />
                  <span>{post.commentCount} comments</span>
                </div>
              </div>
              
              <div className="h-px bg-gray-200 w-full"></div>
            </div>
            
            <div 
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900
                prose-p:text-gray-700 prose-p:leading-[1.8] prose-p:text-lg prose-p:mb-8
                prose-h2:text-3xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:font-bold prose-h2:tracking-tight prose-h2:pt-8 prose-h2:border-t prose-h2:border-gray-200
                prose-h3:text-2xl prose-h3:mt-16 prose-h3:mb-6 prose-h3:font-semibold
                prose-img:rounded-xl prose-img:shadow-lg prose-img:my-16
                prose-blockquote:border-l-4 prose-blockquote:border-dental-purple prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:my-12 prose-blockquote:bg-gray-50 prose-blockquote:p-6 prose-blockquote:rounded-lg
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-a:text-dental-purple prose-a:no-underline hover:prose-a:underline
                prose-li:marker:text-dental-purple prose-li:my-3 prose-li:leading-relaxed
                prose-ul:my-8 prose-ol:my-8
                prose-figcaption:text-center prose-figcaption:text-gray-500 prose-figcaption:mt-4 prose-figcaption:text-sm"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="h-px bg-gray-200 w-full my-16"></div>

            <BlogRating postId="1" />

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mt-12 mb-16">
              <Button 
                className="w-full bg-dental-purple hover:bg-dental-purple/90 text-white flex items-center justify-center gap-2 h-12 text-lg"
                onClick={() => setIsAppointmentModalOpen(true)}
              >
                <Calendar className="h-5 w-5" />
                <span>{t('bookAppointment')}</span>
              </Button>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 h-12 text-lg"
                asChild
              >
                <a href="https://wa.me/your-whatsapp-number" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp</span>
                </a>
              </Button>
          </div>

            <div className="h-px bg-gray-200 w-full my-16"></div>

          {/* Comments Section */}
            <div className="mt-16 animate-fade-in opacity-0">
            <h3 className="text-2xl font-bold mb-8">{t('comments')}</h3>
            
              {/* Comment Form */}
              <div className="mb-12">
                <h4 className="text-xl font-semibold mb-8">Leave a Comment</h4>
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        className="w-full h-12 text-lg"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="w-full h-12 text-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                      Comment
                    </label>
                    <Textarea
                      id="comment"
                      placeholder="Write your comment here..."
                      className="w-full min-h-[200px] text-lg leading-relaxed"
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="bg-dental-purple hover:bg-dental-purple/90 text-white h-12 text-lg px-8"
                  >
                    Submit Comment
                  </Button>
                </form>
              </div>

            <p className="text-gray-600">{t('noComments')}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Sidebar */}
      <aside className="w-80 bg-white border-l border-gray-200 pt-28 hidden lg:block">
        <div className="sticky top-28 p-6 space-y-8">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10 h-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Navigation */}
          <nav className="space-y-0 border border-gray-200 rounded-lg overflow-hidden">
            <Link 
              to="/" 
              className={cn(
                "flex items-center p-3 border-b border-gray-200 last:border-b-0 text-white bg-dental-purple hover:bg-dental-purple/90 transition-all duration-200",
                location.pathname === '/' && "bg-dental-purple/90"
              )}
            >
              <span className="text-base font-medium">{t('home')}</span>
            </Link>
            <Link 
              to="/#services" 
              className="flex items-center p-3 border-b border-gray-200 last:border-b-0 text-white bg-dental-purple hover:bg-dental-purple/90 transition-all duration-200"
            >
              <span className="text-base font-medium">{t('services')}</span>
            </Link>
            <Link 
              to="/#team" 
              className="flex items-center p-3 border-b border-gray-200 last:border-b-0 text-white bg-dental-purple hover:bg-dental-purple/90 transition-all duration-200"
            >
              <span className="text-base font-medium">{t('ourTeam')}</span>
            </Link>
            <Link 
              to="/#testimonials" 
              className="flex items-center p-3 border-b border-gray-200 last:border-b-0 text-white bg-dental-purple hover:bg-dental-purple/90 transition-all duration-200"
            >
              <span className="text-base font-medium">{t('testimonials')}</span>
            </Link>
            <Link 
              to="/#contact" 
              className="flex items-center p-3 border-b border-gray-200 last:border-b-0 text-white bg-dental-purple hover:bg-dental-purple/90 transition-all duration-200"
            >
              <span className="text-base font-medium">{t('contact')}</span>
            </Link>
            <Link 
              to="/blog" 
              className={cn(
                "flex items-center p-3 border-b border-gray-200 last:border-b-0 text-white bg-dental-purple hover:bg-dental-purple/90 transition-all duration-200",
                location.pathname.startsWith('/blog') && "bg-dental-purple/90"
              )}
            >
              <span className="text-base font-medium">{t('blog')}</span>
            </Link>
          </nav>

          {/* Recent Posts */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.id}`}
                  className="block group"
                >
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-dental-purple transition-colors" />
                    <span className="text-sm font-medium text-gray-900 group-hover:text-dental-purple transition-colors">
                      {post.title}
                    </span>
                  </div>
                  <time className="text-xs text-gray-500 ml-6">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={`/blog?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 group transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-gray-400 group-hover:text-dental-purple" />
                    <span className="text-sm text-gray-700 group-hover:text-dental-purple">
                      {category.name}
                    </span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile WhatsApp Button */}
      <div className="fixed bottom-4 right-4 lg:hidden z-50">
        <Button 
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 h-auto"
          asChild
        >
          <a href="https://wa.me/your-whatsapp-number" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-6 w-6" />
          </a>
        </Button>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal 
        isOpen={isAppointmentModalOpen} 
        onClose={() => setIsAppointmentModalOpen(false)} 
      />
    </div>
  );
};

export default BlogPost;