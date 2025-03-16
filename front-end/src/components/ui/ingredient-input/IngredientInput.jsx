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
                    placeholder="Search ingredients (e.g. 'chicken', 'broccoli')"
                    className={styles.searchInput}
                    aria-label="Search ingredients"
                    disabled={isLoading}
                />
            </form>

            <div className={styles.resultsContainer}>
                {/* Loading State */}
                {isLoading && (
                    <div className={styles.loadingState}>
                        <div className={styles.spinner} />
                        <span>Searching nutrition data...</span>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className={styles.errorState}>
                        <div className={styles.errorIcon}>⚠️</div>
                        <div className={styles.errorMessage}>
                            <strong>Error:</strong> {error}
                        </div>
                    </div>
                )}

                {/* Results Grid */}
                {!isLoading && !error && (
                    <>
                        <div className={styles.resultsGrid}>
                            {filteredIngredients.map(ingredient => (
                                <IngredientCard
                                    key={`${ingredient.food_name}-${ingredient.serving_weight_grams}`}
                                    ingredient={ingredient}
                                    onSelect={addIngredient}
                                    isSelected={selectedIngredients.some(item =>
                                        item.food_name === ingredient.food_name &&
                                        item.serving_weight_grams === ingredient.serving_weight_grams
                                    )}
                                />
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredIngredients.length === 0 && input.trim() && (
                            <div className={styles.emptyState}>
                                <div className={styles.emptyIcon}>🍴</div>
                                <p>No results found for "{input}"</p>
                                <small className={styles.emptyHint}>
                                    Try searching for generic terms like "chicken" or "broccoli"
                                </small>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default IngredientInput;