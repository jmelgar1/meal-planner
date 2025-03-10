import requests
import os
from dotenv import load_dotenv
from app.models.ingredient_model import Ingredient, NutritionInfo

# Load .env file
load_dotenv()

SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")
BASE_URL = "https://api.spoonacular.com/food/ingredients"

def get_ingredient_info(ingredient_id: int, amount: float = 100, unit: str = "grams") -> Ingredient:
    url = f"{BASE_URL}/{ingredient_id}/information"
    params = {
        "apiKey": SPOONACULAR_API_KEY,
        "amount": amount,
        "unit": unit
    }

    response = requests.get(url, params=params)
    if response.status_code != 200:
        raise Exception("Failed to fetch ingredient data")

    data = response.json()

    # Extracting key nutrients
    nutrients = {nutrient['name'].lower(): nutrient['amount']
                 for nutrient in data['nutrition']['nutrients']
                 if nutrient['name'] in ["Calories", "Fat", "Carbohydrates", "Protein"]}

    # Build Ingredient object
    return Ingredient(
        id=data['id'],
        name=data['name'],
        image=data['image'],
        nutrition=NutritionInfo(
            calories=nutrients.get('calories', 0),
            fat=nutrients.get('fat', 0),
            carbs=nutrients.get('carbohydrates', 0),
            protein=nutrients.get('protein', 0)
        ),
        amount=amount,
        unit=unit
    )
