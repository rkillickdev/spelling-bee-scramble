let topDisplay = document.getElementById("top-display");

const answerDisplay = document.getElementById("answer");

let answerBoxes = document.getElementsByClassName("answer-box");

let answerLetters = document.getElementsByClassName("answer-letter")

let infoDisplay = document.getElementById("display");

let displayMain = document.getElementById("display-main");

const scrambleDisplay = document.getElementById("scramble");

let scrambleBoxes = document.getElementsByClassName("scramble-box");

const scrambleButtons = document.getElementsByClassName("scramble-button");

const buttonArray = Array.from(scrambleButtons);

const controlsDisplay = document.getElementById("controls");

const removeLetter = document.getElementById("remove-letter");

const submitAnswer = document.getElementsByClassName("check-answer");

let correctAnswer = "";

let playerAnswer = [];

let level = "";

let challengeWords = [];

const wordCollection = [
    {
        word: "pear",
        hint: "soft juicy fruit",
        picture: "",
        description: "a green pear",
        level: "easy",
        category: "fruit"
    },
    {
        word: "ball",
        hint: "round rolling object",
        picture: "",
        description: "a ball",
        level: "easy",
        category: "sport"     
    },
    {
        word: "peach",
        hint: "a furry fruit",
        picture: "assets/images/peach-fruit-icon.png",
        description: "a peach",
        level: "medium",
        category: "animal"     
    },
    {
        word: "APPLE",
        hint: "crunchy fruit",
        picture: "assets/images/fresh-apple-icon.png",
        description: "an apple",
        level: "medium",
        category: "fruit" 
    },
    {
        word: "carrot",
        hint: "orange vegetable",
        picture: "",
        description: "a carrot",
        level: "hard",
        category: "vegetable" 
    },
    {
        word: "cherry",
        hint: "small red fruit",
        picture: "",
        description: "a cherry",
        level: "hard",
        category: "fruit"       
    }
]

/** 
 * Sets challenge difficulty level. Called by event listeners on settings page where the function will
 * recieve an argument of "easy", "medium" or "hard".  The function then iterates over the wordCollection
 * array and adds objects to the challengeWords array based on the level of difficulty selected.  It also
 * confirms that the word is the correct number of characters for the difficulty level.
*/
function changeDifficulty(difficulty) {
    if (difficulty === "easy") {
        easyDisplay();
        wordCollection.forEach(function(collection) {
            if (collection.level === "easy" && collection.word.length === 4) {
                challengeWords.push(collection);
            }
        })
    } else if (difficulty === "medium") {
        mediumDisplay(); 
        wordCollection.forEach(function(collection) {
            if (collection.level === "medium" && collection.word.length === 5) {
                challengeWords.push(collection);
            }
        })
    } else if (difficulty === "hard") {
        wordCollection.forEach(function(collection) {
            if (collection.level === "hard" && collection.word.length === 6) {
                challengeWords.push(collection);
            }
        })
    }   
}

/**
 * The 5th and 6th answer and scramble boxes are removed from display and grid
 * set to a 4 column layout.
 */
function easyDisplay() {
    answerBoxes[5].remove();
    answerBoxes[4].remove();
    scrambleBoxes[5].remove();
    scrambleBoxes[4].remove();
    document.getElementById("answer-tiles").classList.remove('grid-tiles-6');
    document.getElementById("answer-tiles").classList.add('grid-tiles-4');
    document.getElementById("scramble-tiles").classList.remove('grid-tiles-6');
    document.getElementById("scramble-tiles").classList.add('grid-tiles-4');
}

/**
 * The 6th answer and scramble box are removed from display and grid
 * set to a 5 column layout.
 */
function mediumDisplay() {
    answerBoxes[5].remove();
    scrambleBoxes[5].remove();
    document.getElementById("answer-tiles").classList.remove('grid-tiles-6');
    document.getElementById("answer-tiles").classList.add('grid-tiles-5');
    document.getElementById("scramble-tiles").classList.remove('grid-tiles-6');
    document.getElementById("scramble-tiles").classList.add('grid-tiles-5');
}

/**
 * Generates random word from challengeWords array, splits the individual letters into the 
 * wordLetters array and scrambles these in a random order.
 * I used the following tutorial to help with coding this: https://www.youtube.com/watch?v=4-s3g_fU7Vg
 */
