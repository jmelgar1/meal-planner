class Ingredient {
    constructor({ id, name, nutrition, image, unit = "g" }) {
        this.id = id;
        this.name = name;
        this.nutrition = nutrition;
        this.image = image;
        this.unit = unit;
    }

    // Method to scale nutrition based on a given serving size
    scaleNutrition(servingSize, originalAmount) {
        const scaleFactor = servingSize / originalAmount;

        return Object.fromEntries(
            Object.entries(this.nutrition).map(([key, value]) => [
                key,
                (value * scaleFactor).toFixed(2)
            ])
        );
    }

    // Utility method for displaying data
    getSummary(servingSize, originalAmount) {
        const scaledNutrition = this.scaleNutrition(servingSize, originalAmount);
        return {
            name: this.name,
            servingSize: `${servingSize}${this.unit}`,
            nutrition: scaledNutrition,
            image: this.image
        };
    }
}

// Example usage
const pineapple = new Ingredient({
    id: 9266,
    name: "Pineapples",
    nutrition: {
        Fat: 1.09,
        Carbohydrates: 118.74,
        Protein: 4.89,
        Calories: 452.5
    },
    image: "pineapple.jpg"
});

// Scale to 150g serving size (original data was for 905g)
console.log(pineapple.getSummary(150, 905));
