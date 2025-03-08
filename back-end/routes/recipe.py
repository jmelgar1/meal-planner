from fastapi import APIRouter
import requests

router = APIRouter()

SPOONACULAR_API_KEY = "YOUR_API_KEY"

@router.get("/recipes")
def get_recipes(diet: str = "gluten-free", maxCalories: int = 600):
    url = "https://api.spoonacular.com/recipes/complexSearch"
    params = {
        "apiKey": SPOONACULAR_API_KEY,
        "diet": diet,
        "maxCalories": maxCalories,
        "number": 5
    }
    response = requests.get(url, params=params)
    return response.json()
