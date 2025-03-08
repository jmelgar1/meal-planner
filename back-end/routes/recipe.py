from fastapi import APIRouter, Query
import requests
import os

router = APIRouter()

SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")


@router.get("/api/recipes")
def get_recipes(ingredients: str = Query(..., min_length=1)):
    url = "https://api.spoonacular.com/recipes/findByIngredients"
    params = {
        "apiKey": SPOONACULAR_API_KEY,
        "ingredients": ingredients,
        "number": 5  # Number of results to return
    }

    response = requests.get(url, params=params)
    if response.status_code != 200:
        return {"error": "Failed to fetch recipes"}

    return response.json()
