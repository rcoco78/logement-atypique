import { Link } from 'react-router-dom';

const Footer = () => {
  const footerSections = [
    {
      title: 'Découvrir',
      links: [
        { name: 'Tous les logements', href: '/logements' },
        { name: 'Nos coups de cœur', href: '/coups-de-coeur' },
        { name: 'Nouveautés', href: '/nouveautes' },
        { name: 'Par région', href: '/destinations' },
      ]
    },
    {
      title: 'Inspiration',
      links: [
        { name: 'Magazine', href: '/inspiration' },
        { name: 'Guides de voyage', href: '/guides' },
        { name: 'Tendances', href: '/tendances' },
        { name: 'Conseils', href: '/conseils' },
      ]
    },
    {
      title: 'À propos',
      links: [
        { name: 'Notre histoire', href: '/a-propos' },
        { name: 'Notre équipe', href: '/equipe' },
        { name: 'Presse', href: '/presse' },
        { name: 'Partenaires', href: '/partenaires' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Conditions générales', href: '/conditions' },
        { name: 'Confidentialité', href: '/confidentialite' },
      ]
    }
  ];

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="text-xl font-bold text-primary">logement-atypique</div>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Votre plateforme de référence pour des séjours d'exception dans des lieux uniques à travers la France.
            </p>
            <div className="flex space-x-4">
              {/* Social Links */}
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Instagram</span>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" className="h-5 w-5" fill="currentColor">
                  <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">TikTok</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.75 2h2.25a.75.75 0 0 1 .75.75v2.25a4.75 4.75 0 0 0 4.75 4.75h1.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-1.25A7.25 7.25 0 0 1 13.5 4.75V2.75A.75.75 0 0 1 14.25 2h-1.5a.75.75 0 0 1-.75.75v14.5a2.25 2.25 0 1 1-2.25-2.25.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 .75.75A5.25 5.25 0 1 1 7.5 19.25V4.75A.75.75 0 0 1 8.25 4h1.5a.75.75 0 0 1 .75.75v14.5a3.75 3.75 0 1 0 3.75-3.75.75.75 0 0 1-.75-.75v-2.25a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 .75.75v2.25a6.25 6.25 0 1 1-6.25-6.25V2.75A.75.75 0 0 1 12.75 2z"/>
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
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2025 logement-atypique.fr. Tous droits réservés.
          </p>
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
