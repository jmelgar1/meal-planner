// components/MealCard/MealCard.jsx
import React from 'react';
import styles from './RecipeCard.module.css';

function RecipeCard({ recipe }) {
    return (
        <div className={styles.recipeCard}>
            <div className={styles.imageContainer}>
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className={styles.recipeImage}
                    onError={(e) => {
                        e.target.src = '/placeholder-food.jpg'; // Fallback image
                    }}
                />
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{recipe.title}</h3>

                <div className={styles.stats}>
                    <span className={styles.likes}>❤️ {recipe.likes}</span>
                    <span className={styles.ingredientCount}>
                        🛒 {recipe.usedIngredients.length} ingredients used
                    </span>
                </div>

                <div className={styles.ingredientLists}>
                    <div className={styles.usedIngredients}>
                        <h4>In Your Kitchen</h4>
                        <ul>
                            {recipe.usedIngredients.map(ingredient => (
                                <li key={ingredient.id}>
                                    {ingredient.original}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {recipe.missedIngredients.length > 0 && (
                        <div className={styles.missingIngredients}>
                            <h4>Missing</h4>
                            <ul>
                                {recipe.missedIngredients.map(ingredient => (
                                    <li key={ingredient.id}>
                                        {ingredient.original}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RecipeCard;