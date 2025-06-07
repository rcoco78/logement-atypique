module.exports = async function handler(req, res) {
  const staticPages = [
    '',
    'logements',
    'blog',
    'partenariat'
  ];

  const articles = [
    { slug: 'mon-premier-article' },
    { slug: 'un-autre-article' }
  ];

  const baseUrl = 'https://www.logement-atypique.fr';

  let urls = staticPages.map(
    (page) => `<url><loc>${baseUrl}/${page}</loc></url>`
  );

  urls = urls.concat(
    articles.map(
      (article) => `<url><loc>${baseUrl}/article/${article.slug}</loc></url>`
    )
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(sitemap);
} 