import React, { useEffect, useState } from "react"; 
import { useParams, Link } from "react-router-dom";

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/articles/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Article introuvable");
        }
        return response.json();
      })
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="container">
        <p className="message">Chargement de l’article...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container">
        <p className="message error">{error}</p>
      </main>
    );
  }

  return (
    <main className="container">
      <article className="detail-card">
        <img
        src={article.image}
        alt={article.titre}
        className="detail-image"
        loading="lazy"
        />

        <div className="detail-content">
          <span className="badge">{article.categorie}</span>
          <h1>{article.titre}</h1>
          <p className="meta">
            Par {article.auteur} • {article.date}
          </p>
          <p className="detail-text">{article.contenu}</p>

          <Link to="/" className="btn-link secondary">
            Retour aux articles
          </Link>
        </div>
      </article>
    </main>
  );
}

export default ArticleDetail; 