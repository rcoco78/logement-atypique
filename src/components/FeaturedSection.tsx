import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Video } from 'lucide-react';
import PropertyModal from './PropertyModal';
import { Link, useLocation } from 'react-router-dom';

interface Filters {
  location: string;
  type: string;
  capacity: string;
  priceRange: string;
}

const FeaturedSection = ({ limit, filters = { location: '', type: '', capacity: '', priceRange: '' } }: { limit?: number; filters?: Filters }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const featuredProperties = [
    {
      id: 1,
      title: "Tiny House sur la Côte Atlantique",
      location: "Île d'Oléron, France",
      price: "120€",
      image: "https://resize.elle.fr/article/var/plain_site/storage/images/deco/pieces/petits-espaces/tiny-house-des-petits-espaces-ultra-inspirants/tiny-house-sur-la-plage/93710601-1-fre-FR/Tiny-house-sur-la-plage.jpg",
      type: "Tiny house",
      capacity: "2 personnes",
      featured: true,
      description: "Une tiny house écologique à deux pas de l'océan, idéale pour une escapade minimaliste et ressourçante.",
      amenities: ['Vue mer', 'Terrasse', 'Cuisine équipée', 'Vélos à disposition'],
      videoUrl: "#"
    },
    {
      id: 2,
      title: "Yourte mongole authentique",
      location: "Massif central, France",
      price: "90€",
      image: "https://images.surferseo.art/f1ee3ca8-a6ab-4917-b0d5-e6b62c8f80e4.jpeg",
      type: "Yourte",
      capacity: "4 personnes",
      featured: false,
      description: "Vivez l'expérience nomade dans une yourte traditionnelle, au cœur de la nature sauvage.",
      amenities: ['Poêle à bois', 'Lits confortables', 'Randonnées', 'Ciel étoilé'],
      videoUrl: "#"
    },
    {
      id: 3,
      title: "Maison soucoupe futuriste",
      location: "Alpes, France",
      price: "200€",
      image: "https://www.neozone.org/blog/wp-content/uploads/2021/07/maison-soucoupe-volante-001.jpg",
      type: "Maison soucoupe",
      capacity: "3 personnes",
      featured: true,
      description: "Dormez dans une maison soucoupe au design unique, perchée face aux montagnes.",
      amenities: ['Vue panoramique', 'Design unique', 'Jacuzzi', 'Petit-déjeuner inclus'],
      videoUrl: "#"
    },
    {
      id: 4,
      title: "Château romantique du XIXe siècle",
      location: "Vallée de la Loire, France",
      price: "350€",
      image: "https://media.gqmagazine.fr/photos/67a4dae9329239d539417005/master/w_1600%2Cc_limit/piscine%2520.jpg",
      type: "Château",
      capacity: "8 personnes",
      featured: false,
      description: "Séjournez dans un château chargé d'histoire, entouré de jardins à la française.",
      amenities: ['Piscine', 'Parc', 'Salle de bal', 'Petit-déjeuner royal'],
      videoUrl: "#"
    },
    {
      id: 5,
      title: "Maison de hobbit rénové avec spa",
      location: "Normandie, France",
      price: "180€",
      image: "https://groupeconfiance.fr/wp-content/uploads/2023/12/logement-insolite.jpg",
      type: "Maison de hobbit",
      capacity: "6 personnes",
      featured: false,
      description: "Un ancien corps de ferme transformé en havre de paix, avec spa privatif et cheminée.",
      amenities: ['Spa', 'Cheminée', 'Grand jardin', 'Animaux acceptés'],
      videoUrl: "#"
    },
    {
      id: 6,
      title: "Cabane perchée avec vue sur lac",
      location: "Jura, France",
      price: "160€",
      image: "https://a0.muscache.com/im/pictures/49ee362b-b47f-49fa-b8c0-18a41dbd4c4d.jpg",
      type: "Cabane perchée",
      capacity: "2 personnes",
      featured: true,
      description: "Une cabane perchée dans les arbres, avec terrasse surplombant un lac paisible.",
      amenities: ['Terrasse', 'Vue lac', 'Petit-déjeuner', 'Canoë'],
      videoUrl: "#"
    },
    {
      id: 7,
      title: "Dôme géodésique design",
      location: "Provence, France",
      price: "140€",
      image: "https://moulin.burignat.fr/wp-content/uploads/moulin-Burignat-54.jpg",
      type: "Dôme géodésique",
      capacity: "2 personnes",
      featured: false,
      description: "Dormez sous les étoiles dans un dôme géodésique tout confort, au cœur de la garrigue.",
      amenities: ['Climatisation', 'Vue étoilée', 'Piscine', 'Randonnées'],
      videoUrl: "#"
    },
    {
      id: 8,
      title: "Bulle transparente en forêt",
      location: "Landes, France",
      price: "110€",
      image: "https://www.parenthese-insolite.com/images/un-dome-de-verre-en-pleine-nature-pour-une-nuit-sous-les-etoiles.jpg#joomlaImage://local-images/un-dome-de-verre-en-pleine-nature-pour-une-nuit-sous-les-etoiles.jpg?width=1024&height=683.jpg",
      type: "Bulle",
      capacity: "2 personnes",
      featured: false,
      description: "Une nuit magique dans une bulle transparente, en pleine forêt, pour observer la nature et les étoiles.",
      amenities: ['Transparence', 'Petit-déjeuner', 'Forêt', 'Observation étoiles'],
      videoUrl: "#"
    },
    {
      id: 9,
      title: "Maison sur pilotis avec vue panoramique",
      location: "Lac d'Annecy, France",
      price: "210€",
      image: "https://www.cabanes-de-france.com/wp-content/uploads/2023/12/Chataigne-1.jpeg",
      type: "Maison sur pilotis",
      capacity: "4 personnes",
      featured: false,
      description: "Une maison sur pilotis moderne, perchée au-dessus de l'eau, idéale pour une immersion totale dans la nature.",
      amenities: ['Vue lac', 'Terrasse', "Accès direct à l'eau", 'Petit-déjeuner inclus'],
      videoUrl: "#"
    },
    {
      id: 10,
      title: "Cabane flottante sur étang privé",
      location: "Sologne, France",
      price: "170€",
      image: "https://www.parenthese-insolite.com/images/un-houseboat-charmant-sur-le-lac-du-der.jpg#joomlaImage://local-images/un-houseboat-charmant-sur-le-lac-du-der.jpg?width=462&height=577.jpg",
      type: "Cabane flottante",
      capacity: "2 personnes",
      featured: false,
      description: "Dormez au fil de l'eau dans une cabane flottante, accessible en barque, pour une expérience insolite et paisible.",
      amenities: ['Barque', 'Terrasse', 'Petit-déjeuner', 'Pêche possible'],
      videoUrl: "#"
    },
    {
      id: 11,
      title: "Wagon de train réaménagé vintage",
      location: "Pays Basque, France",
      price: "130€",
      image: "https://www.officeriders.com/_next/image?url=https%3A%2F%2Fi.officeriders.com%2FgBhoRFYKfQDJzdNHX-800-*-jpg.webp&w=3840&q=75",
      type: "Wagon de train",
      capacity: "2 personnes",
      featured: false,
      description: "Un authentique wagon de train transformé en cocon douillet, pour un voyage immobile hors du temps.",
      amenities: ['Ambiance vintage', 'Terrasse', 'Petit-déjeuner', 'Parking'],
      videoUrl: "#"
    },
    {
      id: 12,
      title: "Logement troglodyte sculpté dans la roche",
      location: "Vallée du Lot, France",
      price: "115€",
      image: "https://www.alpes-bivouac.com/wp-content/uploads/2022/05/1-2.png",
      type: "Troglodyte",
      capacity: "3 personnes",
      featured: false,
      description: "Vivez une expérience unique dans un habitat troglodyte, creusé à même la falaise, alliant fraîcheur et authenticité.",
      amenities: ['Roche naturelle', 'Fraîcheur', 'Vue vallée', 'Cuisine équipée'],
      videoUrl: "#"
    }
  ];

  let filteredProperties = featuredProperties;
  if (filters.location) {
    filteredProperties = filteredProperties.filter(p => p.location.toLowerCase().includes(filters.location.toLowerCase()));
  }
  if (filters.type && filters.type !== 'Tous les types') {
    filteredProperties = filteredProperties.filter(p => p.type === filters.type);
  }
  if (filters.capacity) {
    filteredProperties = filteredProperties.filter(p => p.capacity === filters.capacity);
  }
  if (filters.priceRange) {
    if (filters.priceRange === '< 100€') filteredProperties = filteredProperties.filter(p => parseInt(p.price) < 100);
    if (filters.priceRange === '100-200€') filteredProperties = filteredProperties.filter(p => parseInt(p.price) >= 100 && parseInt(p.price) <= 200);
    if (filters.priceRange === '200-300€') filteredProperties = filteredProperties.filter(p => parseInt(p.price) > 200 && parseInt(p.price) <= 300);
    if (filters.priceRange === '300€+') filteredProperties = filteredProperties.filter(p => parseInt(p.price) > 300);
  }
  const propertiesToShow = limit ? filteredProperties.slice(0, limit) : filteredProperties;

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
        {propertiesToShow.map((property) => (
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

      {location.pathname !== '/logements' && (
        <div className="text-center">
          <Link to="/logements">
            <Button size="lg" variant="outline">
              Voir tous nos logements
            </Button>
          </Link>
        </div>
      )}

      {location.pathname !== '/' && (
        <div className="text-center mt-8">
          <Link to="/partenariat">
            <Button size="lg" variant="default">
              Proposer un logement atypique
            </Button>
          </Link>
          <div className="text-sm text-muted-foreground mt-2">
            On filme gratuitement et dans la semaine en Île-de-France !
          </div>
        </div>
      )}

      <PropertyModal 
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default FeaturedSection;
