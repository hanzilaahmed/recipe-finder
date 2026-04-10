import { ChefHat, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isFavorites = location.pathname === '/favorites';

  return (
    <header className="header">
      <Link to="/" className="header-logo-group">
        <div className="header-icon">
          <ChefHat size={24} />
        </div>
        <div>
          <h1 className="header-title">
            Culinary Canvas
          </h1>
          <p className="header-subtitle">
            Curated Recipes
          </p>
        </div>
      </Link>
      <Link
        to={isFavorites ? "/" : "/favorites"}
        className={`btn-favorites ${isFavorites ? 'active' : ''}`}
      >
        <Heart size={18} className={isFavorites ? 'fill-current' : ''} />
        <span className="btn-favorites-text">{isFavorites ? 'Home' : 'Favorites'}</span>
      </Link>
    </header>
  );
}
