const gameContainer = document.getElementById("game");

let activelyFlippedCards = [];
let attemptCount = 0;
let started = false;
let ended = false;
let matchCount = 0;

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

let totalMatches = COLORS.length / 2;

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

    // increment attempt count
    document.getElementById("attempt_display").innerText = `Attempts: ${++attemptCount}`;


    // if two cards are match
    if (activelyFlippedCards[0].className === activelyFlippedCards[1].className) {
      // leave up
      activelyFlippedCards = [];

      // increment match count
      matchCount++;

      // check for win
      if (matchCount >= totalMatches) {
        // game end
        ended = true;

        // display score or whatever
        const displayScore = document.createElement("p");
        displayScore.innerText = `You won in ${attemptCount} tries!`;
        document.body.appendChild(displayScore);

        // save "high" score
        const highScore = localStorage.getItem("best");
        if (!highScore || attemptCount < highScore) {
          localStorage.setItem("best", attemptCount);
          document.getElementById("highscore_display").innerText = `High score: ${attemptCount}`;
        }
      }
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

const highScore = localStorage.getItem("best");

const highScoreDisplay = document.createElement("p");
highScoreDisplay.id = "highscore_display";
highScoreDisplay.innerText = (highScore) ? `High score: ${highScore}` : `No high score!`;
document.body.appendChild(highScoreDisplay)

document.getElementById("start_game").addEventListener("click", () => {

  if (ended) return;

  if (!started) {
    // start the game 
    createDivsForColors(shuffle(COLORS));

    // add attempt count display
    const attemptCountDisplay = document.createElement("p")
    attemptCountDisplay.id = "attempt_display";
    attemptCountDisplay.innerText = `Attempts: ${attemptCount}`;
    document.body.appendChild(attemptCountDisplay);

    // re-append high score display
    const tempHighScoreDisplay = document.getElementById("highscore_display").cloneNode(true);
    document.body.removeChild(document.getElementById("highscore_display"));
    document.body.appendChild(tempHighScoreDisplay);

    started = true;
  }
});

document.getElementById("reset_game").addEventListener("click", () => {

  if (started && ended) {
    // clear the pre-existing game
    while (gameContainer.lastChild)
      gameContainer.removeChild(gameContainer.lastChild);

    // create new game
    createDivsForColors(shuffle(COLORS));

    // reset attempts and matches
    attemptCount = 0;
    matchCount = 0;

    // reset displays
    document.getElementById("attempt_display").innerText = `Attempts: ${attemptCount}`;
    document.body.removeChild(document.body.lastChild);

    // update game ended status flag
    ended = false;
  }
});


