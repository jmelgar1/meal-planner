import { useState } from 'react';
import { spoonacularApi } from '../api/spoonacularApi';

export const useRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getRecipes = async (ingredients) => {
        try {
            setIsLoading(true);
            setError(null);

            const data = await spoonacularApi.getRecipesByIngredients(ingredients);
            setRecipes(data);
        } catch (err) {
            setError(err.message);
            setRecipes([]);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        recipes,
        isLoading,
        error,
        getRecipes
    };
};