import React from 'react';
import { useIngredients } from './hooks/useIngredients';
import IngredientInput from './components/IngredientInput';
import SelectedIngredients from './components/SelectedIngredients';

function App() {
    const {
        input,
        setInput,
        filteredIngredients,
        selectedIngredients,
        addIngredient,
        removeIngredient
    } = useIngredients();

    return (
        <div className="p-4 flex gap-8">
            <IngredientInput
                input={input}
                setInput={setInput}
                filteredIngredients={filteredIngredients}
                addIngredient={addIngredient}
                selectedIngredients={selectedIngredients}
            />

            <SelectedIngredients
                selectedIngredients={selectedIngredients}
                removeIngredient={removeIngredient}
            />

            <div className="w-1/3">
                <h2 className="font-bold mb-2">Recipe Results</h2>
                <p>Recipes will appear here after clicking 'Find Recipes'.</p>
            </div>
        </div>
    );
}

export default App;