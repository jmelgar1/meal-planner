const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const nutritionixApi = {
    searchIngredients: async (query) => {
        try {
            const response = await fetch(
                `${API_BASE}/api/foods/nutrition?query=${encodeURIComponent(query)}`
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Nutritionix API request failed');
            }

            return await response.json();
        } catch (error) {
            throw new Error(`Nutritionix API Error: ${error.message}`);
        }
    }
};