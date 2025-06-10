import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, MapPin, Users, ChevronLeft, ChevronRight, Wifi, Utensils, PawPrint, BedDouble, Map, Store } from 'lucide-react';
import { useState } from 'react';

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
  images?: string[];
  region?: string;
  bedInfo?: string;
  priceRange?: string;
  meals?: string;
  kitchen?: boolean;
  internet?: boolean;
  petsAllowed?: boolean;
  nearbyRestaurants?: boolean;
}

interface PropertyModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyModal = ({ property, isOpen, onClose }: PropertyModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  if (!property) return null;
  const images = property.images || [property.image];
  const hasVideo = property.videoUrl && property.videoUrl !== '#';
  const totalSlides = hasVideo ? images.length + 1 : images.length;

  // Fonction pour extraire l'ID YouTube (short ou classique)
  function extractYouTubeId(url: string) {
    const regExp = /(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }
  const youTubeId = hasVideo ? extractYouTubeId(property.videoUrl!) : null;

  // Miniature vidéo : YouTube ou fallback image
  let videoThumbnail = images[0];
  if (youTubeId) {
    videoThumbnail = `https://img.youtube.com/vi/${youTubeId}/hqdefault.jpg`;
  }

  const goTo = (idx: number) => {
    setIsVideoPlaying(false); // On arrête la vidéo si on change de slide
    setCurrentIndex((idx + totalSlides) % totalSlides);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{property.title}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Carrousel visuel */}
          <div className="relative">
            <div className="relative w-full aspect-[4/5] md:aspect-[9/16] rounded-lg overflow-hidden">
              {/* Ruban prix en haut à droite */}
              {property.priceRange && (
                <div className="absolute top-4 right-4 z-20 bg-white/90 text-primary font-semibold px-4 py-1 rounded-lg shadow-md flex items-center gap-1">
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 16v-4' /></svg>
                  {property.priceRange}
                </div>
              )}
              {/* Badges en haut à gauche, non superposés */}
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 min-w-[120px]">
                {hasVideo && currentIndex === 0 && (
                  <Badge className="bg-black/80 text-white flex items-center gap-1 mb-1"><Play className="w-4 h-4" /> Vidéo</Badge>
                )}
                <div className="flex flex-row gap-2">
                  {property.featured && (
                    <Badge className="bg-primary text-primary-foreground">Coup de cœur</Badge>
                  )}
                  <Badge variant="secondary" className="block w-fit">{property.type}</Badge>
                </div>
              </div>
              {currentIndex === 0 && hasVideo ? (
                isVideoPlaying && youTubeId ? (
                  <div className="w-full h-full flex items-center justify-center bg-black/80">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1&modestbranding=1&rel=0`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full relative cursor-pointer" onClick={() => setIsVideoPlaying(true)}>
                    <img
                      src={videoThumbnail}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="rounded-full w-16 h-16 bg-primary/80 hover:bg-primary">
                        <Play className="h-6 w-6 ml-1" />
                      </Button>
                    </div>
                  </div>
                )
              ) : (
                <img
                  src={images[hasVideo ? currentIndex - 1 : currentIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              )}
              {/* Flèches carrousel */}
              {totalSlides > 1 && (
                <>
                  <button onClick={() => goTo(currentIndex - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1"><ChevronLeft /></button>
                  <button onClick={() => goTo(currentIndex + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1"><ChevronRight /></button>
                </>
              )}
              {/* Indicateurs */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                  <span key={idx} className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-primary' : 'bg-white/60'} border border-primary block`} />
                ))}
              </div>
            </div>
          </div>
          {/* Détails */}
          <div className="space-y-4 flex flex-col h-full">
            <div className="flex flex-col gap-1 text-muted-foreground text-sm">
              <div className="flex items-center gap-2"><Map className="h-4 w-4" /><span>{property.region || property.location}</span></div>
              <div className="flex items-center gap-2"><Users className="h-4 w-4" /><span>{property.capacity}</span></div>
              {property.bedInfo && <div className="flex items-center gap-2"><BedDouble className="h-4 w-4" /><span>{property.bedInfo}</span></div>}
              {property.meals && <div className="flex items-center gap-2"><Utensils className="h-4 w-4" /><span>Repas proposés : {property.meals}</span></div>}
              {property.kitchen !== undefined && <div className="flex items-center gap-2"><Utensils className="h-4 w-4" /><span>Cuisine équipée : {property.kitchen ? 'Oui' : 'Non'}</span></div>}
              {property.internet !== undefined && <div className="flex items-center gap-2"><Wifi className="h-4 w-4" /><span>Connexion internet : {property.internet ? 'Oui' : 'Non'}</span></div>}
              {property.petsAllowed !== undefined && <div className="flex items-center gap-2"><PawPrint className="h-4 w-4" /><span>Animaux acceptés : {property.petsAllowed ? 'Oui' : 'Non'}</span></div>}
              {property.nearbyRestaurants !== undefined && <div className="flex items-center gap-2"><Store className="h-4 w-4" /><span>Restauration à proximité : {property.nearbyRestaurants ? 'Oui' : 'Non'}</span></div>}
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-muted-foreground">{property.description || "Un logement d'exception dans un cadre unique, parfait pour une expérience inoubliable. Chaque détail a été pensé pour votre confort et votre émerveillement."}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Équipements</h3>
              <div className="flex flex-wrap gap-2">
                {(property.amenities || ['WiFi', 'Cuisine équipée', 'Parking', 'Vue panoramique']).map((amenity) => (
                  <Badge key={amenity} variant="outline">{amenity}</Badge>
                ))}
              </div>
            </div>
            {/* Spacer pour pousser le bouton en bas */}
            <div className="flex-1" />
            <div className="pt-4">
              <Button size="lg" className="w-full">Réserver maintenant</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyModal;
