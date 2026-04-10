export default function CategoryList({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="category-container hide-scrollbar">
      <div className="category-list">
        <button
          onClick={() => onSelectCategory('')}
          className={`category-btn ${!selectedCategory ? 'active' : ''}`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.idCategory}
            onClick={() => onSelectCategory(cat.strCategory)}
            className={`category-btn ${selectedCategory === cat.strCategory ? 'active' : ''}`}
          >
            {cat.strCategory}
          </button>
        ))}
      </div>
    </div>
  );
}
