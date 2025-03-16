import React from 'react';
import SelectedIngredients from '../../selected-ingredients/SelectedIngredients';
import Button from '../../button/Button';
import styles from './SelectedIngredientsPanel.module.css';

const SelectedIngredientsPanel = ({
                                      selectedIngredients,
                                      removeIngredient,
                                      handleCreateRecipes,
                                      recipesLoading
                                  }) => (
    <div className={styles.panel}>
        <h2 className={styles.title} data-icon="selected">
            Selected Items
        </h2>
        <Button
            variant="primary"
            onClick={handleCreateRecipes}
            disabled={selectedIngredients.length === 0}
            className={styles.fullWidthButton}
        >
            {recipesLoading ? 'Generating...' : 'Find Recipes!'}
        </Button>
        <div className={styles.scrollContainer}>
            <SelectedIngredients
                selectedIngredients={selectedIngredients}
                removeIngredient={removeIngredient}
            />
        </div>
    </div>
);

export default SelectedIngredientsPanel;