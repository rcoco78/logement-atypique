import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Star, Users, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Partenariat = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    phoneCountry: 'FR',
    propertyType: '',
    location: '',
    description: '',
    website: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const phonePatterns = {
    FR: { pattern: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, placeholder: '06 12 34 56 78', example: '06 12 34 56 78' },
    BE: { pattern: /^(?:(?:\+|00)32|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, placeholder: '0475 12 34 56', example: '0475 12 34 56' },
    CH: { pattern: /^(?:(?:\+|00)41|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, placeholder: '076 123 45 67', example: '076 123 45 67' },
    LU: { pattern: /^(?:(?:\+|00)352|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, placeholder: '621 123 456', example: '621 123 456' },
    CA: { pattern: /^(?:(?:\+|00)1|0)\s*[2-9]\d{2}(?:[\s.-]*\d{3}){2}$/, placeholder: '514 123 4567', example: '514 123 4567' }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Format d'email invalide",
        description: "Veuillez entrer une adresse email valide.",
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    // Validation du téléphone selon le pays
    const phonePattern = phonePatterns[formData.phoneCountry as keyof typeof phonePatterns];
    if (!phonePattern.pattern.test(formData.phone)) {
      toast({
        title: "Format de téléphone invalide",
        description: `Veuillez entrer un numéro de téléphone valide (ex: ${phonePattern.example}).`,
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/partenariat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomComplet: formData.name,
          email: formData.email,
          telephone: formData.phone,
          telephonePays: formData.phoneCountry,
          typeLogement: formData.propertyType,
          localisation: formData.location,
          siteWeb: formData.website,
          description: formData.description
        }),
      });

      const data = await response.json();
      if (response.ok && data.message === 'OK') {
        toast({
          title: "Merci pour votre demande !",
          description: "Nous vous contacterons rapidement pour organiser le tournage.",
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          phoneCountry: 'FR',
          propertyType: '',
          location: '',
          description: '',
          website: ''
        });
      } else {
        toast({
          title: "Erreur lors de l'envoi",
          description: data.error || "Une erreur est survenue. Veuillez réessayer.",
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: "Erreur lors de l'envoi",
        description: "Impossible de contacter le serveur. Veuillez réessayer.",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16 px-4 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Devenez partenaire
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Vous possédez un logement atypique ? Nous venons gratuitement chez vous pour créer une vidéo professionnelle qui mettra en valeur votre bien d'exception.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Benefits Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-6">Pourquoi devenir partenaire ?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Tournage professionnel gratuit</h3>
                  <p className="text-muted-foreground">
                    Notre équipe se déplace chez vous avec du matériel professionnel pour créer une vidéo immersive de votre logement.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Mise en valeur premium</h3>
                  <p className="text-muted-foreground">
                    Votre logement sera présenté comme un lieu d'exception avec un contenu visuel de haute qualité.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Visibilité accrue</h3>
                  <p className="text-muted-foreground">
                    Bénéficiez de notre audience qualifiée à la recherche d'expériences uniques et de logements atypiques.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Contenu réutilisable</h3>
                  <p className="text-muted-foreground">
                    Les vidéos créées peuvent être utilisées sur vos propres canaux de communication.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Contactez-nous</CardTitle>
              <CardDescription>
                Remplissez ce formulaire et nous vous contacterons rapidement pour organiser le tournage gratuit de votre logement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium mb-2">
                    Type de logement *
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    required
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Sélectionnez</option>
                    <option value="cabane">Cabane dans les arbres</option>
                    <option value="tiny-house">Tiny house</option>
                    <option value="loft">Loft atypique</option>
                    <option value="maison-architecte">Maison d'architecte</option>
                    <option value="yourte">Yourte</option>
                    <option value="dome">Dôme géodésique</option>
                    <option value="maison-flottante">Maison flottante</option>
                    <option value="maison-troglodyte">Maison troglodyte</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Description de votre logement *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    placeholder="Décrivez ce qui rend votre logement unique et exceptionnel..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-2">
                    Localisation *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    placeholder="Ville, Région"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 min-w-0">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Téléphone *
                    </label>
                    <div className="flex gap-2">
                      <select
                        name="phoneCountry"
                        value={formData.phoneCountry}
                        onChange={handleChange}
                        className="w-24 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="FR">+33</option>
                        <option value="BE">+32</option>
                        <option value="CH">+41</option>
                        <option value="LU">+352</option>
                        <option value="CA">+1</option>
                      </select>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        placeholder={phonePatterns[formData.phoneCountry as keyof typeof phonePatterns].placeholder}
                        value={formData.phone}
                        onChange={handleChange}
                        className="flex-1 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Format: {phonePatterns[formData.phoneCountry as keyof typeof phonePatterns].example}
                    </p>
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium mb-2">
                      Site web (optionnel)
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="flex-1 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
                  <p className="font-medium mb-2">Ce que nous vous offrons :</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Tournage vidéo professionnel gratuit</li>
                    <li>Photos haute qualité de votre logement</li>
                    <li>Mise en avant sur notre plateforme</li>
                    <li>Contenu réutilisable pour vos réseaux sociaux</li>
                  </ul>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Partenariat;
