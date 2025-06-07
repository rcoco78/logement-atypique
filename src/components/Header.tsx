import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useState, useRef, useEffect } from 'react';

const Header = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  // Fermer le menu si clic à l'extérieur (mobile)
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 pt-6 flex justify-center">
      <div className={`w-full max-w-full md:max-w-7xl mx-2 md:mx-auto bg-[#f8f5ff]/80 border border-border transition-all duration-200 overflow-hidden ${open ? 'rounded-t-[2rem] rounded-b-none md:rounded-[2rem]' : 'rounded-[2rem]'}`}
        style={{ borderRadius: '2rem' }}
      >
        <header
          className={`px-2 md:px-4 ${open ? 'rounded-t-2xl rounded-b-none' : 'rounded-full'} md:rounded-full md:rounded-b-full bg-transparent border-none transition-all duration-200`}
        >
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

            {/* Bouton à droite desktop + mobile + burger mobile */}
            <div className="flex items-center gap-2 w-auto">
              {/* Mobile : bouton à droite */}
              <Link to="/partenariat" className="block md:hidden">
                <Button className="rounded-full px-6 py-2 text-white bg-primary hover:bg-primary/90 text-base font-semibold shadow-md">
                  Proposer votre logement
                </Button>
              </Link>
              {/* Desktop : bouton */}
              <Link to="/partenariat" className="hidden md:block">
                <Button className="rounded-full px-6 py-2 text-white bg-primary hover:bg-primary/90 text-base font-semibold shadow-md">
                  Proposer votre logement
                </Button>
              </Link>
              {/* Mobile : burger menu custom */}
              <div className="md:hidden">
                <button
                  className="p-2 rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => setOpen((v) => !v)}
                  aria-label="Ouvrir le menu"
                >
                  <Menu className="w-7 h-7" />
                </button>
              </div>
            </div>
          </div>
        </header>
        {/* Menu mobile intégré, sans border-radius, même largeur, même fond */}
        <div
          ref={menuRef}
          className={`md:hidden overflow-hidden transition-all duration-300 bg-transparent border-none rounded-none ${open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} w-full`}
        >
          <Link
            to="/logements"
            className="block text-center py-5 text-lg font-medium text-foreground/90 hover:text-primary transition-colors w-full"
            onClick={() => setOpen(false)}
          >
            Logements
          </Link>
          <div className="border-t mx-6" />
          <Link
            to="/blog"
            className="block text-center py-5 text-lg font-medium text-foreground/90 hover:text-primary transition-colors w-full"
            onClick={() => setOpen(false)}
          >
            Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
