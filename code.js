// - Adam: Skapa och visa upp recepten i er applikation

// - Emelie: Visa upp "error" till användaren om användaren missat fylla i något i formuläret.

// - Done? En bild på maträtten (inte viktigt vilken bild eller att det är en exakt bild på Bolognese utan en bild på pasta är ok, men alla recept ska ha en unik bild, receptet ska inte ha en bild som ett annat recept har)

// - Petra: Betygsättning i applikationen (kan vara till exempel att man ska kunna trycka på en knapp så ökas en siffra kopplat till det receptet)

// - Emelie: Kunna radera ett recept så det inte syns längre i applikationen.

// - Shanti: Kunna ändra/redigera ett recept

// - Om det finns tid: Shanti: localstorage - behåll recepten på sidan ???

// Emelie
// Här är min kod

//Adam

function fetchData() {
  fetch("./recipes.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => console.log(data));
}

fetchData();

//Petra

//Shanti

// Extra >>>>>>>>>>>>>>> Uttråkad Emelie
// söka efter recept
// användarregistrering
// inloggning
// kategorisering
