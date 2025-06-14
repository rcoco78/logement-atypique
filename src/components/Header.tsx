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
      <div className={`w-full max-w-full md:max-w-7xl mx-2 md:mx-auto bg-[#f8f5ff]/80 border border-border transition-all duration-200 overflow-visible ${open ? 'rounded-t-[2rem] rounded-b-none md:rounded-[2rem]' : 'rounded-[2rem]'}`}
        style={{ borderRadius: '2rem' }}>
        <header className={`px-2 md:px-4 ${open ? 'rounded-t-2xl rounded-b-none' : 'rounded-full'} md:rounded-full md:rounded-b-full bg-transparent border-none transition-all duration-200 overflow-visible`}>
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
              <div className="relative group">
                <button className="text-foreground/80 hover:text-primary transition-colors font-medium flex items-center gap-1">
                  Découvrir
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 bg-[#f8f5ff]/95 backdrop-blur-sm border border-border rounded-2xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                  <div className="p-2">
                    <Link to="/logements" className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors">Tous les logements</Link>
                    <div className="h-px bg-border/50 my-1"></div>
                    <Link to="/logements?region=paris" className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors">Autour de Paris</Link>
                    <Link to="/logements?region=bordeaux" className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors">Autour de Bordeaux</Link>
                    <Link to="/logements?region=honfleur" className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors">Autour de Honfleur</Link>
                    <Link to="/logements?region=lille" className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors">Autour de Lille</Link>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="text-foreground/80 hover:text-primary transition-colors font-medium flex items-center gap-1">
                  Ressources
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-[#f8f5ff]/95 backdrop-blur-sm border border-border rounded-2xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                  <div className="p-2">
                    <Link to="/blog" className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors">Blog</Link>
                    <div className="h-px bg-border/50 my-1"></div>
                    <Link to="/temoignages" className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors">Témoignages propriétaires</Link>
                    <Link to="/faq" className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors">FAQ / Comment ça marche</Link>
                  </div>
                </div>
              </div>
              <Link to="/contact" className="text-foreground/80 hover:text-primary transition-colors font-medium flex items-center gap-1">
                Contact
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 50 50" fill="currentColor" className="h-4 w-4">
                  <path d="M25,2c-12.682,0 -23,10.318 -23,23c0,3.96 1.023,7.854 2.963,11.29l-2.926,10.44c-0.096,0.343 -0.003,0.711 0.245,0.966c0.191,0.197 0.451,0.304 0.718,0.304c0.08,0 0.161,-0.01 0.24,-0.029l10.896,-2.699c3.327,1.786 7.074,2.728 10.864,2.728c12.682,0 23,-10.318 23,-23c0,-12.682 -10.318,-23 -23,-23zM36.57,33.116c-0.492,1.362 -2.852,2.605 -3.986,2.772c-1.018,0.149 -2.306,0.213 -3.72,-0.231c-0.857,-0.27 -1.957,-0.628 -3.366,-1.229c-5.923,-2.526 -9.791,-8.415 -10.087,-8.804c-0.295,-0.389 -2.411,-3.161 -2.411,-6.03c0,-2.869 1.525,-4.28 2.067,-4.864c0.542,-0.584 1.181,-0.73 1.575,-0.73c0.394,0 0.787,0.005 1.132,0.021c0.363,0.018 0.85,-0.137 1.329,1.001c0.492,1.168 1.673,4.037 1.819,4.33c0.148,0.292 0.246,0.633 0.05,1.022c-0.196,0.389 -0.294,0.632 -0.59,0.973c-0.296,0.341 -0.62,0.76 -0.886,1.022c-0.296,0.291 -0.603,0.606 -0.259,1.19c0.344,0.584 1.529,2.493 3.285,4.039c2.255,1.986 4.158,2.602 4.748,2.894c0.59,0.292 0.935,0.243 1.279,-0.146c0.344,-0.39 1.476,-1.703 1.869,-2.286c0.393,-0.583 0.787,-0.487 1.329,-0.292c0.542,0.194 3.445,1.604 4.035,1.896c0.59,0.292 0.984,0.438 1.132,0.681c0.148,0.242 0.148,1.41 -0.344,2.771z"/>
                </svg>
              </Link>
            </nav>

            {/* Bouton à droite desktop + mobile + burger mobile */}
            <div className="flex items-center gap-2 w-auto">
              <Link to="/partenariat" className="block md:hidden">
                <button className="rounded-full px-6 py-2.5 text-white bg-primary hover:bg-primary/90 text-base font-semibold shadow-md flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  Proposer votre logement
                </button>
              </Link>
              <Link to="/partenariat" className="hidden md:block">
                <button className="rounded-full px-6 py-2.5 text-white bg-primary hover:bg-primary/90 text-base font-semibold shadow-md flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  Proposer votre logement
                </button>
              </Link>
              <div className="md:hidden">
                <button className="p-2 rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary" onClick={() => setOpen(!open)} aria-label="Ouvrir le menu">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu w-7 h-7"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
                </button>
              </div>
            </div>
          </div>
        </header>
        <div className={`md:hidden overflow-hidden transition-all duration-300 bg-transparent border-none rounded-none ${open ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'} w-full`}>
          <div className="border-t mx-6"></div>
          <Link to="/logements" className="block text-center py-4 text-base font-medium text-foreground/90 hover:text-primary transition-colors w-full">Tous les logements</Link>
          <div className="border-t mx-6"></div>
          <Link to="/blog" className="block text-center py-4 text-base font-medium text-foreground/90 hover:text-primary transition-colors w-full">Blog</Link>
          <Link to="/temoignages" className="block text-center py-4 text-base font-medium text-foreground/90 hover:text-primary transition-colors w-full">Témoignages propriétaires</Link>
          <Link to="/faq" className="block text-center py-4 text-base font-medium text-foreground/90 hover:text-primary transition-colors w-full">FAQ / Comment ça marche</Link>
          <div className="border-t mx-6"></div>
          <Link to="/contact" className="block text-center py-4 text-base font-medium text-foreground/90 hover:text-primary transition-colors w-full">Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
