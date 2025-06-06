
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Video } from 'lucide-react';
import PropertyModal from './PropertyModal';

const FeaturedSection = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredProperties = [
    {
      id: 1,
      title: "Cabane dans les arbres - Périgord",
      location: "Dordogne, France",
      price: "180€",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Cabane perchée",
      capacity: "2 personnes",
      featured: true,
      description: "Une expérience unique dans les hauteurs, cette cabane perchée offre une vue imprenable sur la forêt du Périgord. Réveillez-vous au chant des oiseaux et endormez-vous sous les étoiles.",
      amenities: ['Vue forêt', 'Petit-déjeuner inclus', 'Terrasse privée', 'Accès spa'],
      videoUrl: "#"
    },
    {
      id: 2,
      title: "Loft industriel avec vue panoramique",
      location: "Lyon, France",
      price: "250€",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Loft",
      capacity: "4 personnes",
      featured: false,
      description: "Un loft industriel au cœur de Lyon avec une vue panoramique sur la ville. Architecture moderne et équipements haut de gamme.",
      amenities: ['Vue ville', 'Cuisine moderne', 'Balcon', 'Parking'],
      videoUrl: "#"
    },
    {
      id: 3,
      title: "Maison de verre contemporaine",
      location: "Provence, France",
      price: "320€",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Maison d'architecte",
      capacity: "6 personnes",
      featured: true,
      description: "Une œuvre architecturale unique en Provence, cette maison de verre offre une immersion totale dans le paysage méditerranéen.",
      amenities: ['Piscine privée', 'Jardin', 'Vue montagne', 'Design unique'],
      videoUrl: "#"
    },
    {
      id: 4,
      title: "Tiny house au bord de l'eau",
      location: "Bretagne, France",
      price: "120€",
      image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Tiny house",
      capacity: "2 personnes",
      featured: false,
      description: "Une tiny house moderne au bord de l'océan Atlantique. Minimalisme et confort dans un cadre naturel exceptionnel.",
      amenities: ['Vue océan', 'Accès plage', 'Kayak inclus', 'Terrasse'],
      videoUrl: "#"
    }
  ];

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos coups de cœur</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Découvrez nos logements d'exception filmés en vidéo pour une immersion totale avant votre séjour
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {featuredProperties.map((property) => (
          <div 
            key={property.id} 
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            onClick={() => handlePropertyClick(property)}
          >
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 space-y-2">
                {property.featured && (
                  <Badge className="bg-primary text-primary-foreground">
                    Coup de cœur
                  </Badge>
                )}
                <Badge variant="secondary" className="block w-fit">
                  {property.type}
                </Badge>
              </div>
              
              {/* Video Play Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                  <Play className="h-6 w-6 text-primary ml-1" />
                </div>
              </div>
              
              {/* Video Badge */}
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary/90 text-white flex items-center gap-1">
                  <Video className="h-3 w-3" />
                  Vidéo
                </Badge>
              </div>
              
              <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1">
                <span className="font-semibold text-lg">{property.price}</span>
                <span className="text-sm text-muted-foreground">/nuit</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                {property.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-1">{property.location}</p>
              <p className="text-muted-foreground text-sm">{property.capacity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button size="lg" variant="outline">
          Voir tous nos logements
        </Button>
      </div>

      <PropertyModal 
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default FeaturedSection;
