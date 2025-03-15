const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const spoonacularApi = {
    getRecipesByIngredients: async (ingredients) => {
        try {
            const response = await fetch(
                `${API_BASE}/api/recipes?ingredients=${encodeURIComponent(ingredients.join(','))}`
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Recipe API request failed');
            }

            return await response.json();
        } catch (error) {
            throw new Error(`Recipe API Error: ${error.message}`);
        }
    }
};