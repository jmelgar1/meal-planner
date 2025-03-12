import React from 'react';
import './ingredient-card.css'; // Import the CSS file
import vegetableIcon from '../../../images/vegtable-icon.png'; // Adjust the path as needed

function IngredientCard({ ingredient, onSelect, isSelected }) {
    return (
        <div className={`ingredient-card ${isSelected ? 'selected' : ''}`} onClick={() => onSelect(ingredient)}>
            {/* Use actual image from API if available */}
            <div className="image-placeholder">
                {ingredient.image && (
                    <img src={ingredient.image} alt={ingredient.food_name} className="ingredient-image" />
                )}
            </div>

            <div className="details">
                <h2>{ingredient.food_name}</h2>
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

            <div className="icon">
                <img src={vegetableIcon} alt="icon" className="w-full h-full" />
            </div>
        </div>
    );
}

export default IngredientCard;