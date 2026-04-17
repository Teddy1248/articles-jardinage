import React from "react"; 
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          Jardin & Presse
        </Link>

        <nav className="nav">
          <Link to="/">Accueil</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header; 