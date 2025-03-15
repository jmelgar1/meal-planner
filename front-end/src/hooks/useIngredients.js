import { useState, useEffect } from 'react';
import { nutritionixApi } from '../api/nutritionixApi';

export const useIngredients = () => {
    const [input, setInput] = useState('');
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [filteredIngredients, setFilteredIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (input.trim()) {
            setIsLoading(true);
            setError(null);

            nutritionixApi.searchIngredients(input)
                .then(data => setFilteredIngredients([data]))
                .catch(err => {
                    setError(err.message);
                    setFilteredIngredients([]);
                })
                .finally(() => setIsLoading(false));
        } else {
            setFilteredIngredients([]);
        }
    }, [input]);

    const addIngredient = (ingredient) => {
        if (!selectedIngredients.some(item =>
            item.food_name === ingredient.food_name &&
            item.serving_qty === ingredient.serving_qty
        )) {
            setSelectedIngredients(prev => [...prev, ingredient]);
        }
    };

    const removeIngredient = (ingredient) => {
        setSelectedIngredients(prev =>
            prev.filter(item =>
                item.food_name !== ingredient.food_name ||
                item.serving_qty !== ingredient.serving_qty
            )
        );
    };

    return {
        input,
        setInput,
        filteredIngredients,
        selectedIngredients,
        isLoading,
        error,
        addIngredient,
        removeIngredient
    };
};