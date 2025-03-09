import { useState } from 'react';
import chickenImage from '../images/chicken.png';

export const useIngredients = () => {
    const [input, setInput] = useState('');
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const mockIngredients = [
        { id: 1, name: 'Chicken', image: chickenImage },
    ];

    const filteredIngredients = mockIngredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(input.toLowerCase())
    );

    console.log('Filtered Ingredients:', filteredIngredients);

    const addIngredient = (ingredient) => {
        if (!selectedIngredients.some(item => item.id === ingredient.id)) {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
    };

    const removeIngredient = (ingredient) => {
        setSelectedIngredients(selectedIngredients.filter(item => item.id !== ingredient.id));
    };

    return {
        input,
        setInput,
        filteredIngredients,
        selectedIngredients,
        addIngredient,
        removeIngredient
    };
};
