import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";

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

  // Effet pour ajouter le comportement de zoom aux images après le rendu
  useEffect(() => {
    if (!loading && article) {
      // Timeout pour s'assurer que le contenu est bien rendu
      setTimeout(() => {
        const articleImages = document.querySelectorAll('.markdown-rendered img');
        
        articleImages.forEach(img => {
          // Ajouter le comportement de zoom si ce n'est pas déjà fait
          if (!img.getAttribute('onclick')) {
            img.setAttribute('onclick', 
              "if(this.classList.contains('expanded')) { this.classList.remove('expanded'); } else { this.classList.add('expanded'); }"
            );
          }
          
          // S'assurer que l'image est dans un conteneur
          if (!img.closest('.image-container') && img.parentElement && !img.parentElement.classList.contains('image-container')) {
            const container = document.createElement('div');
            container.className = 'image-container';
            img.parentElement.insertBefore(container, img);
            container.appendChild(img);
          }
          
          // Réparer les URLs malformées
          const src = img.getAttribute('src');
          if (src) {
            // Vérifier si l'URL est fragmentée (contient des balises HTML ou n'est pas complète)
            if (src.includes('&lt;') || src.includes('&gt;') || src.includes('<em') || 
                (src.includes('prod-files-secure.s3') && !src.includes('?X-Amz-Algorithm'))) {
              
              // Chercher le texte suivant qui pourrait être la suite de l'URL
              let nextNode = img.nextSibling;
              let remainingUrl = '';
              
              // Collecter le texte qui pourrait faire partie de l'URL
              while (nextNode) {
                if (nextNode.nodeType === Node.TEXT_NODE) {
                  remainingUrl += nextNode.textContent || '';
                } else if (nextNode.nodeType === Node.ELEMENT_NODE) {
                  // Si c'est une balise, prendre son contenu texte
                  remainingUrl += nextNode.textContent || '';
                }
                
                // Si on trouve la fin de l'URL, arrêter
                if (remainingUrl.includes('&X-Amz-Signature=')) {
                  remainingUrl = remainingUrl.substring(0, remainingUrl.indexOf('&X-Amz-Signature=') + 
                    remainingUrl.substring(remainingUrl.indexOf('&X-Amz-Signature=')).indexOf('"'));
                  break;
                }
                
                nextNode = nextNode.nextSibling;
              }
              
              // Reconstruire l'URL complète
              const fullUrl = (src + remainingUrl).replace(/\s/g, '');
              
              // Nettoyer l'URL des balises HTML
              const cleanUrl = fullUrl
                .replace(/<[^>]*>/g, '') // Enlever toutes les balises HTML
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>');
              
              // Appliquer l'URL corrigée
              img.setAttribute('src', cleanUrl);
              
              // Nettoyer les nœuds texte qui ont été utilisés pour l'URL
              nextNode = img.nextSibling;
              while (nextNode && remainingUrl.includes(nextNode.textContent || '')) {
                const nodeToRemove = nextNode;
                nextNode = nextNode.nextSibling;
                if (nodeToRemove.parentNode) {
                  nodeToRemove.parentNode.removeChild(nodeToRemove);
                }
              }
            }
          }
        });
        
        // Nettoyer spécifiquement le HTML autour des images Notion
        const articleContent = document.querySelector('.markdown-rendered');
        if (articleContent) {
          // Rechercher des textes qui ressemblent à des fragments d'URL Notion
          const textNodes = [];
          const findTextNodes = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              if ((node.textContent || '').includes('prod-files-secure.s3') || 
                  (node.textContent || '').includes('X-Amz-Algorithm') || 
                  (node.textContent || '').includes('X-Amz-Signature')) {
                textNodes.push(node);
              }
            } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'IMG') {
              for (const child of node.childNodes) {
                findTextNodes(child);
              }
            }
          };
          
          findTextNodes(articleContent);
          
          // Supprimer ces fragments d'URL
          textNodes.forEach(node => {
            if (node.parentNode) {
              node.parentNode.removeChild(node);
            }
          });
        }
      }, 500);
    }
  }, [loading, article]);

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
      <article className="prose prose-lg max-w-none text-foreground/90">
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