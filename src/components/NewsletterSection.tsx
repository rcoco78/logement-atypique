
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Inscription réussie !",
        description: "Vous recevrez nos dernières découvertes directement dans votre boîte mail.",
      });
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ne ratez aucune découverte
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Recevez chaque semaine notre sélection de nouveaux lieux d'exception 
            et nos conseils d'experts pour des escapades inoubliables.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading} className="sm:w-auto">
              {isLoading ? 'Inscription...' : 'S\'inscrire'}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-4">
            Pas de spam, désinscription en un clic. Vos données sont protégées.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
