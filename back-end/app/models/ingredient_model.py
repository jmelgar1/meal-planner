from pydantic import BaseModel, Field
from typing import Optional

class NutritionInfo(BaseModel):
    calories: float = Field(..., description="Calories in kcal", json_schema_extra={"example": 33.81})
    fat: float = Field(..., description="Total fat in grams", json_schema_extra={"example": 0.08})
    carbs: float = Field(..., description="Carbohydrates in grams", json_schema_extra={"example": 8.87})
    protein: float = Field(..., description="Protein in grams", json_schema_extra={"example": 0.35})

class Ingredient(BaseModel):
    food_name: str = Field(..., json_schema_extra={"example": "grape"})
    serving_qty: float = Field(..., json_schema_extra={"example": 10})
    serving_unit: str = Field(..., json_schema_extra={"example": "grapes"})
    serving_weight_grams: float = Field(..., json_schema_extra={"example": 49})
    nutrition: NutritionInfo
    food_group: Optional[int] = Field(
        default=None,
        description="Food category (1=Dairy, 2=Protein, 3=Fruit, 4=Vegetable, 5=Meat, 6=Grain, 7=Fat, 8=Other)",
        json_schema_extra={"example": 3}
    )
    image: Optional[str] = Field(
        default=None,
        json_schema_extra={"example": "https://nix-tag-images.s3.amazonaws.com/586_thumb.jpg"}
    )