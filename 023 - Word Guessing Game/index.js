const inputs = document.querySelector(".word"),
  hintTag = document.querySelector(".hint span"),
  guessLeft = document.querySelector(".guess span"),
  mistakes = document.querySelector(".wrong span"),
  resetBtn = document.querySelector(".reset"),
  hintBtn = document.querySelector(".show-hint"),
  hintElement = document.querySelector(".hint"),
  typeInput = document.querySelector(".type-input");

//   Initializing Game Variables
let word,
  incorrectLetters = [],
  correctLetters = [],
  maxGuesses;

// Select Random Word from Word List & Set Up Game
function startNewGame() {
  alert("New Game Started! Guess New Word :)");
  // Hint Hide Element
  hintElement.style.display = "none";
  hintElement.style.opacity = "0";

  // Choose Random Word from Database and Setup Game
  const ranWord = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranWord.word;
  // If Word Chars >= 5 then Max Guess = 8 Else Max Guess = 6
  maxGuesses = word.length >= 5 ? 8 : 6;
  incorrectLetters = [];
  correctLetters = [];
  hintTag.innerText = ranWord.hint;
  guessLeft.innerText = maxGuesses;
  mistakes.innerText = incorrectLetters;

  // Create Input for Each Letter of Word
  inputs.innerHTML = "";
  for (let i = 0; i < word.length; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.disabled = true;
    inputs.appendChild(input);
  }
}

// Handle User Input and Update Game Stats
function handleInput(e) {
  // Ignore Non-Letters Input and Letter That Have Already Been Guessed
  const key = e.target.value.toLowerCase();
  if (
    key.match(/^[a-z]+$/i) &&
    !incorrectLetters.includes(` ${key}`) &&
    !correctLetters.includes(` ${key}`)
  ) {
    // Check If The Letter Is In Word
    if (word.includes(key)) {
      // Update Correct Guess
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          inputs.querySelectorAll("input")[i].value += key;
        }
      }
      correctLetters += key;
    } else {
      // Update Incorrect guess
      maxGuesses--;
      incorrectLetters.push(` ${key}`);
      mistakes.innerText = incorrectLetters;
    }
  }

  // Update Remaining Guesses and Check for Win/Lose Conditions
  guessLeft.innerText = maxGuesses;
  if (correctLetters.length === word.length) {
    alert(`Congrats! You Found the Word ${word.toUppercase()}!`);
    startNewGame();
  } else if (maxGuesses < 1) {
    alert(`Game Over! You Don't Have Any Remaining Guesses!`);
    for (let i = 0; i < word.length; i++) {
      // Fill Inputs With Correct Words
      inputs.querySelectorAll("input")[i].value = word[i];
    }
  }

  // Clear Input Field
  typeInput.value = "";
}

// Show Hint Element
function showHintElement() {
  hintElement.style.display = "block";
  hintElement.style.opacity = "1";
}

// Setup Event Listeners
resetBtn.addEventListener("click", startNewGame);
hintBtn.addEventListener("click", showHintElement);
typeInput.addEventListener("input", handleInput);
inputs.addEventListener("click", () => typeInput.focus());
document.addEventListener("keydown", () => typeInput.focus());

startNewGame();
