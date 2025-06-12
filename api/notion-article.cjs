const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');
require('dotenv').config();

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});
const databaseId = process.env.NOTION_DATABASE_ID;

async function getArticleById(id) {
  const page = await notion.pages.retrieve({ page_id: id });
  const blocks = await notion.blocks.children.list({ block_id: id });
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const mdBlocks = await n2m.pageToMarkdown(id);
  const mdString = n2m.toMarkdownString(mdBlocks);
  const properties = page.properties;
  return {
    id: page.id,
    titre: properties.Titre?.title[0]?.plain_text || '',
    date: properties.Date?.date?.start || '',
    statut: properties.Statut?.status?.name || '',
    tags: properties.Tags?.select?.name || '',
    meta: properties["Meta-description"]?.rich_text[0]?.plain_text || '',
    slug: properties["/slug"]?.rich_text[0]?.plain_text || '',
    author: (properties.Author?.people[0]?.name) || '',
    url: page.url,
    content: blocks.results.map((b) => b[b.type]?.rich_text?.map((t) => t.plain_text).join('') || '').join('\n\n'),
    contentMarkdown: mdString,
    image: page.cover
      ? (page.cover.type === 'external'
          ? page.cover.external.url
          : page.cover.file.url)
      : null,
  };
}

async function getArticleBySlug(slug) {
  // Rechercher l'article par slug dans la base de données Notion
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "/slug",
      rich_text: {
        equals: slug,
      },
    },
  });

  // Vérifier si on a trouvé un article correspondant
  if (!response.results || response.results.length === 0) {
    throw new Error(`Article with slug "${slug}" not found`);
  }

  // Utiliser la fonction existante pour récupérer les détails complets
  const id = response.results[0].id;
  return getArticleById(id);
}

module.exports = async (req, res) => {
  try {
    let article;
    
    // Vérifier si on a un ID ou un slug
    if (req.query.id) {
      article = await getArticleById(req.query.id);
    } else if (req.query.slug) {
      article = await getArticleBySlug(req.query.slug);
    } else {
      res.status(400).end(JSON.stringify({ error: 'Missing id or slug parameter' }));
      return;
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).end(JSON.stringify(article));
  } catch (e) {
    res.status(500).end(JSON.stringify({ error: e.message }));
  }
}; 