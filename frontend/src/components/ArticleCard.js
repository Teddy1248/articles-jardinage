import React from "react"; 
import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <article className="card">
      <img
        src={article.image}
        alt={article.titre}
        className="card-image"
        loading="lazy"
      />

      <div className="card-body">
        <span className="badge">{article.categorie}</span>
        <h3>{article.titre}</h3>
        <p className="meta">
          Par {article.auteur} • {article.date}
        </p>
        <p>{article.resume}</p>

        <Link to={`/article/${article.id}`} className="btn-link">
          Lire l’article
        </Link>
      </div>
    </article>
  );
}

export default ArticleCard; 