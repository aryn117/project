function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const categories = ['All', 'Movies', 'TV', 'Games', 'Music', 'Apps', 'Anime', 'Books'];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((category) => (
        <button
          key={category}
          className={`btn btn-sm ${selectedCategory === category ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;