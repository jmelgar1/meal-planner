import React from 'react';
import { useIngredients } from './hooks/useIngredients';
import IngredientInput from './components/ui/ingredient-input/IngredientInput';
import SelectedIngredients from './components/ui/selected-ingredients/SelectedIngredients';
import styles from './styles/App.module.css';
import Button from "./components/ui/button/Button";

function App() {
    const {
        input,
        setInput,
        filteredIngredients,
        selectedIngredients,
        isLoading,
        error,
        addIngredient,
        removeIngredient
    } = useIngredients();

    const handleCreateMeals = () => {
        console.log('Creating meals with:', selectedIngredients);
        // Will implement API call later
    };

    return (
        <div className={styles.layout}>
            <div className={styles.panel}>
                <h2 className={styles.title} data-icon={"search"}>Search Ingredients</h2>
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

            <div className={styles.panel}>
                <h2 className={styles.title} data-icon={"selected"}>Selected Items</h2>
                <Button
                    variant="primary"
                    onClick={handleCreateMeals}
                    disabled={selectedIngredients.length === 0}
                    //className={styles.fullWidthButton} // custom class soon
                >
                    Create Meals!
                </Button>
                <SelectedIngredients
                    selectedIngredients={selectedIngredients}
                    removeIngredient={removeIngredient}
                />
            </div>

            <div className={styles.recipePanel}>
                <h2 className={styles.title} data-icon={"recipes"}>Recipe Suggestions</h2>
                <div className="text-gray-600">
                    <p className="mb-4">Selected ingredients will appear here</p>
                    <div className="animate-pulse text-purple-500">
                        Coming soon: AI-powered recipe suggestions!
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;