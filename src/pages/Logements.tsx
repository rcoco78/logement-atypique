import FeaturedSection from '@/components/FeaturedSection';
import SearchFilters from '@/components/SearchFilters';

const Logements = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-40 pb-16">
        <div className="text-center mb-8 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nos logements atypiques
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez notre sélection de logements d'exception, chacun filmé en vidéo pour vous offrir une immersion totale avant votre réservation.
          </p>
        </div>
        <div className="mb-12">
          <SearchFilters />
        </div>
        <FeaturedSection />
      </main>
    </div>
  );
};

export default Logements;
