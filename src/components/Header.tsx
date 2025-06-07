import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Drawer, DrawerTrigger, DrawerContent } from '@/components/ui/drawer';

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 pt-6">
      <header className="bg-[#f8f5ff]/80 border border-border rounded-full max-w-full mx-2 md:max-w-7xl md:mx-auto px-2 md:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo + texte */}
          <Link to="/" className="flex items-center gap-2 pl-2">
            <svg className="w-10 h-10 md:w-7 md:h-7" width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="7" y="14" width="18" height="12" rx="2" fill="#8B5A3C"/>
              <polygon points="16,6 4,16 6,18 16,10 26,18 28,16" fill="#D4A574"/>
              <rect x="13" y="20" width="6" height="6" rx="1" fill="#FEFCFA"/>
            </svg>
            <span className="hidden md:inline-block font-bold text-lg" style={{ color: '#885d3f' }}>logement atypique</span>
          </Link>

          {/* Liens centraux desktop */}
          <nav className="hidden md:flex items-center gap-8 mx-auto">
            <Link to="/logements" className="text-foreground/80 hover:text-primary transition-colors font-medium">Logements</Link>
            <Link to="/blog" className="text-foreground/80 hover:text-primary transition-colors font-medium">Blog</Link>
          </nav>

          {/* Bouton à droite desktop + burger mobile */}
          <div className="flex items-center gap-2 pr-4">
            {/* Desktop : bouton */}
            <Link to="/partenariat" className="hidden md:block">
              <Button className="rounded-full px-6 py-2 text-white bg-primary hover:bg-primary/90 text-base font-semibold shadow-md">
                Proposer votre logement
              </Button>
            </Link>
            {/* Mobile : burger menu */}
            <Drawer>
              <DrawerTrigger asChild>
                <button className="md:hidden p-2 rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary">
                  <Menu className="w-7 h-7" />
                  <span className="sr-only">Ouvrir le menu</span>
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="flex flex-col gap-6 py-8 px-6">
                  <Link to="/logements" className="text-lg font-medium text-foreground/90 hover:text-primary transition-colors">Logements</Link>
                  <Link to="/blog" className="text-lg font-medium text-foreground/90 hover:text-primary transition-colors">Blog</Link>
                  <Link to="/partenariat">
                    <Button className="w-full rounded-full px-6 py-2 text-white bg-primary hover:bg-primary/90 text-base font-semibold shadow-md mt-4">
                      Proposer votre logement
                    </Button>
                  </Link>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
