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

    try {
      const formData = new URLSearchParams();
      formData.append('email', email);
      const response = await fetch('https://script.google.com/macros/s/AKfycbyAHGt4CAk5eNoXIgP-WlaImYNgyKsPW8kOetBpw1if5YU5_yLmgOp37B1z21U1NJAexA/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });
      const text = await response.text();
      if (response.ok && text.includes('OK')) {
        toast({
          title: "Merci, vous êtes bien inscrit à la newsletter !",
          description: "Vous recevrez nos dernières découvertes directement dans votre boîte mail.",
        });
        setEmail('');
      } else {
        toast({
          title: "Erreur lors de l'inscription",
          description: "Une erreur est survenue. Veuillez réessayer.",
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: "Erreur lors de l'inscription",
        description: "Impossible de contacter le serveur. Veuillez réessayer.",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
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
