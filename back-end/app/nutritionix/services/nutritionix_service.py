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


def search_ingredients(query: str) -> list:
    headers = {
        "x-app-id": NUTRITIONIX_APP_ID,
        "x-app-key": NUTRITIONIX_API_KEY,
    }
    params = {"query": query, "branded": "false"}
    response = requests.get(
        "https://trackapi.nutritionix.com/v2/search/instant",
        headers=headers,
        params=params
    )
    data = response.json()
    return data.get("common", [])[:5]


def get_food_nutrition_bulk(food_names: list) -> list:
    headers = {
        "x-app-id": NUTRITIONIX_APP_ID,
        "x-app-key": NUTRITIONIX_API_KEY,
        "Content-Type": "application/json"
    }

    ingredients = []
    for food_name in food_names:
        try:
            # Use generic 100g quantity for standardization
            response = requests.post(
                "https://trackapi.nutritionix.com/v2/natural/nutrients",
                headers=headers,
                json={"query": f"100g {food_name}"}
            )
            food_data = response.json()["foods"][0]

            ingredients.append(Ingredient(
                food_name=food_data["food_name"],
                serving_qty=food_data["serving_qty"],
                serving_unit=food_data["serving_unit"],
                serving_weight_grams=food_data["serving_weight_grams"],
                nutrition=NutritionInfo(
                    calories=food_data["nf_calories"],
                    fat=food_data["nf_total_fat"],
                    carbs=food_data["nf_total_carbohydrate"],
                    protein=food_data["nf_protein"]
                ),
                food_group=food_data.get("tags", {}).get("food_group"),
                image=food_data.get("photo", {}).get("thumb")
            ))
        except Exception as e:
            print(f"Skipping {food_name}: {str(e)}")

    return ingredients

def get_food_by_id(tag_id: str) -> dict:
    headers = {
        "x-app-id": NUTRITIONIX_APP_ID,
        "x-app-key": NUTRITIONIX_API_KEY,
    }
    params = {"nix_item_id": tag_id}
    response = requests.get(
        "https://trackapi.nutritionix.com/v2/search/item",
        headers=headers,
        params=params
    )
    if response.status_code != 200:
        raise ValueError(f"Nutritionix API Error: {response.text}")
    data = response.json()
    if not data.get("foods"):
        raise ValueError("No food data found")
    return data["foods"][0]