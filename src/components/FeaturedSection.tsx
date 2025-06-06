
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, MapPin, Users } from 'lucide-react';
import { useState } from 'react';
import PropertyModal from './PropertyModal';

const FeaturedSection = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const featuredProperties = [
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
      description: "Une expérience unique au cœur de la forêt vosgienne. Cette cabane perchée à 8 mètres du sol offre une vue imprenable sur la canopée. Construite entièrement en bois local, elle allie confort moderne et authenticité.",
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
      description: "Naviguez sur les eaux calmes du Golfe du Morbihan dans cette tiny house flottante. Un concept unique alliant le charme de la navigation et le confort d'un hébergement atypique.",
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
      description: "Immersion totale dans la culture nomade au cœur du Parc National des Cévennes. Cette yourte authentique, importée de Mongolie, vous offre une nuit sous les étoiles dans un cadre préservé.",
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
      description: "Dormez sous les étoiles dans ce dôme géodésique transparent au milieu des lavandes de Provence. Une architecture futuriste pour une expérience sensorielle unique.",
      amenities: ["Vue 360°", "Climatisation", "Jacuzzi extérieur", "Petit-déjeuner"],
      fullImages: [
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ]
    }
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Nos lieux d'exception</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Chaque logement est soigneusement sélectionné et filmé par notre équipe pour vous garantir une expérience authentique
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {featuredProperties.map((property) => (
          <div 
            key={property.id} 
            className="group cursor-pointer card-hover"
            onClick={() => setSelectedProperty(property)}
          >
            <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3]">
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
                    Vidéo exclusive
                  </Badge>
                )}
              </div>

              {/* Type badge */}
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="bg-background/90 border-primary/20 text-foreground shadow-lg">
                  {property.type}
                </Badge>
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

            <div className="space-y-1">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                {property.title}
              </h3>
              <div className="flex items-center text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {property.location}
              </div>
              <div className="flex items-center text-muted-foreground text-sm">
                <Users className="h-4 w-4 mr-1" />
                {property.capacity}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          Découvrir tous nos logements
        </Button>
      </div>

      {/* Modal */}
      <PropertyModal 
        property={selectedProperty} 
        onClose={() => setSelectedProperty(null)} 
      />
    </section>
  );
};

export default FeaturedSection;
