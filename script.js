'use strict';

// Generates a random number for the user to guess
let randomNumber = generateRandomNumber();

// Selects the elements from the HTML
const secretNumber = document.querySelector('.number');
const guess = document.querySelector('.guess');

// Sets initial score and high score to their default values
let score = 5;
let highScore = 0;


// TODO: refactor this part to allow for the same behaviour when the user presses the enter key instead of clicking the check button, use a function
// Selects the check button and adds an event listener for click
const checkButton = document.querySelector('.check');
checkButton.addEventListener('click', () => {

    // Gets the guessed number(string) from the input field and converts to a number
    const guessedNumber = Number(guess.value);

    // Checks if the guessed number matches the random number
    checkGuess(guessedNumber, randomNumber);
});


// Selects the play again button and adds an event listener for click
const playAgainButton = document.querySelector('.again');
playAgainButton.addEventListener('click', () => {

    // Resets the game by removing win class, generating a new random number and resetting the secret number, message, score and guess
    document.querySelector('body').classList.remove('win');

    randomNumber = generateRandomNumber();

    secretNumber.textContent = "?";
    displayMessage("Start guessing...");

    score = 5;
    displayScore(score);

    guess.value = '';
});


// Generates a random number between 1 and 20 (inclusive)
function generateRandomNumber() {
    return Math.trunc((Math.random() * 20) + 1);
}


// Displays a message to the user
function displayMessage(message) {

    document.querySelector('.message').textContent = message;
}


// Displays the current score to the user
function displayScore(score) {

    document.querySelector('.score').textContent = score;
}


// Checks if the guessed number matches the random number, and updates the score and message accordingly
function checkGuess(guess, randomNumber) {

    // If there is no guessed number, displays an error message
    if (!guess) {
        displayMessage("No number to check! 😞");
    }

    // If the guessed number matches the random number, the user wins
    else if (guess === randomNumber) {

        // Displays a win message
        displayMessage("🏆 Correct Number!");

        // Displays the correct number as the secret number
        secretNumber.textContent = randomNumber;

        // Adds a win class to the body for styling purposes
        document.querySelector('body').classList.add('win');

        // If the current score is higher than the high score, updates the high score
        if (score > highScore) {
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }
    }

    // If the guessed number does not match the random number, the user loses a point
    else if (guess !== randomNumber) {

        // If the user still has points left, displays a message to guess higher or lower and updates the score
        if (score > 1) {

            // Displays a message to guess higher or lower based on the guessed number
            displayMessage(guess > randomNumber ? "Too high!" : "Too low!");

            // Subtracts one from the score and displays the new score
            score--;
            displayScore(score);
        }

        // If the user has no points left, displays a game over message and resets the score to zero
        else {
            score = 0;
            displayScore(score);
            displayMessage("🤯 GAME OVER!");
        }
    }
}