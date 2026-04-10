import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

const RecipeCard = ({ meal, onClick, isFavorite, onToggleFavorite }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="recipe-card"
    >
      <div className="recipe-card-image-wrapper" onClick={() => onClick(meal.idMeal)}>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          referrerPolicy="no-referrer"
          className="recipe-card-image"
        />
        <div className="recipe-card-overlay" />
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(meal);
        }}
        className="recipe-card-fav-btn"
      >
        <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
      </button>

      <div className="recipe-card-content" onClick={() => onClick(meal.idMeal)}>
        <h3 className="recipe-card-title">
          {meal.strMeal}
        </h3>
        <div className="recipe-card-footer">
          <span className="recipe-card-link">
            View Recipe
          </span>
          <div className="recipe-card-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
