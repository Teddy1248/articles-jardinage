import React, { useEffect, useMemo, useState } from "react"; 
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";

function HomePage({ articles, loading, error }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();

    if (!value) {
      return articles;
    }

    return articles.filter((article) => {
      return (
        article.titre.toLowerCase().includes(value) ||
        article.resume.toLowerCase().includes(value) ||
        article.categorie.toLowerCase().includes(value) ||
        article.auteur.toLowerCase().includes(value)
      );
    });
  }, [articles, searchTerm]);

  return (
    <main className="container">
      <section className="hero">
        <h2>Le magazine dédié au jardinage</h2>
        <p>
          Découvrez des conseils, des analyses, des idées de plantation et des
          articles pratiques pour entretenir votre jardin.
        </p>
      </section>

      <section className="search-section">
        <div className="search-box">
          <label htmlFor="search" className="search-label">
            Rechercher un article
          </label>
          <input
            id="search"
            type="text"
            className="search-input"
            placeholder="Tape un titre, une catégorie, un auteur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2 className="section-title">Derniers articles</h2>

          {!loading && !error && (
            <p className="result-count">
              {filteredArticles.length} article
              {filteredArticles.length > 1 ? "s" : ""} trouvé
              {filteredArticles.length > 1 ? "s" : ""}
            </p>
          )}
        </div>

        {loading && <p className="message">Chargement des articles...</p>}
        {error && <p className="message error">{error}</p>}

        {!loading && !error && filteredArticles.length > 0 && (
          <ArticleList articles={filteredArticles} />
        )}

        {!loading && !error && filteredArticles.length === 0 && (
          <p className="message">
            Aucun article ne correspond à votre recherche.
          </p>
        )}
      </section>
    </main>
  );
}

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/articles")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Impossible de récupérer les articles");
        }
        return response.json();
      })
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              articles={articles}
              loading={loading}
              error={error}
            />
          }
        />
        <Route path="/article/:id" element={<ArticleDetail />} />
      </Routes>
    </div>
  );
}

export default App; 