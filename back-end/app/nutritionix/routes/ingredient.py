from fastapi import APIRouter, HTTPException, Query
from app.nutritionix.services.nutritionix_service import get_nutrition_data
from app.nutritionix.models.ingredient_model import Ingredient

router = APIRouter()

@router.get(
    "/api/foods/nutrition",
    response_model=Ingredient,
    summary="Get Food Nutrition",
    description="Get detailed nutrition for a food quantity using natural language",
    tags=["Foods"]
)
def get_food_nutrition(
    query: str = Query(
        ...,
        example="10 grapes",
        description="Natural language query (e.g. '1 cup of rice', '200g chicken breast')"
    )
):
    """
    Example request:
    /api/foods/nutrition?query=10%20grapes
    """
    try:
        return get_nutrition_data(query)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))