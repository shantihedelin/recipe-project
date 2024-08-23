// - Adam: Skapa och visa upp recepten i er applikation

// - Emelie: Visa upp "error" till användaren om användaren missat fylla i något i formuläret.

// - Done? En bild på maträtten (inte viktigt vilken bild eller att det är en exakt bild på Bolognese utan en bild på pasta är ok, men alla recept ska ha en unik bild, receptet ska inte ha en bild som ett annat recept har)

// - Petra: Betygsättning i applikationen (kan vara till exempel att man ska kunna trycka på en knapp så ökas en siffra kopplat till det receptet)

// - Emelie: Kunna radera ett recept så det inte syns längre i applikationen.

// - Shanti: Kunna ändra/redigera ett recept

// Emelie
// Här är min kod

//Adam

let recipeList = document.getElementById("recipeList");
// flyttar ut deklareringen av recipes så det blir globalt
let recipes = [];

async function fetchData() {
  let res = await fetch("./recipes.json");
  let result = await res.json();

  recipes = result.recipes;

  console.log(recipes);

  //TODO: om man redigerar, så ta bort knappen "add recipe"

  recipes.forEach((recipe, index) => {
    let recipeElement = document.createElement("div");
    recipeElement.setAttribute("data-index", index);

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
   <button class="edit-btn">Edit</button>
    `;

    recipeList.appendChild(recipeElement);
  });

  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", function () {
      let recipeElement = this.parentElement;
      let index = recipeElement.getAttribute("data-index");
      editRecipe(recipes[index], index);
    });
  });
}

function editRecipe(recipe, index) {
  document.getElementById("title").value = recipe.title;
  document.getElementById("ingredients").value = recipe.ingredients.join(", ");
  document.getElementById("instructions").value = recipe.instructions;

  let saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.setAttribute("id", "saveBtn");

  let form = document.getElementById("form");
  form.appendChild(saveBtn);

  saveBtn.addEventListener("click", function (event) {
    event.preventDefault();

    recipe.title = document.getElementById("title").value;
    recipe.ingredients = document
      .getElementById("ingredients")
      .value.split(", ");
    recipe.instructions = document.getElementById("instructions").value;

    recipeList.innerHTML = "";
    fetchData();

    saveBtn.remove();

    form.reset();
    console.log(recipes);
  });
}

fetchData();

//Petra

// Extra >>>>>>>>>>>>>>> Uttråkad Emelie
// söka efter recept
// användarregistrering
// inloggning
// kategorisering
