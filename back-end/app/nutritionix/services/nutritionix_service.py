import requests
import os
from dotenv import load_dotenv
from app.nutritionix.models.ingredient_model import Ingredient, NutritionInfo

load_dotenv()

NUTRITIONIX_APP_ID = os.getenv("NUTRITIONIX_APP_ID")
NUTRITIONIX_API_KEY = os.getenv("NUTRITIONIX_API_KEY")

def get_nutrition_data(query: str) -> Ingredient:
    """
    Example query: "10 grapes of grape"
    """
    headers = {
        "x-app-id": NUTRITIONIX_APP_ID,
        "x-app-key": NUTRITIONIX_API_KEY,
        "Content-Type": "application/json"
    }

    response = requests.post(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        headers=headers,
        json={"query": query}
    )

    if response.status_code != 200:
        raise ValueError(f"Nutritionix API Error: {response.text}")

    data = response.json()

    if not data.get("foods") or len(data["foods"]) == 0:
        raise ValueError("No nutrition data found")

    food = data["foods"][0]

    return Ingredient(
        food_name=food["food_name"],
        serving_qty=food["serving_qty"],
        serving_unit=food["serving_unit"],
        serving_weight_grams=food["serving_weight_grams"],
        nutrition=NutritionInfo(
            calories=food["nf_calories"],
            fat=food["nf_total_fat"],
            carbs=food["nf_total_carbohydrate"],
            protein=food["nf_protein"]
        ),
        food_group=food.get("tags", {}).get("food_group"),
        image=food.get("photo", {}).get("thumb")
    )