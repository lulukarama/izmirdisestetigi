
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import BlogHero from "@/components/BlogHero";
import BlogGrid from "@/components/BlogGrid";
import BlogSidebar from "@/components/BlogSidebar";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const BlogPage = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    // Add fade-in animation to content sections
    const elements = document.querySelectorAll('.animate-fade-in');
    elements.forEach(element => {
      element.classList.remove('opacity-0');
    });

    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main className="pt-28 pb-16">
        <BlogHero />
        
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Blog Posts Grid */}
            <div className="w-full lg:w-2/3 animate-fade-in opacity-0">
              <BlogGrid />
              
              {/* Pagination */}
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="w-full lg:w-1/3 animate-fade-in opacity-0">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default BlogPage;
