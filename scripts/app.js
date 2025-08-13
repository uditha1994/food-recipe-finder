//DOM elements
const searchInput = document.getElementById('search-input');
const searchBt = document.getElementById('search-button');
const mealType = document.getElementById('meal-type');
const dietType = document.getElementById('diet-type');
const cuisineType = document.getElementById('cuisine-type');
const resultsContainer = document.getElementById('results-container');
const loadingElement = document.getElementById('loading');
const noResultsElement = document.getElementById('no-results');
const errorElement = document.getElementById('error-message');

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
    showLoading();
})
