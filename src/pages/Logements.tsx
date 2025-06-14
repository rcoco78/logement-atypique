import FeaturedSection, { featuredProperties } from '@/components/FeaturedSection';
import SearchFilters from '@/components/SearchFilters';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

const Logements = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const location = useLocation();

  // On filtre les logements comme dans FeaturedSection
  const params = new URLSearchParams(location.search);
  const filterByParams = (property) => {
    if (params.get('type') && params.get('type') !== 'Tous les types') {
      if (property.type !== params.get('type')) return false;
    }
    const locationsParam = params.get('locations');
    if (locationsParam && locationsParam.trim() !== '') {
      const selectedLocations = locationsParam.split(',').map((l) => l.trim().toLowerCase());
      const propertyDestination = property.location.split(',')[0].trim().toLowerCase();
      if (!selectedLocations.includes(propertyDestination)) return false;
    }
    if (params.get('capacity') && params.get('capacity') !== '') {
      const filterCap = Number(params.get('capacity'));
      let propCap = property.capacity;
      if (typeof propCap === 'string') {
        const match = propCap.match(/\d+/);
        propCap = match ? Number(match[0]) : NaN;
      }
      if (typeof propCap !== 'number' || isNaN(propCap) || propCap !== filterCap) return false;
    }
    if (params.get('priceRange') && params.get('priceRange') !== '') {
      const price = parseInt(property.price);
      const range = params.get('priceRange');
      if (range === '< 100€' && price >= 100) return false;
      if (range === '100-200€' && (price < 100 || price > 200)) return false;
      if (range === '200-300€' && (price < 200 || price > 300)) return false;
      if (range === '300€+' && price < 300) return false;
    }
    return true;
  };
  const filteredProperties = featuredProperties.filter(filterByParams);
  // On veut afficher 7 logements + 1 card spéciale à chaque page
  const totalPages = Math.ceil(filteredProperties.length / 7);
  const logementsAffiches = Math.min(filteredProperties.length, Math.ceil(visibleCount / 8) * 7);
  const toutAffiche = logementsAffiches >= filteredProperties.length;

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
        {/* Toggle Filtres Mobile */}
        <div className="mb-4 md:hidden flex justify-center px-4 max-w-7xl mx-auto">
          <Button variant="outline" onClick={() => setShowFilters((v) => !v)}>
            {showFilters ? 'Masquer les filtres' : 'Filtres'}
          </Button>
        </div>
        {/* Filtres : visible en desktop, toggle en mobile */}
        <div className={`mb-12 ${showFilters ? '' : 'hidden'} md:block`}>
          <SearchFilters />
        </div>
        {/* Section logements (à modifier pour insérer la card spéciale) */}
        <FeaturedSection limit={visibleCount} />
        {/* Bouton Voir plus */}
        {!toutAffiche && (
          <div className="flex justify-center mt-8">
            <Button 
              size="lg" 
              variant="outline" 
              className="w-[90%] max-w-xs md:max-w-md text-lg mx-auto"
              onClick={() => setVisibleCount((c) => c + 8)}
            >
              Voir plus
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Logements;
