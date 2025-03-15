import os
import httpx
from dotenv import load_dotenv
from typing import List
from app.spoonacular.models.recipe_model import Recipe, RecipeIngredient

load_dotenv()

SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")


async def get_recipes_by_ingredients(ingredients: str, number: int) -> List[Recipe]:
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://api.spoonacular.com/recipes/findByIngredients",
                params={
                    "ingredients": ingredients,
                    "number": number,
                    "apiKey": SPOONACULAR_API_KEY
                },
                timeout=10.0
            )

            if response.status_code != 200:
                try:
                    error_data = response.json()
                    error_message = error_data.get("message", response.text)
                except:
                    error_message = response.text
                raise ValueError(f"Spoonacular API Error: {error_message}")

            data = response.json()
            recipes = []

            for api_recipe in data:
                used_ingredients = [
                    RecipeIngredient(**ingredient)
                    for ingredient in api_recipe.get("usedIngredients", [])
                ]
                missed_ingredients = [
                    RecipeIngredient(**ingredient)
                    for ingredient in api_recipe.get("missedIngredients", [])
                ]
                unused_ingredients = [
                    RecipeIngredient(**ingredient)
                    for ingredient in api_recipe.get("unusedIngredients", [])
                ]

                recipe = Recipe(
                    id=api_recipe["id"],
                    title=api_recipe["title"],
                    image=api_recipe["image"],
                    likes=api_recipe.get("likes", 0),
                    usedIngredients=used_ingredients,
                    missedIngredients=missed_ingredients,
                    unusedIngredients=unused_ingredients,
                )
                recipes.append(recipe)

            return recipes

    except httpx.HTTPStatusError as e:
        raise ValueError(f"Request error: {str(e)}")
    except KeyError as e:
        raise ValueError(f"Missing expected field in response: {str(e)}")
    except Exception as e:
        raise ValueError(f"Unexpected error: {str(e)}")