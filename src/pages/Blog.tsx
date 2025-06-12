import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LoaderMaison = () => (
  <div className="flex flex-col items-center justify-center py-32">
    <svg
      className="animate-bounce-smooth h-16 w-16 text-primary mb-4"
      width="64" height="64" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="7" y="14" width="18" height="12" rx="2" fill="#8B5A3C"/>
      <polygon points="16,6 4,16 6,18 16,10 26,18 28,16" fill="#D4A574"/>
      <rect x="13" y="20" width="6" height="6" rx="1" fill="#FEFCFA"/>
    </svg>
    <span className="text-muted-foreground text-lg">Chargement des articles...</span>
  </div>
);

const bounceStyle = `
@keyframes bounce-smooth {
  0%, 100% { transform: translateY(0); }
  20% { transform: translateY(-12px); }
  40% { transform: translateY(0); }
  60% { transform: translateY(-6px); }
  80% { transform: translateY(0); }
}
.animate-bounce-smooth {
  animation: bounce-smooth 1.4s infinite;
}
`;

const Blog = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      const res = await fetch('/api/notion-articles');
      const data = await res.json();
      setArticles(data);
      setLoading(false);
    }
    fetchArticles();
  }, []);

  if (loading) {
    return <>
      <style>{bounceStyle}</style>
      <LoaderMaison />
    </>;
  }

  const bannerArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <main className="pt-40 pb-16 px-4 max-w-7xl mx-auto">
      {/* Hero section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Le blog du logement atypique</h1>
        <p className="text-xl text-muted-foreground mb-6">Inspiration, conseils et découvertes pour vos séjours hors du commun</p>
      </section>

      {/* Bannière spéciale pour le premier article */}
      {bannerArticle && (
        <section className="mb-12">
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg mb-6">
            {/* Image de couverture en fond */}
            {bannerArticle.image && (
              <img
                src={bannerArticle.image}
                alt={bannerArticle.titre}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
              <span className="text-sm text-white/80">{bannerArticle.tags}</span>
              <h2 className="text-2xl md:text-4xl font-bold text-white mt-2">{bannerArticle.titre}</h2>
              <p className="text-lg text-white/90 mt-2">{bannerArticle.meta}</p>
              <div className="flex items-center gap-4 mt-4 text-white/70 text-sm">
                <span>{bannerArticle.author}</span>
                <span>•</span>
                <span>{new Date(bannerArticle.date).toLocaleDateString()}</span>
              </div>
              <Link to={`/article/${bannerArticle.slug}`} className="mt-4 inline-block bg-white text-primary font-semibold px-6 py-2 rounded-full shadow hover:bg-primary hover:text-white transition">Lire l'article</Link>
            </div>
          </div>
        </section>
      )}

      {/* Grille d'articles (sauf le premier) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherArticles.map(article => (
          <div key={article.id} className="bg-background border border-border rounded-xl shadow p-4 flex flex-col">
            {/* Image de couverture si présente */}
            {article.image && (
              <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-3 bg-muted flex items-center justify-center">
                <img
                  src={article.image}
                  alt={article.titre}
                  className="w-full h-full object-cover"
                  style={{ minHeight: 80, background: '#e5e5e5' }}
                />
              </div>
            )}
            <span className="text-xs text-muted-foreground mb-2">{article.tags}</span>
            <h3 className="text-xl font-bold mb-2 line-clamp-2">{article.titre}</h3>
            <p className="text-base text-muted-foreground mb-4 line-clamp-3">{article.meta}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <span>{article.author}</span>
              <span>•</span>
              <span>{new Date(article.date).toLocaleDateString()}</span>
            </div>
            <Link to={`/article/${article.slug}`} className="mt-auto inline-block text-primary font-semibold hover:underline">Lire l'article</Link>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Blog; 