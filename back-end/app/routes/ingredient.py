from fastapi import APIRouter, HTTPException, Query
from app.services.spoonacular_service import get_ingredient_info
from app.models.ingredient_model import Ingredient

router = APIRouter()

@router.get(
    "/api/ingredient/{ingredient_id}",
    response_model=Ingredient,
    summary="Get Ingredient Information",
    description="Fetch detailed information about an ingredient using its Spoonacular ID.",
    tags=["Ingredients"]
)
def fetch_ingredient(
    ingredient_id: int,
    amount: float = Query(100, description="Amount of ingredient (default: 100g)"),
    unit: str = Query("grams", description="Unit of measurement (e.g., grams, cups, oz)")
):
    """
    This endpoint retrieves nutritional information about a specific ingredient.
    """
    try:
        ingredient = get_ingredient_info(ingredient_id, amount, unit)
        return ingredient
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
