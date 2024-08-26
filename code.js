// - Adam: Skapa och visa upp recepten i er applikation

// - Emelie: Visa upp "error" till användaren om användaren missat fylla i något i formuläret.

// - Done? En bild på maträtten (inte viktigt vilken bild eller att det är en exakt bild på Bolognese utan en bild på pasta är ok, men alla recept ska ha en unik bild, receptet ska inte ha en bild som ett annat recept har)

// - Petra: Betygsättning i applikationen (kan vara till exempel att man ska kunna trycka på en knapp så ökas en siffra kopplat till det receptet)

// - Emelie: Kunna radera ett recept så det inte syns längre i applikationen.

// Emelie
// Här är min kod

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
}

function renderRecipe(recipe) {
  let recipeElement = document.createElement("div");

  //TODO: edit button på nya skapade recept?

  recipeElement.innerHTML = `
    <h3>${recipe.title}</h3>
    <img src=${recipe.imageURL}>
    <p>Ingredients: </p>
    <ul>
        ${recipe.ingredients
          .map((ingredient) => `<li>${ingredient}</li>`)
          .join("")}
    </ul>
    <p>Instructions:</p>
    <p>${recipe.instructions}</p>
  <span class="stars" data-id="${recipe.id}">
      ☆☆☆☆☆
    </span>
   <button class="edit-btn">Edit</button>
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
      ☆☆☆☆☆
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
        <img src=${recipe.imageURL}>
        <p>Ingredients: </p>
        <ul>
            ${recipe.ingredients
              .map((ingredient) => `<li>${ingredient}</li>`)
              .join("")}
        </ul>
        <p>Instructions:</p>
        <p>${recipe.instructions}</p>
         <span class="stars" data-id="${recipe.id}">
          ☆☆☆☆☆
        </span>
        `;
    recipeList.appendChild(recipeElement);
  });
}

recipeForm.addEventListener("submit", function (e) {
  e.preventDefault();
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
});

//The rating functionality //Petra

function initializeStarRatings() {
  const starsContainers = document.querySelectorAll(".stars");

  starsContainers.forEach((container) => {
    const stars = Array.from(container.children);
    stars.forEach((star, index) => {
      star.addEventListener("click", function () {
        // Determine the rating based on the clicked star
        const rating = index + 1;

        // Clear existing filled class from all stars
        stars.forEach((s) => s.classList.remove("filled"));

        // Add 'filled' class to the selected stars
        for (let i = 0; i < rating; i++) {
          stars[i].classList.add("filled");
        }

        // Log the rating
        console.log(`Recipe ${container.dataset.id} rated with ${rating}/5`);
      });
    });
  });
}

// Extra >>>>>>>>>>>>>>> Uttråkad Emelie
// söka efter recept
// användarregistrering
// inloggning
// kategorisering
