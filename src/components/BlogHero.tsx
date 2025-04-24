
import { useLanguage } from "@/context/LanguageContext";

const BlogHero = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-r from-dental-purple/10 via-dental-blue/10 to-dental-purple/10 py-16">
      <div className="container mx-auto px-4 text-center animate-fade-in opacity-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">{t('blogPageTitle')}</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          {t('blogPageSubtitle')}
        </p>
      </div>
    </section>
  );
};

export default BlogHero;
