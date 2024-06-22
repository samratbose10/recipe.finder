document.getElementById('find-recipes').addEventListener('click', () => {
    const ingredients = document.getElementById('ingredient-input').value;
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    const appId = '5d911119'; // Replace with your Edamam APP ID
    const appKey = '50d7095ebb81ff549869b90d8d008472'; // Replace with your Edamam APP KEY
    const apiUrl = `https://api.edamam.com/search?q=${ingredients}&app_id=${appId}&app_key=${appKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the API response to understand its structure
            const recipes = data.hits;

            if (recipes && recipes.length > 0) {
                recipes.forEach(hit => {
                    const recipe = hit.recipe;
                    const recipeDiv = document.createElement('div');
                    recipeDiv.className = 'recipe';
                    recipeDiv.innerHTML = `
                        <h3>${recipe.label}</h3>
                        <img src="${recipe.image}" alt="${recipe.label}">
                        <p><a href="${recipe.url}" target="_blank">View Recipe</a></p>
                    `;
                    recipesContainer.appendChild(recipeDiv);
                });
            } else {
                recipesContainer.textContent = 'No recipes found for the given ingredients.';
            }
        })
        .catch(error => {
            recipesContainer.textContent = 'An error occurred while fetching recipes. Please try again.';
            console.error('Error fetching recipes:', error);
        });
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setRandomGradient() {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const angle = Math.floor(Math.random() * 360);
    document.body.style.background = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}

setInterval(setRandomGradient, 5000);
setRandomGradient();
