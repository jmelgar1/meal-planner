import React, { useState } from 'react';
import { fetchRecipes } from './api';

function App() {
  const [ingredients, setIngredients] = useState<string>('');
  const [recipes, setRecipes] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!ingredients.trim()) return;
    const data = await fetchRecipes(ingredients);
    setRecipes(data);
  };

  return (
      <div>
        <h1>Meal Finder</h1>
        <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients (e.g., chicken, tomato)"
        />
        <button onClick={handleSearch}>Search Recipes</button>

        <div>
          {recipes.length > 0 ? (
              <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                      <h3>{recipe.title}</h3>
                      <img src={recipe.image} alt={recipe.title} width="100" />
                    </li>
                ))}
              </ul>
          ) : (
              <p>No recipes found. Try different ingredients.</p>
          )}
        </div>
      </div>
  );
}

export default App;