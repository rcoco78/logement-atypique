import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Star, Users, Camera } from 'lucide-react';

const Partenariat = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    location: '',
    description: '',
    website: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          typeLogement: formData.propertyType,
          localisation: formData.location,
          siteWeb: formData.website,
          description: formData.description
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de l\'envoi du formulaire');
      }

      alert('Merci pour votre demande ! Nous vous contacterons rapidement.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        location: '',
        description: '',
        website: ''
      });
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
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
                Remplissez ce formulaire et nous vous contacterons rapidement pour organiser le tournage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
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
                      <option value="autre">Autre</option>
                    </select>
                  </div>
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
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
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
                    placeholder="Décrivez ce qui rend votre logement unique..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Envoyer ma demande
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
