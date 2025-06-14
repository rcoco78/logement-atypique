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
    (page) => `<url><loc>${baseUrl}/${page}</loc></url>`
  );

  try {
    // Ajout des URLs des articles
    const articles = await fetchArticles();
    urls = urls.concat(
      articles.map(
        (article) => `<url><loc>${baseUrl}/blog/${article.slug}</loc></url>`
      )
    );
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
  }

  // Ajout des URLs des logements
  const logements = getLogements();
  urls = urls.concat(
    logements.map(
      (logement) => `<url><loc>${baseUrl}/logement/${logement.slug}</loc></url>`
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