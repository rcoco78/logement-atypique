import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeaturedSection from '@/components/FeaturedSection';
import SearchFilters from '@/components/SearchFilters';

const Logements = () => {
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    capacity: '',
    priceRange: ''
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16">
        <div className="text-center mb-8 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nos logements atypiques
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez notre sélection de logements d'exception, chacun filmé en vidéo pour vous offrir une immersion totale avant votre réservation.
          </p>
        </div>
        
        <SearchFilters filters={filters} setFilters={setFilters} />
        <FeaturedSection filters={filters} />
      </main>

      <Footer />
    </div>
  );
};

export default Logements;
