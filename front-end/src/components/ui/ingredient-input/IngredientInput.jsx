import React from 'react';
import styles from './IngredientInput.module.css';
import IngredientCard from '../ingredient-card/IngredientCard';

function IngredientInput({
                             input,
                             setInput,
                             filteredIngredients,
                             addIngredient,
                             selectedIngredients,
                             isLoading,
                             error
                         }) {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Search ingredients (e.g. '200g chicken breast')"
                    className={styles.searchInput}
                    aria-label="Search ingredients"
                    disabled={isLoading}
                />
            </form>

            <div className={styles.resultsContainer}>
                {isLoading && (
                    <div className={styles.loadingState}>
                        ⏳ Searching nutrition data...
                    </div>
                )}

                {error && (
                    <div className={styles.errorState}>
                        ⚠️ Error: {error}
                    </div>
                )}

                <div className={styles.resultsGrid}>
                    {filteredIngredients.map(ingredient => (
                        <IngredientCard
                            key={`${ingredient.food_name}-${ingredient.serving_qty}`}
                            ingredient={ingredient}
                            onSelect={addIngredient}
                            isSelected={selectedIngredients.some(item =>
                                item.food_name === ingredient.food_name &&
                                item.serving_qty === ingredient.serving_qty
                            )}
                        />
                    ))}
                </div>

                {!isLoading && !error && filteredIngredients.length === 0 && input.trim() && (
                    <div className={styles.emptyState}>
                        🍴 No results found for "{input}"
                    </div>
                )}
            </div>
        </div>
    );
}

export default IngredientInput;