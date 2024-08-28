const recipes = {
    pasta: {
        name: "Pasta",
        ingredients: [
            {name: "Spaghetti", quantity: 100, unit: "g"},
            {name: "Tomato Sauce", quantity: 150, unit: "ml"},
            {name: "Garlic", quantity: 1, unit: "clove"}
        ],
        instructions: "Boil the spaghetti. Sauté garlic in a pan. Add tomato sauce and cook for 5 minutes. Mix with spaghetti and serve."
    },
    salad: {
        name: "Salad",
        ingredients: [
            {name: "Lettuce", quantity: 100, unit: "g"},
            {name: "Tomatoes", quantity: 2, unit: "pcs"},
            {name: "Olive Oil", quantity: 30, unit: "ml"}
        ],
        instructions: "Chop the lettuce and tomatoes. Mix in a bowl. Drizzle olive oil on top and serve."
    },
    pancakes: {
        name: "Pancakes",
        ingredients: [
            {name: "Flour", quantity: 100, unit: "g"},
            {name: "Milk", quantity: 200, unit: "ml"},
            {name: "Egg", quantity: 1, unit: "pcs"}
        ],
        instructions: "Mix flour, milk, and egg. Heat a pan and pour the batter. Cook until golden brown on both sides."
    }
};

function loadRecipe() {
    const selectedRecipe = document.getElementById('recipe').value;
    const recipeDetails = document.getElementById('recipe-details');
    if (selectedRecipe) {
        const recipe = recipes[selectedRecipe];
        recipeDetails.innerHTML = `
            <h2>${recipe.name}</h2>
            <h3>Ingredients:</h3>
            <ul id="ingredients-list">
                ${recipe.ingredients.map(ingredient => 
                    `<li>${ingredient.quantity} ${ingredient.unit} ${ingredient.name}</li>`
                ).join('')}
            </ul>
            <h3>Instructions:</h3>
            <p>${recipe.instructions}</p>
        `;
    } else {
        recipeDetails.innerHTML = '';
    }
}

function updateServings() {
    const selectedRecipe = document.getElementById('recipe').value;
    const servings = document.getElementById('servings').value;
    const ingredientsList = document.getElementById('ingredients-list');
    if (selectedRecipe && ingredientsList) {
        const recipe = recipes[selectedRecipe];
        ingredientsList.innerHTML = recipe.ingredients.map(ingredient =>
            `<li>${ingredient.quantity * servings} ${ingredient.unit} ${ingredient.name}</li>`
        ).join('');
    }
}