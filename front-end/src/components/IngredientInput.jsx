import React from 'react';
import IngredientCard from './ui/ingredient-card/ingredient-card';

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
        // Search is handled by the debounced API call in useIngredients
    };

    return (
        <div className="w-1/3">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Search ingredients (e.g. '200g chicken breast')"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    aria-label="Search ingredients"
                />
            </form>

            <div className="mt-2">
                {/* Loading State */}
                {isLoading && (
                    <div className="p-3 text-gray-600 bg-gray-50 rounded-md">
                        ⏳ Searching nutrition data...
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="p-3 text-red-600 bg-red-50 rounded-md border border-red-100">
                        ⚠️ Error: {error}
                    </div>
                )}

                {/* Results List */}
                <div className="grid gap-2">
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

                {/* Empty State */}
                {!isLoading && !error && filteredIngredients.length === 0 && input.trim() && (
                    <div className="p-3 text-gray-500 bg-gray-50 rounded-md">
                        🍴 No results found for "{input}"
                    </div>
                )}
            </div>
        </div>
    );
}

export default IngredientInput;