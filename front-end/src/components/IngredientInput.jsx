import React from 'react';
import IngredientCard from './ui/ingredient-card/ingredient-card';

function IngredientInput({ input, setInput, filteredIngredients, addIngredient, selectedIngredients }) {
    return (
        <div className="w-1/3">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type an ingredient..."
                className="w-full p-2 border border-gray-300 rounded-md"
            />

            <div className="mt-2 grid gap-2">
                {filteredIngredients.map(ingredient => (
                    <IngredientCard
                        key={ingredient.id}
                        ingredient={ingredient}
                        onSelect={addIngredient}
                        isSelected={selectedIngredients.some(item => item.id === ingredient.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default IngredientInput;
