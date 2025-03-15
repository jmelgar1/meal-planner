export interface RecipeIngredient {
    id: number;
    name: string;
    amount: number;
    unit: string;
    original: string;
    image?: string;
}

export interface Recipe {
    id: number;
    title: string;
    image: string;
    likes: number;
    usedIngredients: RecipeIngredient[];
    missedIngredients: RecipeIngredient[];
    unusedIngredients: RecipeIngredient[];
}