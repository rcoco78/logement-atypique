import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SearchFilters from '@/components/SearchFilters';
import FeaturedSection from '@/components/FeaturedSection';
import StatsSection from '@/components/StatsSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <main className="py-16 px-4 max-w-7xl mx-auto">
        <SearchFilters />
        <FeaturedSection limit={4} />
        <StatsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
