from fastapi import APIRouter, HTTPException, Query
from typing import List
from app.spoonacular.services.spoonacular_service import SpoonacularService
from app.spoonacular.models.recipe_model import Recipe

router = APIRouter()

@router.get(
    "/api/recipes",
    response_model=List[Recipe],
    summary="Get Recipes by Ingredients",
    description="Find recipes that use specified ingredients",
    tags=["Recipes"]
)
async def get_recipes(
    ingredients: str = Query(
        ...,
        example="apples,flour,sugar",
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
    /api/recipes?ingredients=apples,flour&number=3
    """
    try:
        service = SpoonacularService()
        ingredients_list = [i.strip() for i in ingredients.split(",")]
        return await service.get_recipes_by_ingredients(ingredients_list, number)
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch recipes: {str(e)}"
        )