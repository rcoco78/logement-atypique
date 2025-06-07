import React from 'react';
import { useParams, Link } from 'react-router-dom';

const fakeArticles = [
  {
    id: '1',
    title: "Dormir dans une cabane perchée : l'expérience ultime",
    cover: "https://groupeconfiance.fr/wp-content/uploads/2023/12/logement-insolite.jpg",
    date: "2024-06-01",
    author: "Corentin Robert",
    category: "Inspiration",
    excerpt: "Découvrez pourquoi les cabanes dans les arbres séduisent de plus en plus d'aventuriers en quête d'insolite.",
    content: `Passer une nuit dans une cabane perchée, c'est renouer avec l'enfance, l'aventure et la nature. Les cabanes modernes offrent tout le confort nécessaire pour un séjour inoubliable, tout en préservant l'esprit d'évasion.\n\nQue vous soyez en couple, en famille ou entre amis, l'expérience promet d'être unique. Pensez à réserver à l'avance, ces hébergements sont très prisés !`
  },
  {
    id: '2',
    title: "Top 5 des logements atypiques en France",
    cover: "https://www.esprit-insolite.com/wp-content/uploads/2023/08/investir-hebergement-insolite.jpg",
    date: "2024-05-20",
    author: "Julie Martin",
    category: "Sélection",
    excerpt: "De la yourte mongole au phare breton, notre sélection des hébergements les plus originaux.",
    content: `La France regorge de logements insolites : yourtes, phares, péniches, bulles transparentes... Découvrez notre top 5 pour un séjour hors du commun !\n\nChaque lieu a été sélectionné pour son originalité et la qualité de l'accueil.`
  },
  {
    id: '3',
    title: "Conseils pour un week-end insolite réussi",
    cover: "https://www.immoba.fr/site/images/normal/Picture39749949jpg_5ed907db5699a.jpg",
    date: "2024-05-10",
    author: "Alex Dupont",
    category: "Conseils",
    excerpt: "Préparez votre escapade atypique avec nos astuces pratiques et nos bonnes adresses.",
    content: `Pour un week-end insolite réussi, anticipez la météo, prévoyez des activités adaptées et laissez-vous surprendre par l'inattendu.\n\nN'hésitez pas à consulter les avis et à contacter les hôtes pour personnaliser votre séjour.`
  }
];

const Article = () => {
  const { id } = useParams();
  const article = fakeArticles.find(a => a.id === id) || fakeArticles[0];

  return (
    <main className="pt-40 pb-16 px-4 max-w-3xl mx-auto">
      {/* Hero de l'article */}
      <section className="mb-8">
        <div className="relative w-full h-56 md:h-80 rounded-2xl overflow-hidden shadow-lg mb-6">
          <img src={article.cover} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
            <span className="text-sm text-white/80">{article.category}</span>
            <h1 className="text-2xl md:text-4xl font-bold text-white mt-2">{article.title}</h1>
            <div className="flex items-center gap-4 mt-2 text-white/70 text-sm">
              <span>{article.author}</span>
              <span>•</span>
              <span>{new Date(article.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </section>
      {/* Contenu */}
      <article className="prose prose-lg max-w-none text-foreground/90">
        {article.content.split('\n').map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </article>
      <div className="mt-8">
        <Link to="/blog" className="text-primary font-semibold hover:underline">← Retour au blog</Link>
      </div>
    </main>
  );
};

export default Article; 