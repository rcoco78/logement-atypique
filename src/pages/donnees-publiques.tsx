import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";

interface Logement {
  id: number;
  nom: string;
  region: string;
  clics: number;
  image: string;
  type: string;
  evolution: number; // en pourcentage
  videoId: string;
  visites: number;
}

const DonneesPubliques = () => {
  const [visitorTimeRange, setVisitorTimeRange] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [socialTimeRange, setSocialTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [timeRange, setTimeRange] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [visibleNetworks, setVisibleNetworks] = useState({
    instagram: true,
    tiktok: true,
    youtube: true,
    facebook: true,
    pinterest: true,
    linkedin: true
  });
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Données fictives pour la démonstration
  const totalLogementsFrance = 15000;
  const logementsSurPlateforme = 120;
  const totalVideoViews = 250000;
  const lastUpdate = '14/06/2025';

  // Données d'évolution des visiteurs
  const visitorData = {
    monthly: [
      { date: 'Jan', visiteurs: 1200 },
      { date: 'Fév', visiteurs: 1500 },
      { date: 'Mar', visiteurs: 1800 },
      { date: 'Avr', visiteurs: 2100 },
      { date: 'Mai', visiteurs: 2400 },
      { date: 'Juin', visiteurs: 2700 },
      { date: 'Juil', visiteurs: 3000 },
      { date: 'Août', visiteurs: 3300 },
      { date: 'Sep', visiteurs: 3600 },
      { date: 'Oct', visiteurs: 3900 },
      { date: 'Nov', visiteurs: 4200 },
      { date: 'Déc', visiteurs: 4500 },
    ],
    quarterly: [
      { date: 'T1 2023', visiteurs: 4500 },
      { date: 'T2 2023', visiteurs: 8100 },
      { date: 'T3 2023', visiteurs: 9900 },
      { date: 'T4 2023', visiteurs: 13500 },
      { date: 'T1 2024', visiteurs: 18000 },
      { date: 'T2 2024', visiteurs: 22500 },
    ],
    yearly: [
      { date: '2020', visiteurs: 12000 },
      { date: '2021', visiteurs: 24000 },
      { date: '2022', visiteurs: 36000 },
      { date: '2023', visiteurs: 54000 },
      { date: '2024', visiteurs: 72000 },
    ]
  };

  // Données de croissance des réseaux sociaux
  const socialMediaData = {
    daily: [
      { date: 'Lun', instagram: 10, tiktok: 8, youtube: 6, facebook: 9, pinterest: 4, linkedin: 3 },
      { date: 'Mar', instagram: 12, tiktok: 10, youtube: 8, facebook: 12, pinterest: 5, linkedin: 4 },
      { date: 'Mer', instagram: 14, tiktok: 12, youtube: 10, facebook: 15, pinterest: 6, linkedin: 5 },
      { date: 'Jeu', instagram: 16, tiktok: 14, youtube: 12, facebook: 18, pinterest: 7, linkedin: 6 },
      { date: 'Ven', instagram: 18, tiktok: 16, youtube: 14, facebook: 21, pinterest: 8, linkedin: 7 },
      { date: 'Sam', instagram: 20, tiktok: 18, youtube: 16, facebook: 24, pinterest: 9, linkedin: 8 },
      { date: 'Dim', instagram: 22, tiktok: 20, youtube: 18, facebook: 27, pinterest: 10, linkedin: 9 },
    ],
    weekly: [
      { date: 'Semaine 1', instagram: 70, tiktok: 56, youtube: 42, facebook: 63, pinterest: 28, linkedin: 21 },
      { date: 'Semaine 2', instagram: 84, tiktok: 70, youtube: 56, facebook: 84, pinterest: 35, linkedin: 28 },
      { date: 'Semaine 3', instagram: 98, tiktok: 84, youtube: 70, facebook: 105, pinterest: 42, linkedin: 35 },
      { date: 'Semaine 4', instagram: 112, tiktok: 98, youtube: 84, facebook: 126, pinterest: 49, linkedin: 42 },
    ],
    monthly: [
      { date: 'Jan', instagram: 400, tiktok: 320, youtube: 240, facebook: 360, pinterest: 160, linkedin: 120 },
      { date: 'Fév', instagram: 450, tiktok: 360, youtube: 270, facebook: 405, pinterest: 180, linkedin: 135 },
      { date: 'Mar', instagram: 500, tiktok: 400, youtube: 300, facebook: 450, pinterest: 200, linkedin: 150 },
      { date: 'Avr', instagram: 550, tiktok: 440, youtube: 330, facebook: 495, pinterest: 220, linkedin: 165 },
      { date: 'Mai', instagram: 600, tiktok: 480, youtube: 360, facebook: 540, pinterest: 240, linkedin: 180 },
      { date: 'Juin', instagram: 650, tiktok: 520, youtube: 390, facebook: 585, pinterest: 260, linkedin: 195 },
    ]
  };

  // Données de croissance des biens
  const propertiesData = {
    monthly: [
      { date: 'Jan', biens: 120 },
      { date: 'Fév', biens: 150 },
      { date: 'Mar', biens: 180 },
      { date: 'Avr', biens: 210 },
      { date: 'Mai', biens: 240 },
      { date: 'Juin', biens: 270 },
      { date: 'Juil', biens: 300 },
      { date: 'Août', biens: 330 },
      { date: 'Sep', biens: 360 },
      { date: 'Oct', biens: 390 },
      { date: 'Nov', biens: 420 },
      { date: 'Déc', biens: 450 },
    ],
    quarterly: [
      { date: 'T1 2023', biens: 450 },
      { date: 'T2 2023', biens: 810 },
      { date: 'T3 2023', biens: 990 },
      { date: 'T4 2023', biens: 1350 },
      { date: 'T1 2024', biens: 1800 },
      { date: 'T2 2024', biens: 2250 },
    ],
    yearly: [
      { date: '2020', biens: 1200 },
      { date: '2021', biens: 2400 },
      { date: '2022', biens: 3600 },
      { date: '2023', biens: 5400 },
      { date: '2024', biens: 7200 },
    ]
  };

  // Calcul du nombre moyen de visiteurs
  function getAverageVisitors(data: { [key: string]: { visiteurs: number }[] }, range: string) {
    const arr = data[range] || [];
    if (!arr.length) return 0;
    return Math.round(arr.reduce((acc, curr) => acc + curr.visiteurs, 0) / arr.length);
  }

  const averageVisitors = {
    daily: getAverageVisitors(visitorData, 'daily'),
    weekly: getAverageVisitors(visitorData, 'weekly'),
    monthly: getAverageVisitors(visitorData, 'monthly')
  };

  const topLogements: Logement[] = [
    {
      id: 1,
      nom: 'Tiny House sur la Côte Atlantique',
      region: 'Île d\'Oléron',
      clics: 12500,
      image: 'https://resize.elle.fr/article/var/plain_site/storage/images/deco/pieces/petits-espaces/tiny-house-des-petits-espaces-ultra-inspirants/tiny-house-sur-la-plage/93710601-1-fre-FR/Tiny-house-sur-la-plage.jpg',
      type: 'Tiny house',
      evolution: 15,
      videoId: 'abc123',
      visites: 18750
    },
    {
      id: 2,
      nom: 'Cabane dans les arbres',
      region: 'Bretagne',
      clics: 9800,
      image: 'https://resize.elle.fr/article/var/plain_site/storage/images/deco/pieces/petits-espaces/tiny-house-des-petits-espaces-ultra-inspirants/tiny-house-sur-la-plage/93710601-1-fre-FR/Tiny-house-sur-la-plage.jpg',
      type: 'Cabane',
      evolution: -5,
      videoId: 'def456',
      visites: 14700
    },
    {
      id: 3,
      nom: 'Dôme sous les étoiles',
      region: 'Provence',
      clics: 8500,
      image: 'https://resize.elle.fr/article/var/plain_site/storage/images/deco/pieces/petits-espaces/tiny-house-des-petits-espaces-ultra-inspirants/tiny-house-sur-la-plage/93710601-1-fre-FR/Tiny-house-sur-la-plage.jpg',
      type: 'Dôme',
      evolution: 8,
      videoId: 'ghi789',
      visites: 12750
    }
  ];

  const repartitionRegions = [
    { name: "Île-de-France", value: 35 },
    { name: "Normandie", value: 25 },
    { name: "Bretagne", value: 20 },
    { name: "Loire", value: 15 },
    { name: "Autres", value: 5 }
  ];

  const prixMoyens = [
    { region: "Île-de-France", prix: 250 },
    { region: "Normandie", prix: 180 },
    { region: "Bretagne", prix: 160 },
    { region: "Loire", prix: 170 },
    { region: "Autres", prix: 150 }
  ];

  const COLORS = ['#8B5A3C', '#D4A574', '#FEFCFA', '#A67B5B', '#C4A484'];

  const regionData = [
    { name: 'Île-de-France', value: 25 },
    { name: 'Provence-Alpes-Côte d\'Azur', value: 20 },
    { name: 'Bretagne', value: 15 },
    { name: 'Normandie', value: 12 },
    { name: 'Alsace', value: 10 },
    { name: 'Autres', value: 18 }
  ];

  const regionPrices = [
    { name: 'Île-de-France', averagePrice: 350, count: 25 },
    { name: 'Provence-Alpes-Côte d\'Azur', averagePrice: 280, count: 20 },
    { name: 'Bretagne', averagePrice: 220, count: 15 },
    { name: 'Normandie', averagePrice: 200, count: 12 },
    { name: 'Alsace', averagePrice: 230, count: 10 }
  ];

  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId === selectedVideo ? null : videoId);
  };

  const formatTooltip = (value: number, name: string) => {
    if (name === 'Vues') {
      return `${value.toLocaleString()} vues`;
    } else if (name === 'Logements') {
      return `${value.toLocaleString()} logements`;
    } else if (name === 'Clics') {
      return `${value.toLocaleString()} clics`;
    } else if (name === 'Vues mensuelles') {
      const date = new Date();
      date.setMonth(date.getMonth() - (12 - value));
      return `${value.toLocaleString()} vues (${date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })})`;
    } else if (name === 'Clics mensuels') {
      const date = new Date();
      date.setMonth(date.getMonth() - (12 - value));
      return `${value.toLocaleString()} clics (${date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })})`;
    }
    return `${value.toLocaleString()}`;
  };

  const vuesMensuellesData = [
    { name: 'Janvier 2024', vues: 15000 },
    { name: 'Février 2024', vues: 18000 },
    { name: 'Mars 2024', vues: 22000 },
    { name: 'Avril 2024', vues: 25000 },
    { name: 'Mai 2024', vues: 28000 },
    { name: 'Juin 2024', vues: 30000 },
    { name: 'Juillet 2024', vues: 32000 },
    { name: 'Août 2024', vues: 35000 },
    { name: 'Septembre 2024', vues: 38000 },
    { name: 'Octobre 2024', vues: 40000 },
    { name: 'Novembre 2024', vues: 42000 },
    { name: 'Décembre 2024', vues: 45000 }
  ];

  const clicsMensuelsData = [
    { name: 'Janvier 2024', clics: 5000 },
    { name: 'Février 2024', clics: 6000 },
    { name: 'Mars 2024', clics: 7000 },
    { name: 'Avril 2024', clics: 8000 },
    { name: 'Mai 2024', clics: 9000 },
    { name: 'Juin 2024', clics: 10000 },
    { name: 'Juillet 2024', clics: 11000 },
    { name: 'Août 2024', clics: 12000 },
    { name: 'Septembre 2024', clics: 13000 },
    { name: 'Octobre 2024', clics: 14000 },
    { name: 'Novembre 2024', clics: 15000 },
    { name: 'Décembre 2024', clics: 16000 }
  ];

  return (
    <main className="pt-40 pb-16 px-4 max-w-7xl mx-auto">
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Données publiques</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Découvrez les statistiques et l'évolution de notre plateforme
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Logements atypiques en France</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              {totalLogementsFrance.toLocaleString()}
            </div>
            <p className="text-xs mt-2">
              Estimation basée sur les chiffres de l'INSEE.{' '}
              <a
                href="https://www.insee.fr/fr/statistiques/2011101?geo=FRANCE-1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline ml-1"
              >
                Voir l'article
              </a>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Logements sur la plateforme</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              {logementsSurPlateforme}
            </div>
            <p className="text-xs mt-2">Dernière mise à jour : {lastUpdate}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Visiteurs moyens par mois</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              {averageVisitors.monthly.toLocaleString()}
            </div>
            <p className="text-xs mt-2">Dernière mise à jour : {lastUpdate}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vues totales des vidéos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              {totalVideoViews.toLocaleString()}
            </div>
            <p className="text-xs mt-2">Dernière mise à jour : {lastUpdate}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 mb-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-2xl font-semibold leading-none tracking-tight">Trafic et visibilité</CardTitle>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setVisitorTimeRange('monthly')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    visitorTimeRange === 'monthly'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Mensuel
                </button>
                <button
                  onClick={() => setVisitorTimeRange('quarterly')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    visitorTimeRange === 'quarterly'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Trimestriel
                </button>
                <button
                  onClick={() => setVisitorTimeRange('yearly')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    visitorTimeRange === 'yearly'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Annuel
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={visitorData[visitorTimeRange]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="date" 
                    className="text-sm text-muted-foreground"
                  />
                  <YAxis 
                    className="text-sm text-muted-foreground"
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                    formatter={(value: number) => [value.toLocaleString(), 'Visiteurs']}
                  />
                  <Line
                    type="monotone"
                    dataKey="visiteurs"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 3, fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-right">Dernière mise à jour : {lastUpdate}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 mb-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-2xl font-semibold leading-none tracking-tight">Croissance de notre communauté</CardTitle>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSocialTimeRange('daily')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    socialTimeRange === 'daily'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Quotidien
                </button>
                <button
                  onClick={() => setSocialTimeRange('weekly')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    socialTimeRange === 'weekly'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Hebdomadaire
                </button>
                <button
                  onClick={() => setSocialTimeRange('monthly')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    socialTimeRange === 'monthly'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Mensuel
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={socialMediaData[socialTimeRange]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="date" 
                    className="text-sm text-muted-foreground"
                  />
                  <YAxis 
                    className="text-sm text-muted-foreground"
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                    formatter={(value: number, name: string) => {
                      const networkName = name.charAt(0).toUpperCase() + name.slice(1);
                      return [value.toLocaleString(), networkName];
                    }}
                  />
                  <Legend />
                  {visibleNetworks.instagram && (
                    <Bar dataKey="instagram" name="Instagram" fill="#E1306C" />
                  )}
                  {visibleNetworks.tiktok && (
                    <Bar dataKey="tiktok" name="TikTok" fill="#000000" />
                  )}
                  {visibleNetworks.youtube && (
                    <Bar dataKey="youtube" name="YouTube" fill="#FF0000" />
                  )}
                  {visibleNetworks.facebook && (
                    <Bar dataKey="facebook" name="Facebook" fill="#1877F2" />
                  )}
                  {visibleNetworks.pinterest && (
                    <Bar dataKey="pinterest" name="Pinterest" fill="#E60023" />
                  )}
                  {visibleNetworks.linkedin && (
                    <Bar dataKey="linkedin" name="LinkedIn" fill="#0A66C2" />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-right">Dernière mise à jour : {lastUpdate}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 mb-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-2xl font-semibold leading-none tracking-tight">Croissance de notre catalogue</CardTitle>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setTimeRange('monthly')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    timeRange === 'monthly'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Mensuel
                </button>
                <button
                  onClick={() => setTimeRange('quarterly')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    timeRange === 'quarterly'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Trimestriel
                </button>
                <button
                  onClick={() => setTimeRange('yearly')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    timeRange === 'yearly'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Annuel
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={propertiesData[timeRange]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="date" 
                    className="text-sm text-muted-foreground"
                  />
                  <YAxis 
                    className="text-sm text-muted-foreground"
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                    formatter={(value: number) => [value.toLocaleString(), 'Biens']}
                  />
                  <Line
                    type="monotone"
                    dataKey="biens"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 3, fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-right">Dernière mise à jour : {lastUpdate}</p>
          </CardContent>
        </Card>

        {/* Top 3 des clics logement */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold leading-none tracking-tight">Top 3 des logements les plus consultés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topLogements.map((logement, index) => (
                  <div 
                    key={index} 
                    className="group cursor-pointer"
                    onClick={() => handleVideoClick(logement.videoId)}
                  >
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      {selectedVideo === logement.videoId ? (
                        <div className="w-full aspect-[4/5] md:aspect-[9/16] rounded-lg">
                          <iframe
                            src={`https://www.youtube.com/embed/WEeNQ4oiMKc?autoplay=1&modestbranding=1&rel=0&playsinline=1`}
                            className="w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            frameBorder="0"
                          />
                        </div>
                      ) : (
                        <>
                          <img
                            src={logement.image}
                            alt={logement.nom}
                            className="w-full aspect-[4/5] md:aspect-[9/16] object-cover rounded-lg"
                            style={{ border: 'none', boxShadow: 'none' }}
                          />
                          <div className="absolute top-4 left-4 space-y-2">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-primary text-primary-foreground">
                              Coup de cœur
                            </div>
                            <div className="items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 block w-fit">
                              {logement.type}
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6 text-primary ml-1"
                              >
                                <polygon points="6 3 20 12 6 21 6 3"></polygon>
                              </svg>
                            </div>
                          </div>
                          <div className="absolute top-4 right-4">
                            <div className="rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-primary/90 text-white flex items-center gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-3.5 w-3.5 text-muted-foreground"
                              >
                                <path d="M12 2v4"></path>
                                <path d="M12 18v4"></path>
                                <path d="M4.93 4.93 7.76 7.76"></path>
                                <path d="M16.24 16.24 19.07 19.07"></path>
                                <path d="M2 12h4"></path>
                                <path d="M18 12h4"></path>
                                <path d="M4.93 19.07 7.76 16.24"></path>
                                <path d="M16.24 7.76 19.07 4.93"></path>
                              </svg>
                              Vidéo
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{logement.nom}</h3>
                      <p className="text-muted-foreground text-sm mb-1">{logement.region}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <div className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3.5 w-3.5 text-muted-foreground"
                            >
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            <span className="text-sm text-muted-foreground">{logement.visites.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3.5 w-3.5 text-muted-foreground"
                            >
                              <path d="M12 2v4"></path>
                              <path d="M12 18v4"></path>
                              <path d="M4.93 4.93 7.76 7.76"></path>
                              <path d="M16.24 16.24 19.07 19.07"></path>
                              <path d="M2 12h4"></path>
                              <path d="M18 12h4"></path>
                              <path d="M4.93 19.07 7.76 16.24"></path>
                              <path d="M16.24 7.76 19.07 4.93"></path>
                            </svg>
                            <span className="text-sm text-muted-foreground">{logement.clics.toLocaleString()}</span>
                          </div>
                        </div>
                        <span className={`text-sm font-medium ${logement.evolution >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {logement.evolution >= 0 ? '+' : ''}{logement.evolution}% M-1
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Répartition des logements par région */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold leading-none tracking-tight">Répartition des logements par région</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={regionData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#8884d8"
                      label
                    >
                      {regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default DonneesPubliques;