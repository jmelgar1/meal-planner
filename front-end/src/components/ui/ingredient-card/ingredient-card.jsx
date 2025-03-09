import React from 'react';
import './ingredient-card.css'; // Import the CSS file
import vegetableIcon from '../../../images/vegtable-icon.png'; // Adjust the path as needed

function IngredientCard({ ingredient, onSelect, isSelected }) {
    return (
        <div
            className={`ingredient-card ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(ingredient)}
        >

            {/* Image Placeholder */}
            <div className="image-placeholder"></div>

            {/* Ingredient Details */}
            <div className="details">
                <h2>{ingredient.name}</h2>
                <p>Serving Size: {ingredient.servingSize || 'N/A'}</p>
                <p>Calories: {ingredient.calories || 'N/A'}</p>
            </div>

            {/* Icon on the Right */}
            <div className="icon">
                <img src={vegetableIcon} alt="icon" className="w-full h-full" />
            </div>
        </div>
    );
}

export default IngredientCard;