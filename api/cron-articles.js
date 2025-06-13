import { Client } from '@notionhq/client';
import { put } from '@vercel/blob';
import dotenv from 'dotenv';
dotenv.config();

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});
const databaseId = process.env.NOTION_DATABASE_ID;

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
  console.log('Liste des articles sauvegardée. Nombre d\'articles :', articles.length);
  return articles.length;
}

export default async (req, res) => {
  try {
    // Sécurité : optionnel, vérifier un secret si besoin
    const nb = await fetchAndSaveArticles();
    res.status(200).json({ ok: true, count: nb });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}; 