
import { useState } from 'react';
import { Search, MapPin, Users, Filter, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import PropertyModal from '@/components/PropertyModal';

const Logements = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    region: '',
    capacity: '',
    priceRange: ''
  });

  const allProperties = [
    {
      id: 1,
      title: "Cabane suspendue dans les Vosges",
      location: "Vosges, France",
      price: "180€",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Cabane perchée",
      capacity: "2 personnes",
      featured: true,
      hasVideo: true,
      description: "Une expérience unique au cœur de la forêt vosgienne. Cette cabane perchée à 8 mètres du sol offre une vue imprenable sur la canopée.",
      amenities: ["Spa privatif", "Vue panoramique", "Petit-déjeuner inclus", "Wifi"],
      fullImages: [
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      id: 2,
      title: "Tiny house flottante en Bretagne",
      location: "Morbihan, France", 
      price: "220€",
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c73a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Habitat flottant",
      capacity: "3 personnes",
      featured: false,
      hasVideo: true,
      description: "Naviguez sur les eaux calmes du Golfe du Morbihan dans cette tiny house flottante.",
      amenities: ["Navigation libre", "Cuisine équipée", "Terrasse privée", "Annexe"],
      fullImages: [
        "https://images.unsplash.com/photo-1520637836862-4d197d17c73a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      id: 3,
      title: "Yourte mongole authentique",
      location: "Cévennes, France",
      price: "140€", 
      image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Yourte traditionnelle",
      capacity: "4 personnes",
      featured: true,
      hasVideo: false,
      description: "Immersion totale dans la culture nomade au cœur du Parc National des Cévennes.",
      amenities: ["Poêle à bois", "Toilettes sèches", "Douche solaire", "Randonnée"],
      fullImages: [
        "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      id: 4,
      title: "Dôme géodésique transparent",
      location: "Provence, France",
      price: "280€",
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Dôme design",
      capacity: "2 personnes", 
      featured: true,
      hasVideo: true,
      description: "Dormez sous les étoiles dans ce dôme géodésique transparent au milieu des lavandes de Provence.",
      amenities: ["Vue 360°", "Climatisation", "Jacuzzi extérieur", "Petit-déjeuner"],
      fullImages: [
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      id: 5,
      title: "Maison troglodyte rénovée",
      location: "Loire, France",
      price: "195€",
      image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Habitat troglodyte",
      capacity: "4 personnes",
      featured: false,
      hasVideo: true,
      description: "Découvrez l'art de vivre dans la roche dans cette maison troglodyte entièrement rénovée.",
      amenities: ["Fraîcheur naturelle", "Cave à vin", "Terrasse panoramique", "Parking"],
      fullImages: [
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      id: 6,
      title: "Phare transformé en logement",
      location: "Finistère, France",
      price: "350€",
      image: "https://images.unsplash.com/photo-1552146304-2d3ac4ad6b38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Phare habitable",
      capacity: "6 personnes",
      featured: true,
      hasVideo: true,
      description: "Vivez l'expérience unique d'un gardien de phare dans ce monument historique transformé.",
      amenities: ["Vue mer 360°", "Escalier historique", "Cuisine panoramique", "Accès privé"],
      fullImages: [
        "https://images.unsplash.com/photo-1552146304-2d3ac4ad6b38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Nos logements d'exception</h1>
          <p className="text-xl text-muted-foreground text-center mb-8">
            Chaque lieu est sélectionné avec passion et filmé par notre équipe
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher par lieu, type de logement..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filtres :</span>
            </div>
            
            <select 
              className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
            >
              <option value="">Tous types</option>
              <option value="cabane">Cabanes</option>
              <option value="tiny-house">Tiny houses</option>
              <option value="yourte">Yourtes</option>
              <option value="dome">Dômes</option>
              <option value="phare">Phares</option>
              <option value="troglodyte">Troglodytes</option>
            </select>

            <select 
              className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
              value={filters.region}
              onChange={(e) => setFilters({...filters, region: e.target.value})}
            >
              <option value="">Toutes régions</option>
              <option value="bretagne">Bretagne</option>
              <option value="provence">Provence</option>
              <option value="vosges">Vosges</option>
              <option value="loire">Loire</option>
              <option value="cevennes">Cévennes</option>
            </select>

            <select 
              className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
              value={filters.capacity}
              onChange={(e) => setFilters({...filters, capacity: e.target.value})}
            >
              <option value="">Toutes capacités</option>
              <option value="2">2 personnes</option>
              <option value="4">4 personnes</option>
              <option value="6">6+ personnes</option>
            </select>

            <select 
              className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
              value={filters.priceRange}
              onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
            >
              <option value="">Tous prix</option>
              <option value="0-150">Moins de 150€</option>
              <option value="150-250">150€ - 250€</option>
              <option value="250+">Plus de 250€</option>
            </select>

            <Button variant="outline" size="sm" onClick={() => setFilters({type: '', region: '', capacity: '', priceRange: ''})}>
              Réinitialiser
            </Button>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProperties.map((property) => (
              <Card 
                key={property.id} 
                className="group cursor-pointer card-hover border-border overflow-hidden"
                onClick={() => setSelectedProperty(property)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Badges overlay */}
                  <div className="absolute top-4 left-4 space-y-2">
                    {property.featured && (
                      <Badge className="bg-primary text-primary-foreground shadow-lg">
                        ✨ Coup de cœur
                      </Badge>
                    )}
                    {property.hasVideo && (
                      <Badge variant="secondary" className="bg-background/90 text-foreground shadow-lg video-badge flex items-center gap-1">
                        <Play className="h-3 w-3" />
                        Vidéo
                      </Badge>
                    )}
                  </div>

                  {/* Price overlay */}
                  <div className="absolute bottom-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                    <span className="font-bold text-lg text-primary">{property.price}</span>
                    <span className="text-sm text-muted-foreground">/nuit</span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-background/90 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {property.title}
                      </h3>
                      <Badge variant="outline" className="border-primary/20 text-primary text-xs shrink-0">
                        {property.type}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin className="h-4 w-4 mr-1 shrink-0" />
                      {property.location}
                    </div>
                    
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Users className="h-4 w-4 mr-1 shrink-0" />
                      {property.capacity}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Charger plus de logements
            </Button>
          </div>
        </div>
      </section>

      {/* Modal */}
      <PropertyModal 
        property={selectedProperty} 
        onClose={() => setSelectedProperty(null)} 
      />
    </div>
  );
};

export default Logements;
