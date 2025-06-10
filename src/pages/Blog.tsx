import React from 'react';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: "Dormir dans une cabane perchée : l'expérience ultime",
    excerpt: "Découvrez pourquoi les cabanes dans les arbres séduisent de plus en plus d'aventuriers en quête d'insolite.",
    cover: "https://groupeconfiance.fr/wp-content/uploads/2023/12/logement-insolite.jpg",
    date: "2024-06-01",
    author: "Corentin Robert",
    category: "Inspiration"
  },
  {
    id: 2,
    title: "Top 5 des logements atypiques en France",
    excerpt: "De la yourte mongole au phare breton, notre sélection des hébergements les plus originaux.",
    cover: "https://www.esprit-insolite.com/wp-content/uploads/2023/08/investir-hebergement-insolite.jpg",
    date: "2024-05-20",
    author: "Julie Martin",
    category: "Sélection"
  },
  {
    id: 3,
    title: "Conseils pour un week-end insolite réussi",
    excerpt: "Préparez votre escapade atypique avec nos astuces pratiques et nos bonnes adresses.",
    cover: "https://www.immoba.fr/site/images/normal/Picture39749949jpg_5ed907db5699a.jpg",
    date: "2024-05-10",
    author: "Alex Dupont",
    category: "Conseils"
  },
  {
    id: 4,
    title: "Dormir dans un phare : une nuit au bout du monde",
    excerpt: "Vivez l'aventure unique d'une nuit dans un phare, entre ciel et mer.",
    cover: "https://www.ouest-france.fr/images/2023/07/10/une-nuit-dans-un-phare.jpg",
    date: "2024-06-10",
    author: "Sophie Lemoine",
    category: "Expérience"
  }
];

const Blog = () => {
  const bannerArticle = articles.find(a => a.id === 4);

  return (
    <main className="pt-40 pb-16 px-4 max-w-7xl mx-auto">
      {/* Hero section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Le blog du logement atypique</h1>
        <p className="text-xl text-muted-foreground mb-6">Inspiration, conseils et découvertes pour vos séjours hors du commun</p>
      </section>

      {/* Bannière spéciale pour le 4ème article */}
      <section className="mb-12">
        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg mb-6">
          <img src={bannerArticle.cover} alt={bannerArticle.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
            <span className="text-sm text-white/80">{bannerArticle.category}</span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mt-2">{bannerArticle.title}</h2>
            <p className="text-lg text-white/90 mt-2">{bannerArticle.excerpt}</p>
            <div className="flex items-center gap-4 mt-4 text-white/70 text-sm">
              <span>{bannerArticle.author}</span>
              <span>•</span>
              <span>{new Date(bannerArticle.date).toLocaleDateString()}</span>
            </div>
            <Link to={`/article/${bannerArticle.id}`} className="mt-4 inline-block bg-white text-primary font-semibold px-6 py-2 rounded-full shadow hover:bg-primary hover:text-white transition">Lire l'article</Link>
          </div>
        </div>
      </section>

      {/* Grille d'articles (sauf le 4ème) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.filter(a => a.id !== 4).map(article => (
          <div key={article.id} className="bg-background border border-border rounded-xl shadow p-4 flex flex-col">
            <img src={article.cover} alt={article.title} className="w-full h-40 object-cover rounded-lg mb-4" />
            <span className="text-xs text-muted-foreground mb-2">{article.category}</span>
            <h3 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h3>
            <p className="text-base text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <span>{article.author}</span>
              <span>•</span>
              <span>{new Date(article.date).toLocaleDateString()}</span>
            </div>
            <Link to={`/article/${article.id}`} className="mt-auto inline-block text-primary font-semibold hover:underline">Lire l'article</Link>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Blog; 