// SelectedIngredients.jsx
import React from 'react';
import IngredientCard from '../ingredient-card/IngredientCard';
import styles from './SelectedIngredients.module.css';

function SelectedIngredients({ selectedIngredients, removeIngredient }) {
    return (
        <div className={styles.container}>
            <h2 className="font-bold mb-2">Selected Ingredients</h2>

            <div className={styles.ingredientsList}>
                {Array.isArray(selectedIngredients) && selectedIngredients.length > 0 ? (
                    selectedIngredients.map(ingredient => (
                        <IngredientCard
                            key={ingredient.id}
                            ingredient={ingredient}
                            onSelect={removeIngredient}
                            isSelected={true}
                            className={styles.selectedCard}
                        />
                    ))
                ) : (
                    <p>No ingredients selected.</p>
                )}
            </div>
        </div>
    );
}

export default SelectedIngredients;