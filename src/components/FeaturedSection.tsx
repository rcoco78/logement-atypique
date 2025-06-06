
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const FeaturedSection = () => {
  const featuredProperties = [
    {
      id: 1,
      title: "Cabane dans les arbres - Périgord",
      location: "Dordogne, France",
      price: "180€",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Cabane perchée",
      capacity: "2 personnes",
      featured: true
    },
    {
      id: 2,
      title: "Loft industriel avec vue panoramique",
      location: "Lyon, France",
      price: "250€",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Loft",
      capacity: "4 personnes",
      featured: false
    },
    {
      id: 3,
      title: "Maison de verre contemporaine",
      location: "Provence, France",
      price: "320€",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Maison d'architecte",
      capacity: "6 personnes",
      featured: true
    },
    {
      id: 4,
      title: "Tiny house au bord de l'eau",
      location: "Bretagne, France",
      price: "120€",
      image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Tiny house",
      capacity: "2 personnes",
      featured: false
    }
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos coups de cœur</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Une sélection rigoureuse de logements d'exception pour des séjours inoubliables
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {featuredProperties.map((property) => (
          <div key={property.id} className="group cursor-pointer">
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
    </section>
  );
};

export default FeaturedSection;
