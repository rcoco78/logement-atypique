
import { useState } from 'react';
import { X, Play, MapPin, Users, Wifi, Utensils, Car, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PropertyModal = ({ property, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!property) return null;

  const amenityIcons = {
    "Spa privatif": Waves,
    "Vue panoramique": MapPin,
    "Petit-déjeuner inclus": Utensils,
    "Wifi": Wifi,
    "Navigation libre": Waves,
    "Cuisine équipée": Utensils,
    "Terrasse privée": MapPin,
    "Annexe": Car,
    "Poêle à bois": MapPin,
    "Toilettes sèches": MapPin,
    "Douche solaire": Waves,
    "Randonnée": MapPin,
    "Vue 360°": MapPin,
    "Climatisation": MapPin,
    "Jacuzzi extérieur": Waves,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-background rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{property.title}</h2>
            <div className="flex items-center text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {property.location}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src={property.fullImages[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {property.hasVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-primary/90 rounded-full p-4 cursor-pointer hover:bg-primary transition-colors">
                      <Play className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                )}
              </div>
              
              {property.fullImages.length > 1 && (
                <div className="flex gap-2">
                  {property.fullImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square w-16 rounded-md overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-primary text-primary">
                  {property.type}
                </Badge>
                {property.featured && (
                  <Badge className="bg-primary text-primary-foreground">
                    ✨ Coup de cœur
                  </Badge>
                )}
                {property.hasVideo && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Play className="h-3 w-3" />
                    Vidéo exclusive
                  </Badge>
                )}
              </div>

              {/* Capacity */}
              <div className="flex items-center text-muted-foreground">
                <Users className="h-5 w-5 mr-2" />
                <span className="text-lg">{property.capacity}</span>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-lg mb-2">À propos de ce lieu</h3>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Équipements</h3>
                <div className="grid grid-cols-2 gap-3">
                  {property.amenities.map((amenity, index) => {
                    const IconComponent = amenityIcons[amenity] || MapPin;
                    return (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <IconComponent className="h-4 w-4 text-primary" />
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-primary">{property.price}</span>
                  <span className="text-muted-foreground">par nuit</span>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                  Réserver ce lieu d'exception
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Vous serez redirigé vers la plateforme de réservation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
