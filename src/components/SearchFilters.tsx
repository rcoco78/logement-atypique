import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { featuredProperties } from './FeaturedSection';

const SearchFilters = () => {
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    capacity: '',
    priceRange: ''
  });

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

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (filters.location) params.append('location', filters.location);
    if (filters.type) params.append('type', filters.type);
    if (filters.capacity) params.append('capacity', filters.capacity);
    if (filters.priceRange) params.append('priceRange', filters.priceRange);
    navigate(`/logements?${params.toString()}`);
  };

  return (
    <div className="bg-background border border-border rounded-lg shadow-lg p-6 -mt-12 mx-4 md:mx-8 lg:mx-16 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
        {/* Destination Toggle */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            Destination
          </label>
          <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Choisissez une destination" />
            </SelectTrigger>
            <SelectContent>
              {destinationOptions.map((dest: string) => (
                <SelectItem key={dest} value={dest}>
                  {dest}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            Type de logement
          </label>
          <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
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
          <Select value={filters.capacity} onValueChange={(value) => setFilters({ ...filters, capacity: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Capacité" />
            </SelectTrigger>
            <SelectContent>
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
          <Select value={filters.priceRange} onValueChange={(value) => setFilters({ ...filters, priceRange: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Prix" />
            </SelectTrigger>
            <SelectContent>
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
