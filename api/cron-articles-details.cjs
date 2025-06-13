const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');
const vercelBlob = require('@vercel/blob');
const get = vercelBlob.get;
const put = vercelBlob.put;
require('dotenv').config();

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

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

async function fetchAndSaveArticleDetails() {
  try {
    const { blob } = await get('articles.json');
    if (!blob || !blob.url) {
      console.error('articles.json introuvable dans le blob store');
      throw new Error('articles.json introuvable dans le blob store');
    }
    const response = await fetch(blob.url);
    const articles = await response.json();
    console.log('Nombre d\'articles à détailler :', articles.length);
    await Promise.all(articles.map(async (article) => {
      try {
        console.log(`Début traitement : ${article.slug}`);
        const fullArticle = await getFullArticle(article);
        await put(
          `articles/${article.slug}.json`,
          JSON.stringify(fullArticle, null, 2),
          { access: 'public', allowOverwrite: true }
        );
        console.log(`Article détaillé sauvegardé : ${article.slug}`);
      } catch (e) {
        console.error(`Erreur pour l'article ${article.slug} :`, e);
      }
    }));
    return articles.length;
  } catch (e) {
    console.error('Erreur globale dans fetchAndSaveArticleDetails :', e);
    throw e;
  }
}

module.exports = async (req, res) => {
  try {
    const nb = await fetchAndSaveArticleDetails();
    res.status(200).json({ ok: true, count: nb });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}; 