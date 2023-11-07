// API Variables

// OLD Nutritionix API Key: 95e7d0fbaa2c3f8adb4e92d058479d8e
var nutritionAPIKey = "70dc469aad0d66d24fd3f2e094ec08c6"
var recipeAPIKey = "ee23ef98a6daf89098efa5d42c0e32fc"

var nutritionURL = "https://trackapi.nutritionix.com/v2/natural/nutrients"
var recipeURL = "https://api.edamam.com/api/recipes/v2";

var x = document.getElementById("input-element")
var search = document.querySelector("#search")
var searchButton = document.querySelector("#search-button")
var recipeContainer = document.getElementById("recipeContainer")
var nutritionContainer = document.getElementById("nutritionContainer")

// OLD Nutritionix API ID: 7f8298cc
// NEW Nutritionix API ID: ae42a6cd
// Edamam API ID: afa2c155

// Nutritionix API

// function renderNutrition (nutritionResults){
//     var nutritionDiv = document.createElement('div');
//     nutritionDiv.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

//     var nutritionBody = document.createElement('div');
//     nutritionBody.classList.add('card-body');
//     nutritionDiv.append(nutritionBody);

//     var nutritionLabel = document.createElement('h3');
//     nutritionLabel.textContent = nutritionResults.nutrition.label;

//     var nutritionURL = document.createElement('a');
//     nutritionURL.textContent = nutritionResults.nutrition.url;
//     nutritionURL.href = nutritionResults.nutrition.url;

//     nutritionBody.append(nutritionLabel, nutritionURL);

//     nutritionContainer.appendChild(nutritionDiv);
// }


function fetchNutrition(){
    var userInput = search.value
    fetch(nutritionURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-app-id":"0d3573c3", 
            "x-app-key": nutritionAPIKey,
            "x-remote-user-id":"0"
        },
        body: JSON.stringify({
            //"query": "for breakfast i ate 2 eggs, bacon, and french toast",
            "query": userInput,
            "timezone": "US/Eastern"
        })
    })
    .then(function(response){
        console.log (response)
        debugger
        return response.json()
    })
    .then(function(data){
        console.log (data)
    })
}

searchButton.addEventListener('click', fetchNutrition)


// Edamam Recipe API

// create function to print user's recipe results
function printResults(recipeResults){
    // created variable to create a div
    var recipeDiv = document.createElement('div');
    recipeDiv.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

    var recipeBody = document.createElement('div');
    recipeBody.classList.add('card-body');
    recipeDiv.append(recipeBody);
    
    var recipeLabel = document.createElement('h3');
    recipeLabel.textContent = recipeResults.recipe.label;

    var recipeURL = document.createElement('a');
    recipeURL.textContent = recipeResults.recipe.url;
    recipeURL.href = recipeResults.recipe.url;
    
    recipeBody.append(recipeLabel, recipeURL);

    recipeContainer.appendChild(recipeDiv);
}

// create function to fetch recipe data from Edamam API
function fetchRecipe() {
    var userInput = search.value
    fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${userInput}&app_id=afa2c155&app_key=ee23ef98a6daf89098efa5d42c0e32fc`)
    .then(function(response){
    console.log (response)
    // return user input data in json format
    return response.json()
})
// passing response.json into new function named as data
.then(function(data){
    // console.log (data)
    console.log(data.hits)
    // loop through data.hits to return each array as their own object
    for (let i = 0; i < data.hits.length; i++) {
        printResults(data.hits[i]);
        
    }
})
}

searchButton.addEventListener('click', fetchRecipe)


// Recipe and Ingredients localStorage

var recipeInput = document.querySelector('#userText')
var recipeBtn = document.querySelector('#recipeBtn')
recipeBtn.addEventListener("click", function () {
    localStorage.setItem('recipe', recipeInput.value);
})
function getData() {
    document.querySelector("#userText").value = localStorage.getItem('recipe');
}
getData();


var recipeEl = document.querySelector(".saveBtn");
