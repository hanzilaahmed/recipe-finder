import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';

export default function Favorites({ favorites, toggleFavorite, onMealClick }) {
  return (
    <>
      <div className="hero-section">
        <h2 className="hero-title">Your Favorites</h2>
        <p className="hero-subtitle">
          Your personal collection of saved recipes.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <p className="empty-text">You haven't saved any favorites yet.</p>
          <Link to="/" className="btn-explore">
            Explore Recipes
          </Link>
        </div>
      ) : (
        <div className="recipe-grid">
          {favorites.map((meal) => (
            <RecipeCard 
              key={meal.idMeal} 
              meal={meal} 
              onClick={onMealClick} 
              isFavorite={true}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </>
  );
}
