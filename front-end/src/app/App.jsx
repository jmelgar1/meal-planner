import React from 'react';
import { useIngredients } from '../hooks/useIngredients';
import { useRecipes } from '../hooks/useRecipes';
import IngredientInput from '../components/ui/ingredient-input/IngredientInput';
import SelectedIngredients from '../components/ui/selected-ingredients/SelectedIngredients';
import RecipeCard from '../components/ui/recipe-card/RecipeCard';
import Button from '../components/ui/button/Button';
import styles from './App.module.css';

function App() {
    // Ingredients hook for search/selection
    const {
        input,
        setInput,
        filteredIngredients,
        selectedIngredients,
        isLoading: ingredientsLoading,
        error: ingredientsError,
        addIngredient,
        removeIngredient
    } = useIngredients();

    // Recipes hook for meal generation
    const {
        recipes,
        isLoading: recipesLoading,
        error: recipesError,
        getRecipes
    } = useRecipes();

    const handleCreateRecipes = async () => {
        const ingredients = selectedIngredients
            .map(ingredient => ingredient.food_name.toLowerCase());
        await getRecipes(ingredients);
    };

    return (
        <div className={styles.layout}>
            {/* Search Ingredients Panel */}
            <div className={styles.panel}>
                <h2 className={styles.title} data-icon="search">
                    Search Ingredients
                </h2>
                <IngredientInput
                    input={input}
                    setInput={setInput}
                    filteredIngredients={filteredIngredients}
                    addIngredient={addIngredient}
                    selectedIngredients={selectedIngredients}
                    isLoading={ingredientsLoading}
                    error={ingredientsError}
                />
            </div>

            {/* Selected Ingredients Panel */}
            <div className={styles.panel}>
                <h2 className={styles.title} data-icon="selected">
                    Selected Items
                </h2>
                <SelectedIngredients
                    selectedIngredients={selectedIngredients}
                    removeIngredient={removeIngredient}
                />
                <Button
                    variant="primary"
                    onClick={handleCreateRecipes}
                    disabled={selectedIngredients.length === 0}
                    className={styles.fullWidthButton}
                >
                    {recipesLoading ? 'Generating...' : 'Find Recipes!'}
                </Button>
            </div>

            {/* Recipe Suggestions Panel */}
            <div className={styles.recipePanel}>
                <h2 className={styles.title} data-icon="recipes">
                    Recipe Suggestions
                </h2>

                <div className={styles.recipeContent}>
                    {recipesLoading ? (
                        <div className={styles.loadingState}>
                            <span>✨ Cooking up ideas...</span>
                        </div>
                    ) : recipesError ? (
                        <div className={styles.errorState}>
                            ⚠️ {recipesError}
                        </div>
                    ) : recipes.length > 0 ? (
                        <div className={styles.recipeGrid}>
                            {recipes.map(recipe => (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            🧑🍳 Select ingredients and click "Find Recipes" to get started!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;