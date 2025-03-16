import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { nutritionixApi } from '../api/nutritionixApi';

export const useIngredients = () => {
    const [input, setInput] = useState('');
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [filteredIngredients, setFilteredIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Create a debounced search function
    const debouncedSearch = useCallback(
        debounce(async (query) => {
            if (!query.trim()) {
                setFilteredIngredients([]);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                const results = await nutritionixApi.searchIngredients(query);
                setFilteredIngredients(results);
            } catch (err) {
                setError(err.message);
                setFilteredIngredients([]);
            } finally {
                setIsLoading(false);
            }
        }, 500), // reduced debounce time to 500ms for better UX
        []
    );

    useEffect(() => {
        // Cancel any pending debounce on unmount
        return () => debouncedSearch.cancel();
    }, [debouncedSearch]);

    useEffect(() => {
        // Trigger debounced search when input changes
        debouncedSearch(input);
    }, [input, debouncedSearch]);

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