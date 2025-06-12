const { Client } = require('@notionhq/client');
require('dotenv').config();

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});
const databaseId = process.env.NOTION_DATABASE_ID;

async function getArticles() {
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
    const articles = await getArticles();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).end(JSON.stringify(articles));
  } catch (e) {
    res.status(500).end(JSON.stringify({ error: e.message }));
  }
}; 