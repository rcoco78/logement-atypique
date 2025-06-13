const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');
const { get } = require('@vercel/blob');
require('dotenv').config();

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});
const databaseId = process.env.NOTION_DATABASE_ID;

// --- CACHE EN MÉMOIRE PAR SLUG ---
let cache = {};
const CACHE_DURATION = 1000 * 60 * 60; // 1h

async function getArticleFromBlob(slug) {
  try {
    const { blob } = await get(`articles/${slug}.json`);
    if (blob && blob.url) {
      const response = await fetch(blob.url);
      return await response.json();
    }
    return null;
  } catch (e) {
    return null;
  }
}

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
  // Si cache mémoire valide, on le renvoie
  if (cache[slug] && (Date.now() - cache[slug].timestamp < CACHE_DURATION)) {
    return cache[slug].data;
  }
  // Tenter de lire depuis le blob store
  const blobArticle = await getArticleFromBlob(slug);
  if (blobArticle) {
    cache[slug] = { data: blobArticle, timestamp: Date.now() };
    return blobArticle;
  }
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
  if (!response.results || response.results.length === 0) {
    throw new Error(`Article with slug "${slug}" not found`);
  }
  const id = response.results[0].id;
  const article = await getArticleById(id);
  cache[slug] = { data: article, timestamp: Date.now() };
  return article;
}

module.exports = async (req, res) => {
  try {
    let article;
    if (req.query.id) {
      article = await getArticleById(req.query.id);
    } else if (req.query.slug) {
      article = await getArticleBySlug(req.query.slug);
    } else {
      res.status(400).end(JSON.stringify({ error: 'Missing id or slug parameter' }));
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).end(JSON.stringify(article));
  } catch (e) {
    res.status(500).end(JSON.stringify({ error: e.message }));
  }
}; 