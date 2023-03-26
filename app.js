let number = Math.floor(Math.random() * 100) + 1;

const sound = new Audio('sound.mp3');

const submitButton = document.querySelector("#submit");
const resultEl = document.querySelector("#result");
const easyButton = document.querySelector("#easy");
const mediumButton = document.querySelector("#medium");
const hardButton = document.querySelector("#hard");
const difficultyDisplay = document.querySelector("#difficulty-selector");
const attemptNumber = document.querySelector("#attempts-number");

//default difficulty and parameters 
let attempts = 10;
let difficulty = "medium";
let roundInProgress = false;

function updateAttempts() {
    if (difficulty === "easy") {
      attempts = 15;
    } else if (difficulty === "hard") {
      attempts = 5;
    } else {
      attempts = 10;
    }
  }
  
  updateAttempts();

//Enables new difficulty to be selected if roundInProgress is false, updates attempts to the selected difficulty chosen
function setDifficulty (newDifficulty) {
    if (newDifficulty !== difficulty && !roundInProgress) {
        difficulty = newDifficulty;
        updateAttempts();
    }
}

//Defines difficulty for each button
easyButton.addEventListener('click', function() {
    setDifficulty("easy");
  });
  
  mediumButton.addEventListener('click', function() {
    setDifficulty("medium");
  });
  
  hardButton.addEventListener('click', function() {
    setDifficulty("hard");
  });

// Game rendering function, changes attempts as the button is pressed, renders the visual cues and information, resets color after round is finished  
submitButton.addEventListener('click', function() {
  resultEl.style.removeProperty('color');
  const guess = document.querySelector("#guess").value;
  
  // Check if input is empty
  if (guess.trim() === "") {
      resultEl.style.color = "red";
      resultEl.textContent = "Please enter a number!";
      return;
  }
  
  // Check if input is a number
  if (isNaN(guess)) {
      resultEl.style.color = "red";
      resultEl.textContent = "Please enter a valid number!";
      return;
  }

  if (guess > 100 || guess < 1) {
    resultEl.style.color = "red";
      resultEl.textContent = "Please enter a number between 1 and 100!";
      return;
  }
  
  attempts --;
  roundInProgress = true;
    if (guess == number) {
      resultEl.style.color = "green";
        resultEl.textContent = `Congratulations! You've guessed the correct number with ${attempts} attempts left! But I'm already thinking of a new number! Use the buttons above now if you wish to change difficulty.`;
        number = Math.floor(Math.random() * 100) +1;
        document.querySelector("#guess").value = "";
        sound.play();
        updateAttempts();
        roundInProgress = false;
    } else if (guess < number) {
        resultEl.textContent = `Too low! I'm thinking of a higher number`;
    } else if (guess > number) {
        resultEl.textContent = `Too high! I'm thinking of a smaller number`;
    }

    if (attempts === 0) {
        resultEl.style.color = "red";
        resultEl.textContent = `You've reached your attempt limit, game over! But I'm already thinking of a new number! Use the buttons above now if you wish to change difficulty.`;
        number = Math.floor(Math.random() * 100) +1;
        document.querySelector("#guess").value = "";
        updateAttempts();
        roundInProgress = false;
    }
    attemptNumber.textContent = `Attempts left: ${attempts}`;
});

//Locks the user in for a chosen difficulty level for the duration of that round, resets attempts, it also renders the correct information and attempts left according to the difficulty chosen and game stage
easyButton.addEventListener('click', function() {
    if (!roundInProgress) {
        difficultyDisplay.textContent = "Current difficulty: Easy";
        roundInProgress = false;
        setDifficulty("easy");
        updateAttempts();
        attemptNumber.textContent = `Attempts left: ${attempts}`;
    }
});

mediumButton.addEventListener('click', function() {
    if (!roundInProgress) {
        difficultyDisplay.textContent = "Current difficulty: Medium"
        roundInProgress = false;
        setDifficulty("medium");
        updateAttempts();
        attemptNumber.textContent = `Attempts left: ${attempts}`;
    }
});

hardButton.addEventListener('click', function() {
    if (!roundInProgress) {
        difficultyDisplay.textContent = "Current difficulty: Hard"
        roundInProgress = false;
        setDifficulty("hard");
        updateAttempts();
        attemptNumber.textContent = `Attempts left: ${attempts}`;
    }
});
