const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
  const baseUrl = 'https://www.logement-atypique.fr';

  // Pages statiques du site
  const staticPages = [
    '',
    'logements',
    'blog',
    'partenariat',
    'contact',
    'equipe',
    'mentions-legales',
    'conditions',
    'temoignages',
    'faq',
    'donnees-publiques'
  ];

  // Récupération des articles de blog
  const articlesDir = path.join(process.cwd(), 'src/content/blog');
  let articles = [];
  
  try {
    const files = fs.readdirSync(articlesDir);
    articles = files
      .filter(file => file.endsWith('.md'))
      .map(file => ({
        slug: file.replace('.md', '')
      }));
  } catch (error) {
    console.error('Erreur lors de la lecture des articles:', error);
  }

  // Récupération des logements
  const logementsDir = path.join(process.cwd(), 'src/content/logements');
  let logements = [];
  
  try {
    const files = fs.readdirSync(logementsDir);
    logements = files
      .filter(file => file.endsWith('.md'))
      .map(file => ({
        slug: file.replace('.md', '')
      }));
  } catch (error) {
    console.error('Erreur lors de la lecture des logements:', error);
  }

  // Génération des URLs
  let urls = staticPages.map(
    (page) => `<url><loc>${baseUrl}/${page}</loc></url>`
  );

  // Ajout des URLs des articles
  urls = urls.concat(
    articles.map(
      (article) => `<url><loc>${baseUrl}/article/${article.slug}</loc></url>`
    )
  );

  // Ajout des URLs des logements
  urls = urls.concat(
    logements.map(
      (logement) => `<url><loc>${baseUrl}/logement/${logement.slug}</loc></url>`
    )
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(sitemap);
} 