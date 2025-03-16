from fastapi import APIRouter, HTTPException, Query
from app.nutritionix.services.nutritionix_service import get_nutrition_data, search_ingredients, get_food_by_id, \
    get_food_nutrition_bulk
from app.nutritionix.models.ingredient_model import Ingredient, NutritionInfo

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

@router.get("/api/foods/search", response_model=list[Ingredient])
def search_foods(search_term: str = Query(...)):
    try:
        common_foods = search_ingredients(search_term)
        food_names = [food["food_name"] for food in common_foods]
        return get_food_nutrition_bulk(food_names)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))