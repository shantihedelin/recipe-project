//Get all user inputs
const allInputEls = document.querySelectorAll("form input, textarea");

//Remove recipe
function deleteRecipe(id, recipeElement) {
  //Tar bort recipe from savedRecipes
  savedRecipes = savedRecipes.filter((recipe) => recipe.id !== id);

  // Tar bort recipe från the DOM
  recipeElement.remove();
}

//Sökfält //2.0
const searchBar = document.getElementById("search-bar");
const searchResults = document.getElementById("search-results");

searchBar.addEventListener("input", function () {
  handleSearchTerm(searchBar.value);
});

// klicka utanför search = hide search results
document.addEventListener("click", function (e) {
  if (!searchBar.contains(e.target)) {
    searchResults.style.display = "none";
  }
});

function handleSearchTerm(searchTerm) {
  searchResults.innerHTML = "";
  if (searchTerm) {
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    filteredRecipes.forEach((recipe) => {
      const resultItem = document.createElement("div");
      resultItem.innerHTML = `
    <h3>${recipe.title}</h3>
    <img src="${recipe.imageURL}"> 
    <p>Ingredients: </p>
    <ul>
        ${recipe.ingredients
          .map((ingredient) => `<li>${ingredient}</li>`)
          .join("")} 
    </ul>
    <p>Instructions:</p>
    <p>${recipe.instructions}</p> 
    
   
  `;
      resultItem.addEventListener("click", () => {
        displayRecipe(recipe);
      });
      searchResults.appendChild(resultItem);
    });
    searchResults.style.display = "block";

    if (filteredRecipes.length === 0) {
      searchResults.textContent = "Sorry! We do not have that recipe :(";
    }
  } else {
    searchResults.style.display = "none";
  }
}

//Adam

let recipeList = document.getElementById("recipeList");
let recipes = [];
let savedRecipes = [];
let recipeForm = document.getElementById("form");
let recipeTitleInput = document.getElementById("title");
let instructionsInput = document.getElementById("instructions");
let ingredientsInput = document.getElementById("ingredients");
let imageInput = document.getElementById("image");

async function fetchData() {
  let res = await fetch("./recipes.json");
  let result = await res.json();

  recipes = result.recipes;

  console.log(recipes);

  // för varje recept körs renderRecipe funktionen
  // som tar emot recipe som argument
  recipes.forEach((recipe) => {
    renderRecipe(recipe);
  });
  initializeStarRatings();
}

function renderRecipe(recipe) {
  let recipeElement = document.createElement("div");
  let recipeElement = document.createElement("div");

  //TODO: edit button på nya skapade recept?
  // Jag la till functionalitet för deletebtn här/ Emelie

  // lägger till receptets id i html:n
  recipeElement.dataset.id = recipe.id;

  recipeElement.innerHTML = `
    <h3>${recipe.title}</h3>
    <img src="${recipe.imageURL}"> 
    <p>Ingredients: </p>
    <ul>
        ${recipe.ingredients
          .map((ingredient) => `<li>${ingredient}</li>`)
          .join("")} 
    </ul>
    <p>Instructions:</p>
    <p>${recipe.instructions}</p> 
    <span class="stars" data-id="${recipe.id}">
            ${"<span>☆</span>".repeat(5)}
    </span>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  `;

  // här väljs alla knappar som har klassen "edit-btn"
  // och en eventListener läggs till alla sådana knappar
  // och funktionen editRecipe körs när man klickar på dom
  recipeElement
    .querySelector(".edit-btn")
    .addEventListener("click", function () {
      editRecipe(recipe, recipeElement);
    });
  recipeList.appendChild(recipeElement);
}

initializeStarRatings();

