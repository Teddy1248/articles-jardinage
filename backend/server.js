const express = require("express"); 
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const articlesFile = path.join(__dirname, "data", "articles.json");

let articlesCache = [];

function chargerArticles() {
  try {
    const data = fs.readFileSync(articlesFile, "utf-8");
    articlesCache = JSON.parse(data);
    console.log("Articles chargés en mémoire.");
  } catch (error) {
    console.error("Erreur lors du chargement des articles :", error.message);
    articlesCache = [];
  }
}

chargerArticles();

app.get("/", (req, res) => {
  res.json({ message: "API Journal de Jardinage active" });
});

app.get("/api/articles", (req, res) => {
  res.json(articlesCache);
});

app.get("/api/articles/:id", (req, res) => {
  const articleId = parseInt(req.params.id, 10);

  const article = articlesCache.find((item) => item.id === articleId);

  if (!article) {
    return res.status(404).json({ message: "Article introuvable" });
  }

  res.json(article);
});

app.get("/api/categories/:categorie", (req, res) => {
  const categorie = req.params.categorie.toLowerCase();

  const resultats = articlesCache.filter(
    (article) => article.categorie.toLowerCase() === categorie
  );

  res.json(resultats);
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
}); 