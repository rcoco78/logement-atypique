const express = require('express');
const path = require('path');
const notionArticles = require('./api/notion-articles.cjs');
const notionArticle = require('./api/notion-article.cjs');
const cors = require('cors');

const app = express();

// Activer CORS pour permettre les requêtes depuis le serveur de développement
app.use(cors());

// API Notion
app.get('/api/notion-articles', notionArticles);
app.get('/api/notion-article', notionArticle);

// Pour la prod : servir le build Vite
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur API démarré sur http://localhost:${PORT}`);
}); 