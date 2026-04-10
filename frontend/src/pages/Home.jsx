import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import RecipeCard from '../components/RecipeCard';
import { fetchCategories, fetchMealsByCategory, searchMeals } from '../api';
import { Loader2 } from 'lucide-react';

export default function Home({ favorites, toggleFavorite, onMealClick }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const cats = await fetchCategories();
        setCategories(cats);
        
        const defaultMeals = await searchMeals('');
        setMeals(defaultMeals.map(m => ({ idMeal: m.idMeal, strMeal: m.strMeal, strMealThumb: m.strMealThumb })));
      } catch (err) {
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedCategory(null);
      const results = await searchMeals(query);
      if (results.length === 0) {
        setError('No recipes found for your search.');
        setMeals([]);
      } else {
        setMeals(results.map(m => ({ idMeal: m.idMeal, strMeal: m.strMeal, strMealThumb: m.strMealThumb })));
      }
    } catch (err) {
      setError('Failed to search recipes.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = async (category) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedCategory(category);
      
      if (!category) {
        const defaultMeals = await searchMeals('');
        setMeals(defaultMeals.map(m => ({ idMeal: m.idMeal, strMeal: m.strMeal, strMealThumb: m.strMealThumb })));
        return;
      }

      const results = await fetchMealsByCategory(category);
      setMeals(results);
    } catch (err) {
      setError('Failed to load category.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="hero-section">
        <h2 className="hero-title">What are you craving?</h2>
        <p className="hero-subtitle">
          Discover thousands of recipes from around the world. Search by name or explore our curated categories.
        </p>
      </div>

      <SearchBar onSearch={handleSearch} />
      <div className="category-section">
        <CategoryList 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onSelectCategory={handleCategorySelect} 
        />
      </div>

      {loading ? (
        <div className="loading-container">
          <Loader2 className="loading-spinner" />
          <p className="loading-text">Loading recipes...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-text">{error}</p>
        </div>
      ) : (
        <div className="recipe-grid">
          {meals.map((meal) => (
            <RecipeCard 
              key={meal.idMeal} 
              meal={meal} 
              onClick={onMealClick} 
              isFavorite={favorites.some(f => f.idMeal === meal.idMeal)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </>
  );
}
