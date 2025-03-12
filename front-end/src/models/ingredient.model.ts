export class NutritionInfo {
    calories: number;
    fat: number;
    carbs: number;
    protein: number;

    constructor(data: {
        calories: number,
        fat: number,
        carbs: number,
        protein: number
    }) {
        this.calories = data.calories;
        this.fat = data.fat;
        this.carbs = data.carbs;
        this.protein = data.protein;
    }
}

export class Ingredient {
    food_name: string;
    serving_qty: number;
    serving_unit: string;
    serving_weight_grams: number;
    nutrition: NutritionInfo;
    image?: string;

    constructor(data: {
        food_name: string,
        serving_qty: number,
        serving_unit: string,
        serving_weight_grams: number,
        nutrition: NutritionInfo,
        image?: string
    }) {
        this.food_name = data.food_name;
        this.serving_qty = data.serving_qty;
        this.serving_unit = data.serving_unit;
        this.serving_weight_grams = data.serving_weight_grams;
        this.nutrition = new NutritionInfo(data.nutrition);
        this.image = data.image;
    }

    // Helper method to create from API response
    static fromJson(json: any): Ingredient {
        return new Ingredient({
            food_name: json.food_name,
            serving_qty: json.serving_qty,
            serving_unit: json.serving_unit,
            serving_weight_grams: json.serving_weight_grams,
            nutrition: {
                calories: json.nutrition.calories,
                fat: json.nutrition.fat,
                carbs: json.nutrition.carbs,
                protein: json.nutrition.protein
            },
            image: json.image
        });
    }
}