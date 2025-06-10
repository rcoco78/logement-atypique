import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Video } from 'lucide-react';
import PropertyModal from './PropertyModal';
import { Link, useLocation } from 'react-router-dom';

export const featuredProperties = [
    {
      id: 1,
      title: "Tiny House sur la Côte Atlantique",
      location: "Île d'Oléron, France",
      region: "Nouvelle-Aquitaine",
      price: "120€",
      priceRange: "100 - 150€",
      image: "https://resize.elle.fr/article/var/plain_site/storage/images/deco/pieces/petits-espaces/tiny-house-des-petits-espaces-ultra-inspirants/tiny-house-sur-la-plage/93710601-1-fre-FR/Tiny-house-sur-la-plage.jpg",
      images: [
        "https://resize.elle.fr/article/var/plain_site/storage/images/deco/pieces/petits-espaces/tiny-house-des-petits-espaces-ultra-inspirants/tiny-house-sur-la-plage/93710601-1-fre-FR/Tiny-house-sur-la-plage.jpg",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca"
      ],
      type: "Tiny house",
      capacity: "2 personnes",
      bedInfo: "1 lit double",
      featured: true,
      description: "Une tiny house écologique à deux pas de l'océan, idéale pour une escapade minimaliste et ressourçante.",
      amenities: ['Vue mer', 'Terrasse', 'Cuisine équipée', 'Vélos à disposition'],
      meals: "Petit déjeuner",
      kitchen: true,
      internet: true,
      petsAllowed: false,
      nearbyRestaurants: false,
      videoUrl: "https://youtube.com/shorts/WEeNQ4oiMKc?si=4M3SvjXzSSHfja2v"
    },
    {
      id: 2,
      title: "Yourte mongole authentique",
      location: "Massif central, France",
      region: "Auvergne-Rhône-Alpes",
      price: "90€",
      priceRange: "80 - 120€",
      image: "https://images.surferseo.art/f1ee3ca8-a6ab-4917-b0d5-e6b62c8f80e4.jpeg",
      images: [
        "https://images.surferseo.art/f1ee3ca8-a6ab-4917-b0d5-e6b62c8f80e4.jpeg",
        "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99",
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"
      ],
      type: "Yourte",
      capacity: "4 personnes",
      bedInfo: "2 lits doubles",
      featured: false,
      description: "Vivez l'expérience nomade dans une yourte traditionnelle, au cœur de la nature sauvage.",
      amenities: ['Poêle à bois', 'Lits confortables', 'Randonnées', 'Ciel étoilé'],
      meals: "Petit déjeuner",
      kitchen: false,
      internet: false,
      petsAllowed: true,
      nearbyRestaurants: true,
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
      videoUrl: "https://youtube.com/shorts/WEeNQ4oiMKc?si=4M3SvjXzSSHfja2v"
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
      videoUrl: "https://youtube.com/shorts/WEeNQ4oiMKc?si=4M3SvjXzSSHfja2v"
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

const FeaturedSection = ({ limit }: { limit?: number }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const filterByParams = (property) => {
    // Type
    if (params.get('type') && params.get('type') !== 'Tous les types') {
      if (property.type !== params.get('type')) return false;
    }
    // Multi-destinations
    const locationsParam = params.get('locations');
    if (locationsParam && locationsParam.trim() !== '') {
      const selectedLocations = locationsParam.split(',').map((l) => l.trim().toLowerCase());
      const propertyDestination = property.location.split(',')[0].trim().toLowerCase();
      if (!selectedLocations.includes(propertyDestination)) return false;
    }
    // Capacity
    if (params.get('capacity') && params.get('capacity') !== '') {
      const filterCap = Number(params.get('capacity'));
      let propCap = property.capacity;
      if (typeof propCap === 'string') {
        const match = propCap.match(/\d+/);
        propCap = match ? Number(match[0]) : NaN;
      }
      if (typeof propCap !== 'number' || isNaN(propCap) || propCap !== filterCap) return false;
    }
    // Price Range
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

  const filteredProperties = (location.pathname === '/logements')
    ? featuredProperties.filter(filterByParams)
    : (limit ? featuredProperties.slice(0, limit) : featuredProperties);

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
        {filteredProperties.map((property) => (
          <div 
            key={property.id} 
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            onClick={() => handlePropertyClick(property)}
          >
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src={property.image}
                alt={property.title}
                className="w-full aspect-[4/5] md:aspect-[9/16] object-cover transition-transform duration-500 group-hover:scale-110 rounded-lg"
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
        <div className="flex flex-col items-center mt-8">
          <div className="border border-[#BFA48A] rounded-xl p-6 bg-transparent shadow-sm w-full max-w-xl md:w-2/3">
          <Link to="/partenariat">
              <Button
                size="lg"
                variant="white"
                className="w-full text-lg h-12 font-bold"
                aria-label="Proposer un logement atypique"
              >
              Proposer un logement atypique
            </Button>
          </Link>
            <div className="text-xs text-[#BFA48A] mt-2 text-center font-normal">
            On filme gratuitement et dans la semaine en Île-de-France !
            </div>
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
