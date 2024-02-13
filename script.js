const gameContainer = document.getElementById("game");

let activelyFlippedCards = [];

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {

  // check if more than 2 cards have been clicked since "reset"
  if (activelyFlippedCards.length >= 2) {
    return;
  }

  // do nothing if card is already matched (or active)
  if (event.target.style.backgroundColor)
    return;

  // change card background to class color
  event.target.style.backgroundColor = event.target.className;
  activelyFlippedCards.push(event.target);

  if (activelyFlippedCards.length == 2) {

    // if it's the same card, reset
    if (activelyFlippedCards[0] === activelyFlippedCards[1]) {
      activelyFlippedCards.pop();
    }

    // if two cards are match
    if (activelyFlippedCards[0].className === activelyFlippedCards[1].className) {
      // leave up
      activelyFlippedCards = [];
    }
    else {
      // else leave up for 1 second and reset
      setTimeout(() => {
        activelyFlippedCards[0].style.backgroundColor = "";
        activelyFlippedCards[1].style.backgroundColor = "";
        activelyFlippedCards = [];
      }, 1000);
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
