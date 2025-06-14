import { Link } from 'react-router-dom';

const Footer = () => {
  const footerSections = [
    {
      title: 'Découvrir',
      links: [
        { name: 'Tous les logements', href: '/logements' },
        { name: 'Autour de Paris', href: '/logements?region=paris' },
        { name: 'Autour de Bordeaux', href: '/logements?region=bordeaux' },
        { name: 'Autour de Honfleur', href: '/logements?region=honfleur' },
        { name: 'Autour de Lille', href: '/logements?region=lille' },
      ]
    },
    {
      title: 'Logement pour...',
      links: [
        { name: 'Curieux d\'histoire', href: '/logements?type=histoire' },
        { name: 'Amoureux de la campagne', href: '/logements?type=campagne' },
        { name: 'Fans d\'architecture', href: '/logements?type=architecture' },
        { name: 'Un week-end en amoureux', href: '/logements?type=romantique' },
        { name: 'Explorateurs urbains', href: '/logements?type=urbain' },
      ]
    },
    {
      title: 'Ressources',
      links: [
        { name: 'Notre équipe', href: '/equipe' },
        { name: 'Blog', href: '/blog' },
        { name: 'Témoignages propriétaires', href: '/temoignages' },
        { name: 'FAQ / Comment ça marche', href: '/faq' },
        { name: 'Données publiques', href: '/donnees-publiques' },
      ]
    },
    {
      title: 'Vous êtes hôte ?',
      links: [
        { name: 'Référencer mon logement', href: '/partenariat' },
        { name: 'Contactez-nous', href: '/contact', icon: 'whatsapp' },
      ]
    },
  ];

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1 flex flex-col h-full">
            <div>
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <svg className="w-8 h-8 md:w-7 md:h-7" width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="7" y="14" width="18" height="12" rx="2" fill="#8B5A3C"/>
                  <polygon points="16,6 4,16 6,18 16,10 26,18 28,16" fill="#D4A574"/>
                  <rect x="13" y="20" width="6" height="6" rx="1" fill="#FEFCFA"/>
                </svg>
                <div className="text-xl font-bold text-primary">logement-atypique</div>
              </Link>

              <p className="text-muted-foreground text-sm mb-2">
               Logements atypiques partout en France, sous un autre angle.
              </p>
            </div>
            <div className="flex space-x-4 mt-auto">
              {/* Social Links */}
              <a href="https://facebook.com/logement.atypique" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="https://instagram.com/logement.atypique" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">Instagram</span>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" className="h-5 w-5" fill="currentColor">
                  <path d="M16,3c-7.17,0 -13,5.83 -13,13v18c0,7.17 5.83,13 13,13h18c7.17,0 13,-5.83 13,-13v-18c0,-7.17 -5.83,-13 -13,-13zM37,11c1.1,0 2,0.9 2,2c0,1.1 -0.9,2 -2,2c-1.1,0 -2,-0.9 -2,-2c0,-1.1 0.9,-2 2,-2zM25,14c6.07,0 11,4.93 11,11c0,6.07 -4.93,11 -11,11c-6.07,0 -11,-4.93 -11,-11c0,-6.07 4.93,-11 11,-11zM25,16c-4.96,0 -9,4.04 -9,9c0,4.96 4.04,9 9,9c4.96,0 9,-4.04 9,-9c0,-4.96 -4.04,-9 -9,-9z"></path>
                </svg>
              </a>
              <a href="https://tiktok.com/@logement.atypique" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">TikTok</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5" fill="currentColor"><path d="M41.5 15.5c-3.6 0-6.5-2.9-6.5-6.5h-5v25c0 2.5-2 4.5-4.5 4.5s-4.5-2-4.5-4.5 2-4.5 4.5-4.5c.5 0 1 .1 1.5.2v-5.1c-.5-.1-1-.1-1.5-.1-5.2 0-9.5 4.3-9.5 9.5s4.3 9.5 9.5 9.5 9.5-4.3 9.5-9.5V21.7c1.9 1.2 4.1 1.8 6.5 1.8v-8z"/></svg>
              </a>
              <a href="https://linkedin.com/company/logement.atypique" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">LinkedIn</span>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256" className="h-5 w-5" fill="currentColor">
                  <g fill="#6d6965" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{mixBlendMode: 'normal'}}><g transform="scale(5.12,5.12)"><path d="M41,4h-32c-2.76,0 -5,2.24 -5,5v32c0,2.76 2.24,5 5,5h32c2.76,0 5,-2.24 5,-5v-32c0,-2.76 -2.24,-5 -5,-5zM17,20v19h-6v-19zM11,14.47c0,-1.4 1.2,-2.47 3,-2.47c1.8,0 2.93,1.07 3,2.47c0,1.4 -1.12,2.53 -3,2.53c-1.8,0 -3,-1.13 -3,-2.53zM39,39h-6c0,0 0,-9.26 0,-10c0,-2 -1,-4 -3.5,-4.04h-0.08c-2.42,0 -3.42,2.06 -3.42,4.04c0,0.91 0,10 0,10h-6v-19h6v2.56c0,0 1.93,-2.56 5.81,-2.56c3.97,0 7.19,2.73 7.19,8.26z"></path></g></g>
                </svg>
              </a>
              <a href="https://pinterest.com/logement.atypique" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">Pinterest</span>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256" className="h-5 w-5" fill="currentColor">
                  <g fill="#6d6965" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{mixBlendMode: 'normal'}}><g transform="scale(5.12,5.12)"><path d="M25,2c-12.68213,0 -23,10.31787 -23,23c0,9.88416 6.26758,18.33026 15.03638,21.57697c-0.25256,-2.25159 -0.21295,-5.93903 0.2038,-7.72437c0.39026,-1.677 2.52124,-10.68713 2.52124,-10.68713c0,0 -0.64331,-1.28833 -0.64331,-3.1911c0,-2.99017 1.73242,-5.22119 3.88983,-5.22119c1.83496,0 2.71979,1.37762 2.71979,3.0282c0,1.8457 -1.17346,4.60266 -1.78125,7.15784c-0.5069,2.14093 1.07336,3.88654 3.18365,3.88654c3.82123,0 6.75848,-4.0296 6.75848,-9.84534c0,-5.14758 -3.698,-8.74719 -8.97955,-8.74719c-6.11676,0 -9.70728,4.58856 -9.70728,9.33099c0,1.84735 0.71118,3.82867 1.6001,4.90698c0.17529,0.21332 0.20093,0.39941 0.14886,0.61603c-0.1629,0.67889 -0.52509,2.13928 -0.59705,2.4386c-0.09344,0.39447 -0.31177,0.47632 -0.71863,0.28693c-2.68579,-1.25031 -4.3645,-5.17566 -4.3645,-8.32959c0,-6.78156 4.92682,-13.0108 14.20654,-13.0108c7.45886,0 13.25476,5.31384 13.25476,12.41791c0,7.41003 -4.67291,13.37299 -11.15686,13.37299c-2.17889,0 -4.22638,-1.13202 -4.92676,-2.46918c0,0 -1.07831,4.10486 -1.34045,5.11121c-0.45245,1.74042 -2.38928,5.34601 -3.36157,6.9837c2.22424,0.71851 4.59357,1.11102 7.05377,1.11102c12.68262,0 23,-10.31738 23,-23c0,-12.68213 -10.31738,-23 -23,-23z"></path></g></g>
                </svg>
              </a>
              <a href="https://youtube.com/@logement.atypique" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">Youtube</span>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256" className="h-5 w-5" fill="currentColor">
                  <g fill="#6d6965" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{mixBlendMode: 'normal'}}><g transform="scale(5.12,5.12)"><path d="M44.89844,14.5c-0.39844,-2.19922 -2.29687,-3.80078 -4.5,-4.30078c-3.29687,-0.69922 -9.39844,-1.19922 -16,-1.19922c-6.59766,0 -12.79687,0.5 -16.09766,1.19922c-2.19922,0.5 -4.10156,2 -4.5,4.30078c-0.40234,2.5 -0.80078,6 -0.80078,10.5c0,4.5 0.39844,8 0.89844,10.5c0.40234,2.19922 2.30078,3.80078 4.5,4.30078c3.5,0.69922 9.5,1.19922 16.10156,1.19922c6.60156,0 12.60156,-0.5 16.10156,-1.19922c2.19922,-0.5 4.09766,-2 4.5,-4.30078c0.39844,-2.5 0.89844,-6.10156 1,-10.5c-0.20312,-4.5 -0.70312,-8 -1.20312,-10.5zM19,32v-14l12.19922,7z"></path></g></g>
                </svg>
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.icon === 'whatsapp' ? (
                      <Link
                        to={link.href}
                        className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
                      >
                        {link.name}
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0,0,256,256" className="mr-2"><g fill="#6d6965" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><g transform="scale(5.12,5.12)"><path d="M25,2c-12.682,0 -23,10.318 -23,23c0,3.96 1.023,7.854 2.963,11.29l-2.926,10.44c-0.096,0.343 -0.003,0.711 0.245,0.966c0.191,0.197 0.451,0.304 0.718,0.304c0.08,0 0.161,-0.01 0.24,-0.029l10.896,-2.699c3.327,1.786 7.074,2.728 10.864,2.728c12.682,0 23,-10.318 23,-23c0,-12.682 -10.318,-23 -23,-23zM36.57,33.116c-0.492,1.362 -2.852,2.605 -3.986,2.772c-1.018,0.149 -2.306,0.213 -3.72,-0.231c-0.857,-0.27 -1.957,-0.628 -3.366,-1.229c-5.923,-2.526 -9.791,-8.415 -10.087,-8.804c-0.295,-0.389 -2.411,-3.161 -2.411,-6.03c0,-2.869 1.525,-4.28 2.067,-4.864c0.542,-0.584 1.181,-0.73 1.575,-0.73c0.394,0 0.787,0.005 1.132,0.021c0.363,0.018 0.85,-0.137 1.329,1.001c0.492,1.168 1.673,4.037 1.819,4.33c0.148,0.292 0.246,0.633 0.05,1.022c-0.196,0.389 -0.294,0.632 -0.59,0.973c-0.296,0.341 -0.62,0.76 -0.886,1.022c-0.296,0.291 -0.603,0.606 -0.259,1.19c0.344,0.584 1.529,2.493 3.285,4.039c2.255,1.986 4.158,2.602 4.748,2.894c0.59,0.292 0.935,0.243 1.279,-0.146c0.344,-0.39 1.476,-1.703 1.869,-2.286c0.393,-0.583 0.787,-0.487 1.329,-0.292c0.542,0.194 3.445,1.604 4.035,1.896c0.59,0.292 0.984,0.438 1.132,0.681c0.148,0.242 0.148,1.41 -0.344,2.771z"></path></g></g></svg>
                      </Link>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0">
            <p className="text-muted-foreground text-sm mb-2 md:mb-0 md:mr-8 text-center md:text-left">
              © 2025 logement-atypique.fr. Tous droits réservés.
            </p>
            <div className="flex space-x-4">
              <a href="/mentions-legales" className="text-muted-foreground hover:text-foreground text-sm">Mentions légales</a>
              <a href="/conditions" className="text-muted-foreground hover:text-foreground text-sm">Conditions générales</a>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-muted-foreground text-sm">
              Fait avec ❤️ en France
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
