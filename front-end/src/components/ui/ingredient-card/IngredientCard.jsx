import React from 'react';
import styles from './IngredientCard.module.css';
import { getFoodIcon } from '../../../utils/foodIcons';

function IngredientCard({ ingredient, onSelect, isSelected, className }) {
    const foodGroup = ingredient.food_group || 8;
    const foodIcon = getFoodIcon(foodGroup);

    return (
        <div className={`${styles.ingredientCard} ${isSelected ? styles.selected : ''} ${className || ''}`}
             onClick={() => onSelect(ingredient)}>
            <div className={styles.imagePlaceholder}>
                {ingredient.image && (
                    <img src={ingredient.image}
                         alt={ingredient.food_name}
                         className={styles.ingredientImage} />
                )}
            </div>

            <div className={styles.details}>
                <div className={styles.label}>
                    <h2>{ingredient.food_name}</h2>
                    <span className={styles.foodIcon}>{foodIcon}</span>
                </div>
                <div className={styles.nutrition}>
                    <p>Calories: {ingredient.nutrition?.calories || 'N/A'}</p>
                    <p>Serving: {ingredient.serving_qty} {ingredient.serving_unit}</p>
                    <p>Weight: {ingredient.serving_weight_grams}g</p>
                </div>
            </div>

            <div className={styles.macros}>
                <p>Carbs: {ingredient.nutrition?.carbs || 'N/A'}g</p>
                <p>Protein: {ingredient.nutrition?.protein || 'N/A'}g</p>
                <p>Fat: {ingredient.nutrition?.fat || 'N/A'}g</p>
            </div>
        </div>
    );
}

export default IngredientCard;