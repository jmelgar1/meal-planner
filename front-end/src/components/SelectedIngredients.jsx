import React from 'react';
import IngredientCard from './ui/ingredient-card/ingredient-card';

function SelectedIngredients({ selectedIngredients, removeIngredient }) {
    return (
        <div className="w-1/3">
            <h2 className="font-bold mb-2">Selected Ingredients</h2>

            <div className="mt-2 grid gap-2">
                {Array.isArray(selectedIngredients) && selectedIngredients.length > 0 ? (
                    selectedIngredients.map(ingredient => (
                        <IngredientCard
                            key={ingredient.id}
                            ingredient={ingredient}
                            onSelect={removeIngredient}
                            isSelected={true}
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
