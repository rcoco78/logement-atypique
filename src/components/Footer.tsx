
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
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.326-1.297-.878-.808-1.297-1.959-1.297-3.326 0-1.297.49-2.448 1.297-3.326.808-.878 1.959-1.297 3.326-1.297 1.297 0 2.448.49 3.326 1.297.878.808 1.297 1.959 1.297 3.326 0 1.297-.49 2.448-1.297 3.326-.808.878-1.959 1.297-3.326 1.297zm7.718-2.326c-.878.808-1.959 1.297-3.326 1.297-1.297 0-2.448-.49-3.326-1.297-.878-.808-1.297-1.959-1.297-3.326 0-1.297.49-2.448 1.297-3.326.808-.878 1.959-1.297 3.326-1.297 1.297 0 2.448.49 3.326 1.297.878.808 1.297 1.959 1.297 3.326 0 1.297-.49 2.448-1.297 3.326z"/>
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
            © 2024 logement-atypique.fr. Tous droits réservés.
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
