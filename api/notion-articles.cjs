const { get } = require('@vercel/blob');
const { Client } = require('@notionhq/client');
require('dotenv').config();

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});
const databaseId = process.env.NOTION_DATABASE_ID;

async function getArticlesFromCache() {
  try {
    const { blob } = await get('articles.json');
    if (blob && blob.url) {
      const response = await fetch(blob.url);
      return await response.json();
    }
    return null;
  } catch (e) {
    return null;
  }
}

async function getArticlesFromNotion() {
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
  return response.results.map((a) => ({
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
}

module.exports = async (req, res) => {
  try {
    let articles = await getArticlesFromCache();
    if (!articles) {
      articles = await getArticlesFromNotion();
    }
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).end(JSON.stringify(articles));
  } catch (e) {
    res.status(500).end(JSON.stringify({ error: e.message }));
  }
}; 