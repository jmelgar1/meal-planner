from typing import List

from fastapi import APIRouter, HTTPException, Query
from app.spoonacular.models.recipe_model import Recipe
from app.spoonacular.services.spoonacular_service import get_recipes_by_ingredients

router = APIRouter(
    prefix="/api/recipes",
    tags=["Recipes"]
)

@router.get(
    "",
    response_model=List[Recipe],
    summary="Get Recipes by Ingredients",
    description="Find recipes that use specified ingredients",
)
async def get_recipes(
    ingredients: str = Query(
        ...,
        example="chicken,rice",
        description="Comma-separated list of ingredients"
    ),
    number: int = Query(
        5,
        ge=1,
        le=10,
        description="Number of recipes to return (1-10)"
    )
):
    """
    Example request:
    /api/recipes?ingredients=chicken,rice&number=3
    """
    try:
        return await get_recipes_by_ingredients(ingredients, number)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")