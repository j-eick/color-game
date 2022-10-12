
var numSquares = 6;
var colors = [];
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var headerColor = document.querySelector("#header");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

/**
 * TO DO:
 * - add reflection to images
 */

setupDifficultyButtons();

setupSquares();

resetGame();

function setupDifficultyButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            if (this.textContent === "Easy") {
                numSquares = 3;
            } else {
                numSquares = 6;
            }
            resetGame();
        });
    }
}

function setupSquares() {
    // changes Color-Name in Title
    colorDisplay.textContent = pickedColor;

    // assignes each square a color from the list 
    for (var i = 0; i < squares.length; i++) {
        // // add initial colors to squares
        // squares[i].style.backgroundColor = colors[i];
        // add click listeners to squares
        squares[i].addEventListener("click", function () {
            // assign color of clicked square to var 
            var clickedColor = this.style.backgroundColor;
            // if guessed correct
            if (clickedColor === pickedColor) {
                // change all square-colors to solution-color
                changeColors(clickedColor);
                // change header-color    
                headerColor.style.backgroundColor = pickedColor;
                // change button-description
                resetButton.textContent = "Play again";
                messageDisplay.textContent = "good!";

            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "try again!";
            }
            // compare color to pickedColor
        });
    }
}

/**
 * reset game
 */
resetButton.addEventListener("click", function () {
    resetGame();
});

/**
 *  function resets a game
 */
function resetGame() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = colors[i];

        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }
        else {
            squares[i].style.display = "none";
        }
    }
    headerColor.style.background = "#4A79A8";
    messageDisplay.textContent = "";
    resetButton.textContent = "New Colors";
}

/**
 * this assigns the guessed color to all other squares
 * @param {*} guessedColor 
 */
function changeColors(guessedColor) {
    for (var i = 0; i < colors.length; i++) {
        squares[i].style.backgroundColor = guessedColor;
    }
}

/**
 * creates a new array with a forwarded number of colors (e.g. 6)
 * @param {*} num 
 */
function generateRandomColors(num) {
    //generate number between 0 and 255 ; 3 times    
    var arrayOfColors = [];
    for (var i = 0; i < num; i++) {
        var ct1 = Math.floor(Math.random() * 255);
        var ct2 = Math.floor(Math.random() * 255);
        var ct3 = Math.floor(Math.random() * 255);
        var color = "rgb(" + ct1 + ", " + ct2 + ", " + ct3 + ")";
        arrayOfColors.push(color);
    }
    return arrayOfColors;
}

/**
 * function picks a random color from array of colors
 */
function pickColor() {
    var pickedColor = colors[Math.floor(Math.random() * colors.length)];
    return pickedColor;
}