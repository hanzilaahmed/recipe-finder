import { X, Youtube, Tag, MapPin, Utensils, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function RecipeModal({ meal, isOpen, onClose, isFavorite, onToggleFavorite }) {
  if (!isOpen || !meal) return null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        ingredient,
        measure: measure || '',
      });
    }
  }

  const tags = meal.strTags ? meal.strTags.split(',') : [];

  return (
    <AnimatePresence>
      <div className="modal-wrapper">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="modal-overlay"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="modal-content"
        >
          <div className="modal-actions">
            <button
              onClick={() => onToggleFavorite(meal)}
              className="modal-btn"
              style={{ color: isFavorite ? 'var(--color-accent-orange)' : 'var(--color-ink)' }}
            >
              <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
            </button>
            <button
              onClick={onClose}
              className="modal-btn"
            >
              <X size={20} />
            </button>
          </div>

          <div className="modal-image-section">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              referrerPolicy="no-referrer"
              className="modal-image"
            />
            <div className="modal-image-overlay" />
            <div className="modal-mobile-title-wrapper">
              <h2 className="modal-mobile-title">{meal.strMeal}</h2>
            </div>
          </div>

          <div className="modal-details-section">
            <div className="modal-desktop-header">
              <h2 className="modal-desktop-title">
                {meal.strMeal}
              </h2>
              <div className="modal-meta-tags">
                <div className="modal-meta-tag">
                  <Utensils size={16} className="tag-icon" />
                  <span>{meal.strCategory}</span>
                </div>
                <div className="modal-meta-tag">
                  <MapPin size={16} className="tag-icon" />
                  <span>{meal.strArea}</span>
                </div>
                {tags.map(tag => (
                  <div key={tag} className="modal-meta-tag">
                    <Tag size={14} className="tag-icon" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-mobile-meta">
              <div className="modal-meta-tag">
                <Utensils size={14} className="tag-icon" />
                <span>{meal.strCategory}</span>
              </div>
              <div className="modal-meta-tag">
                <MapPin size={14} className="tag-icon" />
                <span>{meal.strArea}</span>
              </div>
            </div>

            <div className="modal-grid">
              <div className="modal-ingredients">
                <h3 className="modal-section-title">
                  Ingredients
                </h3>
                <ul className="ingredient-list">
                  {ingredients.map((item, idx) => (
                    <li key={idx} className="ingredient-item">
                      <span className="ingredient-name">{item.ingredient}</span>
                      <span className="ingredient-measure">{item.measure}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-instructions">
                <h3 className="modal-section-title">
                  Instructions
                </h3>
                <div className="instruction-text">
                  {meal.strInstructions.split('\n').map((paragraph, idx) => (
                    paragraph.trim() && <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {meal.strYoutube && (
                  <div className="modal-video-wrapper">
                    <a
                      href={meal.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-video-btn"
                    >
                      <Youtube size={18} />
                      Watch Video Tutorial
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