function editRecipe(recipe, recipeElement) {
  // värdet som är i fälten är det som det "stod" innan,
  // så man slipper skriva om allt.
  document.getElementById("title").value = recipe.title;
  document.getElementById("ingredients").value = recipe.ingredients.join(", ");
  document.getElementById("instructions").value = recipe.instructions;

  // om man är i edit läge så dölj "add new recipe knappen"
  let addRecipeBtn = document.getElementById("submitBtn");
  addRecipeBtn.style.display = "none";

  // om det redan finns en save recipe knapp sedan innan,
  // ta bort den innan, så det inte är två likadana knappar
  let existingSaveBtn = document.getElementById("saveBtn");
  if (existingSaveBtn) {
    existingSaveBtn.remove();
  }

  // skapa en save recipe/changes button
  // och lägg till den till recipeForm
  // varje knapp får id:et "saveBtn"
  let saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.setAttribute("id", "saveBtn");
  recipeForm.appendChild(saveBtn);

  // spara knappen får en event lyssnare
  saveBtn.addEventListener("click", function (event) {
    event.preventDefault();

    recipe.title = recipeTitleInput.value;
    recipe.ingredients = ingredientsInput.value.split(", ");
    recipe.instructions = instructionsInput.value;

    // receptelementet byggs om med dom uppdaterade
    // ändringarna för att det ska synas direkt på sidan
    // efter att man har sparat.
    recipeElement.innerHTML = `
      <h3>${recipe.title}</h3>
      <p>Ingredients: </p>
      <ul>
          ${recipe.ingredients
            .map((ingredient) => `<li>${ingredient}</li>`)
            .join("")} 
      </ul>
      <p>Instructions:</p>
      <p>${recipe.instructions}</p> 
      <span class="stars" data-id="${recipe.id}">
              ${"<span>☆</span>".repeat(5)}
      </span>
      <button class="edit-btn">Edit</button>
    `;

    // en ny eventlyssnare till den nya edit
    // knappen som följer med efter att man har editat klart
    recipeElement
      .querySelector(".edit-btn")
      .addEventListener("click", function () {
        editRecipe(recipe, recipeElement);
      });
    initializeStarRatings();

    saveBtn.remove();
    addRecipeBtn.style.display = "block";
    form.reset();
  });
}

fetchData();

function renderSaved() {
  savedRecipes.forEach((recipe) => {
    let recipeElement = document.createElement("div");

    recipeElement.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="${recipe.imageURL}"> 
      <p>Ingredients: </p>
      <ul>
          ${recipe.ingredients
            .map((ingredient) => `<li>${ingredient}</li>`)
            .join("")} 
      </ul>
      <p>Instructions:</p>
      <p>${recipe.instructions}</p> 
      <span class="stars" data-id="${recipe.id}">
      ${"<span>☆</span>".repeat(5)}
      </span>
    `;

    recipeList.appendChild(recipeElement);
  });
  initializeStarRatings();
}

recipeForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // La in min kod här// Emelie
  let formIsFilled = true;

  //remove old error messages
  document
    .querySelectorAll(".error-message")
    .forEach((errorEl) => errorEl.remove());

  for (let i = 0; i < allInputEls.length; i++) {
    const input = allInputEls[i];

    if (input.value.trim() === "") {
      formIsFilled = false;
      const errorMessageEl = document.createElement("div");
      errorMessageEl.classList.add("error-message");
      errorMessageEl.style.marginTop = "10px";
      if (!input.placeholder) {
        errorMessageEl.textContent = "Please upload a photo";
      } else {
        errorMessageEl.textContent = `Please fill in the ${input.placeholder.toLowerCase()}`;
      }
      input.insertAdjacentElement("beforebegin", errorMessageEl);
    }
  }

  if (formIsFilled) {
    console.log("Form is filled, Submit!");

    let recipeIng = ingredientsInput.value.split(/\r?\n/);
    let recipeIns = instructionsInput.value.split(/\r?\n/);

    let recipeObject = {
      id: Math.floor(Math.random() * 100),
      imageURL: imageInput.value,
      ingredients: recipeIng,
      instructions: recipeIns,
      title: recipeTitleInput.value,
    };

    recipeForm.reset();

    savedRecipes.push(recipeObject);
    renderSaved();
    console.log(savedRecipes);
  } else {
    console.log("Form is not filled correctly");
    return;
  }
});

//The rating functionality //Petra

function initializeStarRatings() {
  const starsContainers = document.querySelectorAll(".stars");

  starsContainers.forEach((container) => {
    // Converting the stars (children elements) in the star-container into an array
    const stars = Array.from(container.children);
    //Listening for clicks on each star
    stars.forEach((star, index) => {
      star.addEventListener("click", function () {
        //rating based on the index of the star clicked
        const rating = index + 1;

        //removing the filled state so each new click can update the state
        stars.forEach((s) => s.classList.remove("filled"));
        //then adding filled class according to the index of the star clicked

        for (let i = 0; i < rating; i++) {
          stars[i].classList.add("filled");
        }
      });
    });
  });
}
