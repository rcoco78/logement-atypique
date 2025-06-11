import React from 'react';

const articles = [
  { id: 1, title: "Logement-atypique, la plateforme qui met en lumière les lieux insolites", source: "Le Figaro", url: "#" },
  { id: 2, title: "Des vidéos pour découvrir des hébergements uniques", source: "Le Parisien", url: "#" },
  { id: 3, title: "La nouvelle vitrine des logements d'exception", source: "Elle Décoration", url: "#" },
];

const Presse = () => (
  <div className="min-h-screen bg-background py-16 px-4">
    <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">Presse</h1>
    <div className="max-w-3xl mx-auto mb-12">
      <div className="flex flex-wrap justify-center gap-8 mb-8">
        {/* Exemples de logos presse */}
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Le_Figaro_logo.png" alt="Le Figaro" className="h-10" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Le_Parisien_logo.png" alt="Le Parisien" className="h-10" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Elle_Decoration_logo.png" alt="Elle Décoration" className="h-10" />
      </div>
      <div className="space-y-6">
        {articles.map((a) => (
          <a key={a.id} href={a.url} className="block bg-white/80 rounded-xl shadow p-6 hover:bg-primary/10 transition">
            <div className="text-lg font-semibold text-primary mb-1">{a.title}</div>
            <div className="text-muted-foreground text-sm">{a.source}</div>
          </a>
        ))}
      </div>
    </div>
    <div className="text-center mt-12">
      <h2 className="text-xl font-semibold mb-2">Contact presse</h2>
      <p className="text-muted-foreground">Pour toute demande presse, contactez-nous à <a href="mailto:presse@logement-atypique.fr" className="text-primary underline">presse@logement-atypique.fr</a></p>
    </div>
  </div>
);

export default Presse; 