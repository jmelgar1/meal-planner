import React from 'react';
import RecipeCard from '../../recipe-card/RecipeCard';
import styles from './RecipeSuggestionsPanel.module.css';

const RecipeSuggestionsPanel = ({
                                    exactMatchRecipes,
                                    missingIngredientsRecipes,
                                    recipesLoading,
                                    recipesError,
                                    hasRecipes
                                }) => (
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
            ) : hasRecipes ? (
                <>
                    {exactMatchRecipes.length > 0 && (
                        <div className={styles.recipeGroup}>
                            <h3 className={styles.subtitle}>
                                🎯 Perfect Matches - Uses all your ingredients
                            </h3>
                            <div className={styles.recipeGrid}>
                                {exactMatchRecipes.map(recipe => (
                                    <RecipeCard
                                        key={recipe.id}
                                        recipe={recipe}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {missingIngredientsRecipes.length > 0 && (
                        <div className={styles.recipeGroup}>
                            <h3 className={styles.subtitle}>
                                🛒 Needs a Few More - Try these with some extra items
                            </h3>
                            <div className={styles.recipeGrid}>
                                {missingIngredientsRecipes.map(recipe => (
                                    <RecipeCard
                                        key={recipe.id}
                                        recipe={recipe}
                                        showMissingIngredients
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className={styles.emptyState}>
                    🧑🍳 Select ingredients and click "Find Recipes" to get started!
                </div>
            )}
        </div>
    </div>
);

export default RecipeSuggestionsPanel;