import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const SearchFilters = () => {
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    capacity: '',
    priceRange: ''
  });

  const accommodationTypes = [
    'Tous les types',
    'Cabane perchée',
    'Loft d\'architecte',
    'Maison de verre',
    'Bulle transparente',
    'Roulotte',
    'Tiny house',
    'Chalet design'
  ];

  const capacityOptions = ['1-2 personnes', '3-4 personnes', '5-6 personnes', '7+ personnes'];
  const priceRanges = ['< 100€', '100-200€', '200-300€', '300€+'];

  return (
    <div className="bg-background border border-border rounded-lg shadow-lg p-6 -mt-12 mx-4 md:mx-8 lg:mx-16 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
        {/* Location */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            Destination
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Où souhaitez-vous aller ?"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="pl-10"
            />
          </div>
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
              {accommodationTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Capacity */}
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            Voyageurs
          </label>
          <Select value={filters.capacity} onValueChange={(value) => setFilters({ ...filters, capacity: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Capacité" />
            </SelectTrigger>
            <SelectContent>
              {capacityOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
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
          <Button size="lg" className="px-12 w-full lg:w-auto">
            Rechercher
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
