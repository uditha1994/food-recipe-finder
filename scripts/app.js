// TheMealDB API
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

//DOM elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const mealType = document.getElementById('meal-type');
const dietType = document.getElementById('diet-type');
const cuisineType = document.getElementById('cuisine-type');
const resultsContainer = document.getElementById('results-container');
const loadingElement = document.getElementById('loading');
const noResultsElement = document.getElementById('no-results');
const errorElement = document.getElementById('error-message');

//event listeners
searchBtn.addEventListener('click', searchRecipes);
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchRecipes();
    }
})

async function searchRecipes() {
    const query = searchInput.value.trim();

    if (!query) {
        alert('Please enter a search term');
        return;
    }

    showLoading();

    try {
        let response = await fetch(`${BASE_URL}search.php?s=${query}`);
        let data = await response.json();

        if (!data.meals || data.meals.length === 0) {
            //if no results try searching by ingredients
            response = await fetch(`${BASE_URL}filter.php?i=${query}`);
            data = await response.json();
        }

        if (!data.meals || data.meals.length === 0) {
            displayResults([]);
            return;
        }

        const trasformedResults = data.meals.map(meal => ({
            recipe: {
                label: meal.strMeal,
                image: meal.strMealThumb,
                totalTime: 30,
                calories: 500,
                ingredientLines: getIngredientsList(meal),
                url: meal.strSource || '#'
            }
        }));

        displayResults(trasformedResults);

    } catch (error) {
        showError();
        console.error('Error fetching recipes: ', error);
    }
}

function getIngredientsList(meal) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push(`${measure} ${ingredient}`.trim());
        }
    }

    return ingredients;
}

function displayResults(recipes) {
    hideLoading();
    hideError();
    resultsContainer.innerHTML = '';

    if (!recipes || recipes.length === 0) {
        noResultsElement.style.display = 'block';
        return;
    }

    noResultsElement.style.display = 'none'

    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;

        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';

        recipeCard.innerHTML = `
            <img src="${recipe.image || 'https://via.placeholder.com/300x200?text=No+Image'}"
              class="recipe-image" alt="${recipe.label}">
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.label}</h3>
                <div class="recipe-details">
                    <span><i class="fas fa-clock"></i> ${recipe.totalTime || 'N/A'} min</span>
                    <span><i class="fas fa-chart-pie"></i> ${recipe.calories || 'N/A'} calories</span>
                </div>
                <div class="recipe-ingredients">
                    <h4>Key Ingredients: </h4>
                    <ul>
                        ${(recipe.ingredientLines || []).slice(0, 5).map
                (ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
                <a href="${recipe.url || '#'}" target="_blank" class="view-recipe">
                View Full Recipe</a>
            </div>
        `;

        resultsContainer.appendChild(recipeCard);
    })
}

function showLoading() {
    loadingElement.style.display = 'flex';
    resultsContainer.style.display = 'none';
    noResultsElement.style.display = 'none';
    errorElement.style.display = 'none';
}

function hideLoading() {
    loadingElement.style.display = 'none';
    resultsContainer.style.display = 'grid'
}

function showError() {
    errorElement.style.display = 'block';
    resultsContainer.style.display = 'none';
    loadingElement.style.display = 'none';
    noResultsElement.style.display = 'none';
}

function hideError() {
    errorElement.style.display = 'none';
}

//initialize
window.addEventListener('DOMContentLoaded', () => {

})
