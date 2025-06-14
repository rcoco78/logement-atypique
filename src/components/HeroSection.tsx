import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://groupeconfiance.fr/wp-content/uploads/2023/12/logement-insolite.jpg",
      subtitle: "qui vous invitent à dormir sous les étoiles dans des cabanes perchées..."
    },
    {
      image: "https://www.immoba.fr/site/images/normal/Picture39749949jpg_5ed907db5699a.jpg",
      subtitle: "où chaque détail raconte une histoire dans des lofts d'exception..."
    },
    {
      image: "https://www.esprit-insolite.com/wp-content/uploads/2023/08/investir-hebergement-insolite.jpg",
      subtitle: "qui vous plongent au cœur de la nature dans des maisons de verre..."
    },
    {
      image: "https://www.esprit-insolite.com/wp-content/uploads/2023/08/investir-hebergement-insolite.jpg",
      subtitle: "qui mêlent tradition et modernité dans des yourtes nichées..."
    },
    {
      image: "https://groupeconfiance.fr/wp-content/uploads/2023/12/logement-insolite.jpg",
      subtitle: "qui vous invitent à l'essentiel dans des tiny houses confortables..."
    },
    {
      image: "https://www.immoba.fr/site/images/normal/Picture39749949jpg_5ed907db5699a.jpg",
      subtitle: "qui vous offrent un cocon de sérénité sous des dômes géodésiques..."
    },
    {
      image: "https://www.esprit-insolite.com/wp-content/uploads/2023/08/investir-hebergement-insolite.jpg",
      subtitle: "qui bercent vos rêves au rythme de l'eau dans des maisons flottantes..."
    },
    {
      image: "https://groupeconfiance.fr/wp-content/uploads/2023/12/logement-insolite.jpg",
      subtitle: "qui vous plongent dans l'histoire avec des maisons troglodytes..."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Image Carousel */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt="Logements atypiques"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center h-full">
        <div className="text-center text-white max-w-4xl px-4">
          <p className="text-xl md:text-2xl mb-4 opacity-90 animate-fade-in">
            Découvrez
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in">
            Des logements atypiques
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 h-12 animate-fade-in">
            {slides[currentSlide].subtitle}
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center animate-fade-in">
            <Link to="/logements">
              <Button className="text-lg px-8 py-3 hidden sm:inline-flex border-0">
                Explorer les logements
              </Button>
            </Link>
            <Link to="/partenariat">
              <Button variant="outline" className="text-lg px-8 py-3 hidden sm:inline-flex">
                Proposer votre logement
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
