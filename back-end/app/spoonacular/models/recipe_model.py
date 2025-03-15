from pydantic import BaseModel, Field
from typing import List, Optional

class RecipeIngredient(BaseModel):
    name: str = Field(..., examples=["baking powder"])
    amount: float = Field(..., examples=[1.0])
    unit: str = Field(..., examples=["tsp"])
    original: str = Field(..., examples=["1 tsp baking powder"])
    image: Optional[str] = Field(default=None, examples=["https://example.com/image.jpg"])

class Recipe(BaseModel):
    id: int = Field(..., examples=[73420])
    title: str = Field(..., examples=["Apple Strudel"])
    image: str = Field(..., examples=["https://example.com/recipe.jpg"])
    likes: int = Field(..., examples=[0])
    usedIngredients: List[RecipeIngredient] = Field(default_factory=list)
    missedIngredients: List[RecipeIngredient] = Field(default_factory=list)
    unusedIngredients: List[RecipeIngredient] = Field(default_factory=list)