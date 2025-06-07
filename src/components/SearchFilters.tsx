import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { featuredProperties } from './FeaturedSection';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const SearchFilters = () => {
  // On passe location en tableau pour la sélection multiple
  const [filters, setFilters] = useState({
    locations: [], // tableau de destinations sélectionnées
    type: '',
    capacity: '',
    priceRange: ''
  });

  const locationHook = useLocation();
  const isHome = locationHook.pathname === '/';

  // Récupérer dynamiquement les types et régions à partir des logements
  const accommodationTypes = Array.from(new Set(featuredProperties.map((p) => p.type))).filter(Boolean);
  const regionOptions = Array.from(new Set(featuredProperties.map((p) => {
    const loc = p.location.split(',').pop();
    return loc ? loc.trim() : '';
  }))).filter(Boolean);

  // Capacité dynamique à partir des logements (extraction du nombre depuis la string)
  const capacityOptions = Array.from(new Set(featuredProperties.map((p) => {
    if (typeof p.capacity === 'number') return p.capacity;
    if (typeof p.capacity === 'string') {
      const match = p.capacity.match(/\d+/);
      return match ? Number(match[0]) : NaN;
    }
    return NaN;
  }))).filter((n) => !isNaN(n) && n > 0).sort((a, b) => a - b);
  const priceRanges = ['< 100€', '100-200€', '200-300€', '300€+'];

  // Récupérer dynamiquement les destinations à partir des logements (avant la virgule)
  const destinationOptions = Array.from(new Set(featuredProperties.map((p) => {
    const dest = p.location.split(',')[0];
    return dest ? dest.trim() : '';
  }))).filter(Boolean);

  const navigate = useNavigate();

  // Gestion de la sélection multiple pour la destination
  const handleDestinationChange = (dest: string) => {
    if (filters.locations.includes(dest)) {
      setFilters({ ...filters, locations: filters.locations.filter((d) => d !== dest) });
    } else {
      setFilters({ ...filters, locations: [...filters.locations, dest] });
    }
  };

  // Gestion du bouton "Toutes les destinations"
  const allSelected = filters.locations.length === destinationOptions.length;
  const handleSelectAllDestinations = () => {
    if (allSelected) {
      setFilters({ ...filters, locations: [] });
    } else {
      setFilters({ ...filters, locations: [...destinationOptions] });
    }
  };

  // Gestion des autres filtres avec option "Tous"
  const handleSelectChange = (key: 'type' | 'capacity' | 'priceRange', value: string) => {
    if (filters[key] === value || value === 'all') {
      setFilters({ ...filters, [key]: '' });
    } else {
      setFilters({ ...filters, [key]: value });
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (filters.locations.length > 0) params.append('locations', filters.locations.join(','));
    if (filters.type) params.append('type', filters.type);
    if (filters.capacity) params.append('capacity', filters.capacity);
    if (filters.priceRange) params.append('priceRange', filters.priceRange);
    navigate(`/logements?${params.toString()}`);
  };

  return (
    <div className={`bg-background border border-border rounded-lg shadow-lg p-6 mx-4 md:mx-8 lg:mx-16 relative z-10 ${isHome ? '-mt-12' : 'mt-0'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
        {/* Destination Multiple ToggleGroup */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            Destination
          </label>
          <ToggleGroup
            type="multiple"
            value={filters.locations}
            onValueChange={(values) => setFilters({ ...filters, locations: values })}
            className="flex flex-wrap gap-2 bg-muted/30 rounded-md p-3 border"
          >
            <ToggleGroupItem
              value="all"
              className={`px-3 py-2 rounded-md text-sm font-medium border ${filters.locations.length === destinationOptions.length ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground'}`}
              onClick={() => {
                if (filters.locations.length === destinationOptions.length) {
                  setFilters({ ...filters, locations: [] });
                } else {
                  setFilters({ ...filters, locations: [...destinationOptions] });
                }
              }}
            >
              Toutes les destinations
            </ToggleGroupItem>
            {destinationOptions.map((dest: string) => (
              <ToggleGroupItem
                key={dest}
                value={dest}
                className="px-3 py-2 rounded-md text-sm font-medium border"
              >
                {dest}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            Type de logement
          </label>
          <Select value={filters.type} onValueChange={(value) => handleSelectChange('type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              {accommodationTypes.map((type: string) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Capacité Toggle */}
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            Capacité
          </label>
          <Select value={filters.capacity} onValueChange={(value) => handleSelectChange('capacity', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Capacité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              {capacityOptions.map((n: number) => (
                <SelectItem key={n} value={String(n)}>
                  {n} {n > 1 ? 'personnes' : 'personne'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            Budget
          </label>
          <Select value={filters.priceRange} onValueChange={(value) => handleSelectChange('priceRange', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Prix" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              {priceRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Button - dans la grille */}
        <div className="col-span-1 lg:col-span-1 flex justify-center lg:justify-end mt-4 lg:mt-0">
          <Button size="lg" className="px-12 w-full lg:w-auto" onClick={handleSearch}>
            Rechercher
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
