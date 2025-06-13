const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');
const { put } = require('@vercel/blob');
require('dotenv').config();

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});
const databaseId = process.env.NOTION_DATABASE_ID;

async function getFullArticle(article) {
  const page = await notion.pages.retrieve({ page_id: article.id });
  const blocks = await notion.blocks.children.list({ block_id: article.id });
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const mdBlocks = await n2m.pageToMarkdown(article.id);
  const mdString = n2m.toMarkdownString(mdBlocks);
  const properties = page.properties;
  return {
    ...article,
    content: blocks.results.map((b) => b[b.type]?.rich_text?.map((t) => t.plain_text).join('') || '').join('\n\n'),
    contentMarkdown: mdString,
  };
}

async function fetchAndSaveArticles() {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Statut",
      status: {
        equals: "Publié",
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });
  const articles = response.results.map((a) => ({
    id: a.id,
    titre: a.properties.Titre?.title[0]?.plain_text || '',
    date: a.properties.Date?.date?.start || '',
    statut: a.properties.Statut?.status?.name || '',
    tags: a.properties.Tags?.select?.name || '',
    meta: a.properties["Meta-description"]?.rich_text[0]?.plain_text || '',
    slug: a.properties["/slug"]?.rich_text[0]?.plain_text || '',
    author: (a.properties.Author?.people[0]?.name) || '',
    url: a.url,
    image: a.cover
      ? (a.cover.type === 'external'
          ? a.cover.external.url
          : a.cover.file.url)
      : null,
  }));
  // Sauvegarde la liste dans Vercel Blob
  await put('articles.json', JSON.stringify(articles, null, 2), { access: 'public', allowOverwrite: true });
  console.log('Nombre d\'articles à traiter :', articles.length);
  // Pour chaque article, sauvegarde le contenu complet dans le blob store (en parallèle)
  await Promise.all(articles.map(async (article) => {
    try {
      console.log(`Début traitement : ${article.slug}`);
      const fullArticle = await getFullArticle(article);
      await put(`articles/${article.slug}.json`, JSON.stringify(fullArticle, null, 2), { access: 'public', allowOverwrite: true });
      console.log(`Article sauvegardé : ${article.slug}`);
    } catch (e) {
      console.error(`Erreur pour l'article ${article.slug} :`, e);
    }
  }));
  return articles.length;
}

module.exports = async (req, res) => {
  try {
    // Sécurité : optionnel, vérifier un secret si besoin
    const nb = await fetchAndSaveArticles();
    res.status(200).json({ ok: true, count: nb });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}; 