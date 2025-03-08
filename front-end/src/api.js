import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // FastAPI URL in Docker

export const fetchRecipes = async (ingredients) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/recipes`, {
            params: { ingredients }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }
};