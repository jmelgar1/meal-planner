const API_BASE_URL = 'http://localhost:8000'; // FastAPI URL in Docker

async function fetchIngredient(query) {
    const response = await fetch(
        `${API_BASE_URL}/api/foods/nutrition?query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return await response.json();
}