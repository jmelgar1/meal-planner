import React from 'react';
import './ingredient-card.css';
import { getFoodIcon } from '../../../utils/foodIcons';

function IngredientCard({ ingredient, onSelect, isSelected }) {
    const foodGroup = ingredient.food_group || 8;
    const foodIcon = getFoodIcon(foodGroup);

    return (
        <div className={`ingredient-card ${isSelected ? 'selected' : ''}`} onClick={() => onSelect(ingredient)}>
            <div className="image-placeholder">
                {ingredient.image && (
                    <img src={ingredient.image} alt={ingredient.food_name} className="ingredient-image" />
                )}
            </div>

            <div className="details">
                <div className="label">
                    <h2>{ingredient.food_name}</h2>
                    <span className="food-icon">{foodIcon}</span>
                </div>
                <div className="nutrition">
                    <p>Serving: {ingredient.serving_qty} {ingredient.serving_unit}</p>
                    <p>Weight: {ingredient.serving_weight_grams}g</p>
                </div>
            </div>

            <div className="macros">
                <p>Calories: {ingredient.nutrition?.calories || 'N/A'}</p>
                <p>Carbs: {ingredient.nutrition?.carbs || 'N/A'}g</p>
                <p>Protein: {ingredient.nutrition?.protein || 'N/A'}g</p>
                <p>Fat: {ingredient.nutrition?.fat || 'N/A'}g</p>
            </div>
        </div>
    );
}

export default IngredientCard;