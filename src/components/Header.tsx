import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#e5e7eb]/80 shadow-md rounded-full max-w-7xl mx-auto mt-6 mb-8 px-4 pt-3">
      <div className="flex items-center justify-between h-16">
        {/* Logo + texte */}
        <Link to="/" className="flex items-center gap-2 pl-2">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="14" width="18" height="12" rx="2" fill="#8B5A3C"/>
            <polygon points="16,6 4,16 6,18 16,10 26,18 28,16" fill="#D4A574"/>
            <rect x="13" y="20" width="6" height="6" rx="1" fill="#FEFCFA"/>
          </svg>
          <span className="font-bold text-lg text-white">logement insolite</span>
        </Link>

        {/* Liens centraux */}
        <nav className="hidden md:flex items-center gap-8 mx-auto">
          <Link to="/blog" className="text-foreground/80 hover:text-primary transition-colors font-medium">Blog</Link>
          <Link to="/logements" className="text-foreground/80 hover:text-primary transition-colors font-medium">Logements</Link>
        </nav>

        {/* Bouton à droite */}
        <div className="flex items-center gap-2 pr-4">
          <Link to="/partenariat">
            <Button className="rounded-full px-6 py-2 text-white bg-primary hover:bg-primary/90 text-base font-semibold shadow-md">
              Proposer votre logement
            </Button>
          </Link>
          {/* Burger menu mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 pb-4">
          <nav className="flex flex-col items-center gap-4">
            <Link to="/blog" className="text-foreground/80 hover:text-primary transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <Link to="/logements" className="text-foreground/80 hover:text-primary transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Logements</Link>
            <Link to="/partenariat" onClick={() => setIsMenuOpen(false)}>
              <Button className="rounded-full px-6 py-2 text-white bg-primary hover:bg-primary/90 text-base font-semibold shadow-md w-full">
                Proposer votre logement
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