function playGame() {
    playerAnswer.length = 0;
    for(let letter of answerLetters){
        letter.innerHTML = "";
    }
    buttonArray.forEach(function(currentLetter) {
        currentLetter.disabled = false;
    });
    let randomWord = challengeWords[Math.floor(Math.random() * challengeWords.length)];
    correctAnswer = randomWord.word;
    let wordLetters = correctAnswer.split("");
    for (let x = wordLetters.length - 1; x > 0 ; x--) {
        let y = Math.floor(Math.random() * (x + 1));
        [wordLetters[x], wordLetters[y]] = [wordLetters[y], wordLetters[x]];
    }
    // Populate each scramble box with a letter from the scrambled word
    wordLetters.forEach((letter, index) => {
        scrambleButtons[index].innerHTML = letter;
      });
    // Retrieves image path from randomWord object and stores in the variable pictureHint  
    let pictureHint = randomWord.picture;
    displayMain.innerHTML = `<img src = "${pictureHint}">`;
}

changeDifficulty("medium");
// playGame();


// Add event listeners for all boxes containing a scrambled letter
buttonArray.forEach(function(currentLetter) {
    currentLetter.addEventListener('click', function(event){
        if (playerAnswer.length < answerBoxes.length) {
            playerAnswer.push(event.target.innerText);
        }
        if (answerLetters[0].childNodes.length === 0) {
            answerLetters[0].innerText = playerAnswer[0];
        } else if (answerLetters[1].childNodes.length === 0) {
            answerLetters[1].innerText = playerAnswer[1];           
        } else if (answerLetters[2].childNodes.length === 0) {
            answerLetters[2].innerText = playerAnswer[2];
        } else if (answerLetters[3].childNodes.length === 0) {
            answerLetters[3].innerText = playerAnswer[3];
        } else if (answerLetters[4].childNodes.length === 0) {
            answerLetters[4].innerText = playerAnswer[4];
        } else if (answerLetters[5].childNodes.length === 0) {
            answerLetters[5].innerText = playerAnswer[5];
        }
        this.disabled = true;        
    });  
});

console.log(playerAnswer);

/**
 * Removes the last item in the playerAnswer array
 */
function backSpace() {
    playerAnswer.pop();
}

// Event listener for backspace button which triggers the backSpace function on click
removeLetter.addEventListener('click', backSpace);

console.log(playerAnswer);

/**
 * Turns the playerAnswer array into a string and compares this
 * against the correct answer.
 */
function checkAnswer() {
    let submittedAnswer = playerAnswer.join("");
    if (submittedAnswer === correctAnswer) {
        addPoint();
    } else {
        alert("Incorrect!")
    }
    playGame();
}

function gameToggle(display) {
    if (display === "show") {
        // answerDisplay.style.visibility = "visible";
        // scrambleDisplay.style.visibility = "visible";
        // controlsDisplay.style.visibility = "visible";
        topDisplay.innerHTML = `<div>Score: <span id="score">0</span></div>
        <div>Time Remaining: <span id="timer">60</span></div>`

    } else if (display === "hide") {
        answerDisplay.style.visibility = "hidden";
        scrambleDisplay.style.visibility = "hidden";
        controlsDisplay.style.visibility = "hidden";
    }
}

gameToggle("show");

let score = document.getElementById("score");
let totalScore = 0;
let scoreTarget = 8;

function addPoint() {
    totalScore++;
    score.innerText = totalScore;
    if (totalScore >= 2) {
        gameToggle("hide");
        displayMain.innerHTML = "Congratulations!";
    }
}

let startCountDown = setInterval(countDown, 1000);
let timer = document.querySelector('#timer');
let timeLeft = 60;

function countDown() {
    timeLeft--;
    timer.innerText = timeLeft;
    if (timeLeft === 0) {
        clearInterval(startCountDown);
        let correctRequired = (scoreTarget - totalScore);
        infoDisplay.innerHTML = `Keep trying! You need ${correctRequired} more correct answers next time!`;

        console.log(correctRequired);
    }
}

// Event listener for submit answer button.  Runs checkAnswer function
submitAnswer[0].addEventListener('click', checkAnswer);

// Event listener for play button.  Runs playGame function
const playButton = document.getElementById("play-game");
playButton.addEventListener('click', playGame);




