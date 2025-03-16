import React from 'react';
import { useIngredients } from '../hooks/useIngredients';
import { useRecipes } from '../hooks/useRecipes';
import SearchIngredientsPanel from '../components/ui/panels/search-ingredients-panel/SearchIngredientsPanel';
import SelectedIngredientsPanel from '../components/ui/panels/selected-ingredients-panel/SelectedIngredientsPanel';
import RecipeSuggestionsPanel from '../components/ui/panels/recipe-suggestions-panel/RecipeSuggestionsPanel';
import styles from './App.module.css';

function App() {
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

    const exactMatchRecipes = recipes.filter(recipe =>
        recipe.missedIngredients.length === 0
    );

    const missingIngredientsRecipes = recipes.filter(recipe =>
        recipe.missedIngredients.length > 0
    );

    return (
        <div className={styles.layout}>
            <div className={styles.leftPanels}>
                <SearchIngredientsPanel
                    input={input}
                    setInput={setInput}
                    filteredIngredients={filteredIngredients}
                    addIngredient={addIngredient}
                    selectedIngredients={selectedIngredients}
                    isLoading={ingredientsLoading}
                    error={ingredientsError}
                />

                <SelectedIngredientsPanel
                    selectedIngredients={selectedIngredients}
                    removeIngredient={removeIngredient}
                    handleCreateRecipes={handleCreateRecipes}
                    recipesLoading={recipesLoading}
                />
            </div>

            <RecipeSuggestionsPanel
                exactMatchRecipes={exactMatchRecipes}
                missingIngredientsRecipes={missingIngredientsRecipes}
                recipesLoading={recipesLoading}
                recipesError={recipesError}
                hasRecipes={recipes.length > 0}
            />
        </div>
    );
}

export default App;