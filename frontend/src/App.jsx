import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import RecipeModal from "./components/RecipeModal";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { fetchMealDetails } from "./api";

export default function App() {
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [selectedMealDetails, setSelectedMealDetails] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleMealClick = async (id) => {
    try {
      setSelectedMealId(id);
      setModalOpen(true);
      const details = await fetchMealDetails(id);
      setSelectedMealDetails(details);
    } catch (err) {
      console.error("Failed to load meal details", err);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setSelectedMealId(null);
      setSelectedMealDetails(null);
    }, 300);
  };

  const toggleFavorite = (meal) => {
    setFavorites((prev) => {
      if (prev.find((f) => f.idMeal === meal.idMeal)) {
        return prev.filter((f) => f.idMeal !== meal.idMeal);
      }
      return [
        ...prev,
        {
          idMeal: meal.idMeal,
          strMeal: meal.strMeal,
          strMealThumb: meal.strMealThumb,
        },
      ];
    });
  };

  return (
    <Router>
      <div className="app-wrapper">
        <Header />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  onMealClick={handleMealClick}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  onMealClick={handleMealClick}
                />
              }
            />
          </Routes>
        </main>

        <footer className="footer">
          <p className="footer-text">
            Powered by{" "}
            <a
              href="https://www.themealdb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              TheMealDB
            </a>
          </p>
        </footer>

        <RecipeModal
          meal={selectedMealDetails}
          isOpen={modalOpen}
          onClose={closeModal}
          isFavorite={
            selectedMealDetails
              ? favorites.some((f) => f.idMeal === selectedMealDetails.idMeal)
              : false
          }
          onToggleFavorite={toggleFavorite}
        />
      </div>
    </Router>
  );
}
