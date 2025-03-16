import React from 'react';
import IngredientInput from '../../ingredient-input/IngredientInput';
import styles from './SearchIngredientsPanel.module.css';

const SearchIngredientsPanel = ({
                                    input,
                                    setInput,
                                    filteredIngredients,
                                    addIngredient,
                                    selectedIngredients,
                                    isLoading,
                                    error
                                }) => (
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
            isLoading={isLoading}
            error={error}
        />
    </div>
);

export default SearchIngredientsPanel;