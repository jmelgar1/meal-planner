export const foodIcons = {
    1: '🥛', // Dairy
    2: '🍗', // Protein
    3: '🍎', // Fruit
    4: '🥦', // Vegetable
    5: '🥩', // Meat
    6: '🍞', // Grain
    7: '🥑', // Fat
    8: '🍽️'  // Other
};

export const getFoodIcon = (foodGroup) => {
    return foodIcons[foodGroup] || '🍽️';
};