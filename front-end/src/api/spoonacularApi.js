const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const spoonacularApi = {
    getRecipesByIngredients: async (ingredients, number = 5) => {
        try {

            const ingredientsString = ingredients
                .map(ing => encodeURIComponent(ing))
                .join(',');

            const response = await fetch(
                `${API_BASE}/api/recipes?ingredients=${ingredientsString}&number=${number}`
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Recipe API request failed');
            }

            const data = await response.json();

            // Ensure we always return an array
            return Array.isArray(data) ? data : [data];
        } catch (error) {
            throw new Error(`Recipe API Error: ${error.message}`);
        }
    }
};