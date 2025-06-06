
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, MapPin, Users } from 'lucide-react';

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  image: string;
  type: string;
  capacity: string;
  featured: boolean;
  description?: string;
  amenities?: string[];
  videoUrl?: string;
}

interface PropertyModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyModal = ({ property, isOpen, onClose }: PropertyModalProps) => {
  if (!property) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{property.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image/Video Section */}
          <div className="relative">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
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
            {/* Video Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button size="lg" className="rounded-full w-16 h-16 bg-primary/80 hover:bg-primary">
                <Play className="h-6 w-6 ml-1" />
              </Button>
            </div>
            <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2">
              <span className="font-semibold text-xl">{property.price}</span>
              <span className="text-sm text-muted-foreground">/nuit</span>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <MapPin className="h-4 w-4" />
                <span>{property.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{property.capacity}</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-muted-foreground">
                {property.description || "Un logement d'exception dans un cadre unique, parfait pour une expérience inoubliable. Chaque détail a été pensé pour votre confort et votre émerveillement."}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Équipements</h3>
              <div className="flex flex-wrap gap-2">
                {(property.amenities || ['WiFi', 'Cuisine équipée', 'Parking', 'Vue panoramique']).map((amenity) => (
                  <Badge key={amenity} variant="outline">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button size="lg" className="w-full">
                Réserver maintenant
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyModal;
