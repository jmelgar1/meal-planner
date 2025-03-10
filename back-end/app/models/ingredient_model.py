from pydantic import BaseModel, Field
from typing import Optional

class NutritionInfo(BaseModel):
    calories: float = Field(..., description="Calories in kcal")
    fat: float = Field(..., description="Fat in grams")
    carbs: float = Field(..., description="Carbohydrates in grams")
    protein: float = Field(..., description="Protein in grams")

class Ingredient(BaseModel):
    id: int = Field(..., description="Ingredient ID from Spoonacular")
    name: str = Field(..., description="Name of the ingredient")
    image: str = Field(..., description="Image URL for the ingredient")
    nutrition: NutritionInfo
    unit: Optional[str] = Field("g", description="Unit for the ingredient amount")
    amount: float = Field(..., description="Amount of the ingredient")
