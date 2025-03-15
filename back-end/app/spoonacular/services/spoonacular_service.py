import os
from typing import List

import httpx
from dotenv import load_dotenv
from fastapi import HTTPException
from app.spoonacular.models.recipe_model import Recipe

load_dotenv()

SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")


class SpoonacularService:
    def __init__(self):
        self.base_url = "https://api.spoonacular.com/recipes"
        self.headers = {"Content-Type": "application/json"}

    async def get_recipes_by_ingredients(
            self,
            ingredients: List[str],
            number: int = 5
    ) -> List[Recipe]:
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/findByIngredients",
                    params={
                        "ingredients": ",".join(ingredients),
                        "number": number,
                        "apiKey": SPOONACULAR_API_KEY
                    },
                    headers=self.headers
                )
                response.raise_for_status()
                return [Recipe(**recipe) for recipe in response.json()]

        except httpx.HTTPStatusError as e:
            raise HTTPException(
                status_code=e.response.status_code,
                detail="Spoonacular API Error"
            )
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Internal Server Error: {str(e)}"
            )