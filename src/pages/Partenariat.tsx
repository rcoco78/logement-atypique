
import { useState } from 'react';
import { Camera, Heart, Star, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Partenariat = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyName: '',
    location: '',
    propertyType: '',
    description: '',
    website: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici on traiterait l'envoi du formulaire
    setIsSubmitted(true);
  };

  const benefits = [
    {
      icon: Camera,
      title: "Tournage professionnel gratuit",
      description: "Notre équipe se déplace chez vous pour créer des contenus visuels d'exception (photos et vidéos)."
    },
    {
      icon: Star,
      title: "Mise en avant premium",
      description: "Votre logement rejoint notre sélection exclusive et bénéficie d'une visibilité optimale."
    },
    {
      icon: Heart,
      title: "Storytelling sur-mesure",
      description: "Nous créons l'histoire unique de votre lieu pour toucher émotionnellement nos visiteurs."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Rejoignez notre sélection d'exception
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Vous possédez un logement atypique ? Faites-le découvrir au monde entier grâce à notre expertise en contenus visuels et notre communauté passionnée.
          </p>
          <div className="flex items-center justify-center space-x-2 text-primary">
            <Camera className="h-6 w-6" />
            <span className="font-semibold">100% gratuit • Tournage professionnel • Visibilité garantie</span>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Pourquoi nous choisir ?</h2>
          <p className="text-muted-foreground text-lg">
            Bien plus qu'une simple plateforme, nous créons l'expérience visuelle de votre lieu
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center border-border">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Présentez-nous votre lieu</h2>
            <p className="text-muted-foreground">
              Remplissez ce formulaire et notre équipe vous contactera rapidement
            </p>
          </div>

          {!isSubmitted ? (
            <Card className="border-border">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nom complet *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Type de logement *</label>
                      <select
                        name="propertyType"
                        required
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                      >
                        <option value="">Sélectionnez...</option>
                        <option value="cabane">Cabane perchée</option>
                        <option value="tiny-house">Tiny house</option>
                        <option value="yourte">Yourte</option>
                        <option value="dome">Dôme</option>
                        <option value="loft">Loft atypique</option>
                        <option value="maison-architecte">Maison d'architecte</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nom du logement *</label>
                      <input
                        type="text"
                        name="propertyName"
                        required
                        value={formData.propertyName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Localisation *</label>
                      <input
                        type="text"
                        name="location"
                        required
                        placeholder="Région, département..."
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Site web (optionnel)</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Décrivez votre logement et ce qui le rend unique *
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                      placeholder="Parlez-nous de l'histoire de votre lieu, de son architecture, de son environnement..."
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    Soumettre ma candidature
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border text-center">
              <CardContent className="p-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Merci pour votre candidature !</h3>
                <p className="text-muted-foreground">
                  Notre équipe va examiner votre dossier et vous contactera dans les 48h.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Notre processus</h2>
          <p className="text-muted-foreground">Simple, rapide et entièrement gratuit</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="font-semibold mb-2">Candidature</h3>
            <p className="text-sm text-muted-foreground">Vous remplissez le formulaire avec les détails de votre logement</p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="font-semibold mb-2">Sélection</h3>
            <p className="text-sm text-muted-foreground">Notre équipe évalue votre lieu et vous contacte rapidement</p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="font-semibold mb-2">Tournage</h3>
            <p className="text-sm text-muted-foreground">Nous planifions la session photo/vidéo et la mise en ligne</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partenariat;
