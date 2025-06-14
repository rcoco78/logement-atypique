const fs = require('fs');
const path = require('path');
const https = require('https');

const baseUrl = 'https://www.logement-atypique.fr';

// Liste des pages statiques
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

// Configuration des priorités et fréquences par type de page
const pageConfig = {
  home: { priority: '1.0', changefreq: 'daily' },
  logements: { priority: '0.9', changefreq: 'daily' },
  blog: { priority: '0.8', changefreq: 'weekly' },
  partenariat: { priority: '0.7', changefreq: 'monthly' },
  contact: { priority: '0.6', changefreq: 'monthly' },
  equipe: { priority: '0.6', changefreq: 'monthly' },
  mentions: { priority: '0.3', changefreq: 'yearly' },
  conditions: { priority: '0.3', changefreq: 'yearly' },
  temoignages: { priority: '0.7', changefreq: 'weekly' },
  faq: { priority: '0.7', changefreq: 'monthly' },
  donnees: { priority: '0.6', changefreq: 'weekly' }
};

// Fonction pour obtenir la configuration d'une page
function getPageConfig(page) {
  if (page === '') return pageConfig.home;
  if (page === 'logements') return pageConfig.logements;
  if (page === 'blog') return pageConfig.blog;
  if (page === 'partenariat') return pageConfig.partenariat;
  if (page === 'contact') return pageConfig.contact;
  if (page === 'equipe') return pageConfig.equipe;
  if (page === 'mentions-legales') return pageConfig.mentions;
  if (page === 'conditions') return pageConfig.conditions;
  if (page === 'temoignages') return pageConfig.temoignages;
  if (page === 'faq') return pageConfig.faq;
  if (page === 'donnees-publiques') return pageConfig.donnees;
  return { priority: '0.5', changefreq: 'monthly' }; // Valeur par défaut
}

// Fonction pour récupérer les articles depuis Vercel Blob
function fetchArticles() {
  return new Promise((resolve, reject) => {
    https.get('https://fgrljvjcups3orgs.public.blob.vercel-storage.com/articles.json', (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const articles = JSON.parse(data);
          resolve(articles);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Fonction pour lire les logements
function getLogements() {
  try {
    const logementsDir = path.join(process.cwd(), 'src/content/logements');
    const files = fs.readdirSync(logementsDir);
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => ({
        slug: file.replace('.md', '')
      }));
  } catch (error) {
    console.error('Erreur lors de la lecture des logements:', error);
    return [];
  }
}

// Fonction principale pour générer le sitemap
async function generateSitemap() {
  let urls = staticPages.map(
    (page) => {
      const config = getPageConfig(page);
      return `<url>
  <loc>${baseUrl}/${page}</loc>
  <priority>${config.priority}</priority>
  <changefreq>${config.changefreq}</changefreq>
</url>`;
    }
  );

  try {
    // Ajout des URLs des articles
    const articles = await fetchArticles();
    urls = urls.concat(
      articles.map(
        (article) => `<url>
  <loc>${baseUrl}/blog/${article.slug}</loc>
  <priority>0.8</priority>
  <changefreq>weekly</changefreq>
</url>`
      )
    );
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
  }

  // Ajout des URLs des logements
  const logements = getLogements();
  urls = urls.concat(
    logements.map(
      (logement) => `<url>
  <loc>${baseUrl}/logement/${logement.slug}</loc>
  <priority>0.9</priority>
  <changefreq>daily</changefreq>
</url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

// Export de la fonction pour Vercel
module.exports = async (req, res) => {
  try {
    const sitemap = await generateSitemap();
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Erreur lors de la génération du sitemap:', error);
    res.status(500).send('Erreur lors de la génération du sitemap');
  }
}; 