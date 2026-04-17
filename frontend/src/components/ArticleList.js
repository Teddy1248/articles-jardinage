import React from "react"; 
import ArticleCard from "./ArticleCard";

function ArticleList({ articles }) {
  if (articles.length === 0) {
    return <p className="message">Aucun article disponible.</p>;
  }

  return (
    <div className="article-grid">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

export default ArticleList; 