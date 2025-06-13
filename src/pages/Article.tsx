import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";

const markdownImageStyle = `
.markdown-rendered img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 2rem auto;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  cursor: zoom-in;
  transition: transform 0.2s;
}
.markdown-rendered img.expanded {
  transform: scale(2);
  z-index: 10;
  cursor: zoom-out;
}
`;

const Article = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      setLoading(true);
      const res = await fetch(`/api/notion-article?slug=${slug}`);
      const data = await res.json();
      setArticle(data);
      setLoading(false);
    }
    if (slug) fetchArticle();
  }, [slug]);

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
      <span className="text-muted-foreground text-lg">Chargement de l'article...</span>
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

  if (loading) return <><style>{bounceStyle}</style><LoaderMaison /></>;
  if (!article) return <div className="pt-40 text-center">Article introuvable.</div>;

  return (
    <main className="pt-40 pb-16 px-4 max-w-3xl mx-auto">
      <style>{markdownImageStyle}</style>
      {/* Bannière immersive avec image de couverture et overlay */}
      <section className="mb-8">
        <div className="relative w-full h-56 md:h-80 rounded-2xl overflow-hidden shadow-lg mb-6">
          {article.image && (
            <img
              src={article.image}
              alt={article.titre}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
            <span className="text-sm text-white/80">{article.tags}</span>
            <h1 className="text-2xl md:text-4xl font-bold text-white mt-2">{article.titre}</h1>
            <div className="flex items-center gap-4 mt-2 text-white/70 text-sm">
              <span>{article.author}</span>
              <span>•</span>
              <span>{new Date(article.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </section>
      {/* Contenu de l'article en markdown */}
      <article>
        {article.contentMarkdown && typeof article.contentMarkdown.parent === 'string'
          ? <MarkdownRenderer>{article.contentMarkdown.parent}</MarkdownRenderer>
          : article.content}
      </article>
      {/* Lien retour */}
      <div className="mt-8">
        <Link className="text-primary font-semibold hover:underline" to="/blog">← Retour au blog</Link>
      </div>
    </main>
  );
};

export default Article; 