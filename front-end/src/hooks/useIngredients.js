import { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';

export const useIngredients = () => {
    const [input, setInput] = useState('');
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [filteredIngredients, setFilteredIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const lastQueryRef = useRef(''); // Track last executed query

    const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

    // Debounced API call with 2000ms wait
    const searchIngredients = debounce(async (query) => {
        // Only search if query has changed
        if (query === lastQueryRef.current) return;

        try {
            setIsLoading(true);
            setError(null);
            lastQueryRef.current = query; // Store current query

            const response = await fetch(
                `${API_BASE}/api/foods/nutrition?query=${encodeURIComponent(query)}`
            );

            const contentType = response.headers.get('content-type');
            if (!contentType?.includes('application/json')) {
                throw new Error('Invalid response format');
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'API request failed');
            }

            const data = await response.json();
            setFilteredIngredients([data]);
        } catch (err) {
            setError(err.message);
            setFilteredIngredients([]);
        } finally {
            setIsLoading(false);
        }
    }, 2000); // 2000ms = 2 seconds

    useEffect(() => {
        if (input.trim()) {
            searchIngredients(input);
        } else {
            setFilteredIngredients([]);
        }

        return () => searchIngredients.cancel();
    }, [input, searchIngredients]);

    const addIngredient = (ingredient) => {
        if (!selectedIngredients.some(item =>
            item.food_name === ingredient.food_name &&
            item.serving_qty === ingredient.serving_qty
        )) {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
    };

    const removeIngredient = (ingredient) => {
        setSelectedIngredients(selectedIngredients.filter(item =>
            item.food_name !== ingredient.food_name ||
            item.serving_qty !== ingredient.serving_qty
        ));
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