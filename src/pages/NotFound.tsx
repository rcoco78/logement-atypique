import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="pt-40 flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page introuvable</h2>
          <p className="text-muted-foreground mb-6">
            Oups ! Le site a supprimé ou n'a pas encore créé cette page.<br/>
            Nous sommes très jeunes et encore en construction...<br/>
            Merci de votre compréhension et de votre curiosité !
          </p>
          <Button asChild size="lg" className="mt-2">
            <a href="/">Retour à l'accueil</a>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
