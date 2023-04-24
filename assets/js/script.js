document.addEventListener("DOMContentLoaded", function() {
    changeDifficulty(currentDifficulty);
    easyDisplay();
    gameToggle("home");
})

let topDisplay = document.getElementById("top-display");

let playerMessage = document.getElementById("player-message");
let playerInstructions = document.getElementById("player-instructions");

let feedbackInfo =document.getElementById("feedback-info");

const answerDisplay = document.getElementById("answer");

let answerBoxes = document.getElementsByClassName("answer-box");

let answerLetters = document.getElementsByClassName("answer-letter")

let infoDisplay = document.getElementById("display");

let displayMain = document.getElementById("display-main");

const playButtonStructure = `

    <button type="button" id="play-game" class="control-button">
        <img src="assets/images/go-icon.png" alt="round green go icon">
    </button>
`

const scrambleDisplay = document.getElementById("scramble");

let scrambleBoxes = document.getElementsByClassName("scramble-box");

const scrambleButtons = document.getElementsByClassName("scramble-button");

const buttonArray = Array.from(scrambleButtons);

const controlsDisplay = document.getElementById("controls");

const removeLetter = document.getElementById("remove-letter");

const submitAnswer = document.getElementsByClassName("check-answer");

let correctAnswer = "";

let playerAnswer = [];

let totalScore = 0;
let scoreTarget = 2;

let timeLeft = 60;

let level = "";

let currentDifficulty ="easy";

let challengeWords = [];

const wordCollection = [
    {
        word: "pear",
        hint: "soft juicy fruit",
        picture: "assets/images/pear-icon.png",
        description: "a green pear",
        level: "easy",
        category: "fruit"
    },
    {
        word: "kiwi",
        hint: "New Zealander",
        picture: "assets/images/kiwi-food-icon.png",
        description: "a kiwi fruit",
        level: "easy",
        category: "fruit"     
    },
    {
        word: "peach",
        hint: "a furry fruit",
        picture: "assets/images/peach-fruit-icon.png",
        description: "a peach",
        level: "medium",
        category: "fruit"     
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
        picture: "assets/images/carrot-icon.png",
        description: "a carrot",
        level: "hard",
        category: "vegetable" 
    },
    {
        word: "cherry",
        hint: "small red fruit",
        picture: "assets/images/cherries-icon.png",
        description: "a cherry",
        level: "hard",
        category: "fruit"       
    }
]

function gameToggle(display) {
    if (display === "home") {
        controlsDisplay.style.visibility = "hidden";
        

    } else if (display === "game") {
        controlsDisplay.style.visibility = "visible";
        document.getElementById("feedback-info").classList.remove('flex-rows');
        document.getElementById("feedback-info").classList.add('flex');
        playerMessage.innerHTML = `<div>Score: <span id="score">0</span></div>`
        playerInstructions.innerHTML = `<div>Time Remaining: <span id="timer">60</span></div>`;
    }
}

/** 
 * Sets challenge difficulty level. Called by event listeners on settings page where the function will
 * recieve an argument of "easy", "medium" or "hard".  The function then iterates over the wordCollection
 * array and adds objects to the challengeWords array based on the level of difficulty selected.  It also
 * confirms that the word is the correct number of characters for the difficulty level.
*/
function changeDifficulty(difficulty) {
    if (difficulty === "easy") {
        wordCollection.forEach(function(collection) {
            if (collection.level === "easy" && collection.word.length === 4) {
                challengeWords.push(collection);
            }
        currentDifficulty = "easy";
        })
    } else if (difficulty === "medium") {
        mediumDisplay(); 
        wordCollection.forEach(function(collection) {
            if (collection.level === "medium" && collection.word.length === 5) {
                challengeWords.push(collection);
            }
        currentDifficulty = "medium";
        })
    } else if (difficulty === "hard") {
        hardDisplay();       
        wordCollection.forEach(function(collection) {
            if (collection.level === "hard" && collection.word.length === 6) {
                challengeWords.push(collection);
            }
            currentDifficulty = "hard";
        })
    }   
}


/**
 * The 5th and 6th answer and scramble boxes are hidden from display but remain in 
 * the DOM.  Grid set to a 4 column layout using the grid-tiles-4-class.
 */
function easyDisplay() {
    answerBoxes[4].style.display = 'none';
    answerBoxes[5].style.display = 'none';
    scrambleBoxes[5].style.display = 'none';
    scrambleBoxes[4].style.display = 'none';
    document.getElementById("answer-tiles").classList.toggle('grid-tiles-4');
    document.getElementById("scramble-tiles").classList.toggle('grid-tiles-4');    
}

/**
 * The 6th answer and scramble box is hidden from display but remains in 
 * the DOM.  Grid set to a 5 column layout using the grid-tiles-5-class.
 */
function mediumDisplay() {
    answerBoxes[4].style.display = 'block';
    scrambleBoxes[4].style.display = 'block';
    document.getElementById("answer-tiles").classList.toggle('grid-tiles-4');
    document.getElementById("scramble-tiles").classList.toggle('grid-tiles-4'); 
    document.getElementById("answer-tiles").classList.toggle('grid-tiles-5');
    document.getElementById("scramble-tiles").classList.toggle('grid-tiles-5');
}

/**
 * All 6 answer and scramble boxes are displayed.  Grid set to a 6 column layout
 * using the grid-tiles-6-class. 
 */
function hardDisplay() {
    answerBoxes[4].style.display = 'block';
    answerBoxes[5].style.display = 'block';
    scrambleBoxes[5].style.display = 'block';
    scrambleBoxes[4].style.display = 'block'; 
    document.getElementById("answer-tiles").classList.toggle('grid-tiles-5');
    document.getElementById("scramble-tiles").classList.toggle('grid-tiles-5');
    document.getElementById("answer-tiles").classList.toggle('grid-tiles-6');
    document.getElementById("scramble-tiles").classList.toggle('grid-tiles-6');     
}

/**
 * Runs on click of "Go" button.  This makes sure that the default difficulty level is set to easy, shows
 * the score counter/ countdown timer, player controls and runs the playGame function.
 */
function runGame() {
    // Clears challengeWords array before filling
    challengeWords.length = 0;
    totalScore = 0;
    changeDifficulty(currentDifficulty);
    gameToggle("game");
    timeLeft = 60;
    startClock();
    playGame(); 
}

let startCountDown;

/**
 * Starts countdown from time specified in timeLeft variable.  Inserts timeLeft into the HTML and sends a message to
 * the player once time has run out for the challenge.
 */
function countDown() {
    let timer = document.querySelector('#timer');
    timeLeft--;
    timer.innerText = timeLeft;
    if (timeLeft === 0) {
        stopClock();
        let correctRequired = (scoreTarget - totalScore);
        document.getElementById("feedback-info").classList.remove('flex');
        document.getElementById("feedback-info").classList.add('flex-rows');
        playerMessage.innerHTML = `<p>Keep trying!</p>`;
        playerInstructions.innerHTML = `You need ${correctRequired} more correct answers next time!`;
        displayMain.innerHTML = playButtonStructure;
        console.log(correctRequired);
    }
}

function startClock() {
    startCountDown = setInterval(countDown, 1000);
}

function stopClock() {
    clearInterval(startCountDown);     
}

/**
 * Generates random word from challengeWords array, splits the individual letters into the 
 * wordLetters array and scrambles these in a random order.
 * I used the following tutorial to help with coding this: https://www.youtube.com/watch?v=4-s3g_fU7Vg
 */
function playGame() {
    playerAnswer.length = 0;
    clearAnswer();
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
    console.log(challengeWords);
}
console.log(challengeWords);


/**
 * Clears all answer boxes
 */
function clearAnswer() {
    for(let letter of answerLetters){
        letter.innerHTML = "";
    }   
}

/**
 * Clears all scramble boxes
 */
function clearScramble(){
    for(let button of scrambleButtons){
        button.innerHTML = "";
    }
}

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
}

function checkScore() {
    if (totalScore === scoreTarget) {
        stopClock();
        document.getElementById("feedback-info").classList.remove('flex');
        document.getElementById("feedback-info").classList.add('flex-rows');
        playerMessage.innerHTML = `<p>Congratulations! You passed the challenge!</p>`;
        playerInstructions.innerHTML = `You're ready for the next level!`;
        clearAnswer();
        clearScramble();
        if (currentDifficulty === "easy") {
            currentDifficulty = "medium";
        } else if (currentDifficulty === "medium") {
            currentDifficulty = "hard";
        }
        displayMain.innerHTML = playButtonStructure;
        gameToggle("home");
    } else {
        playGame();
    } 
}

function addPoint() {
    let score = document.getElementById("score");
    totalScore++;
    score.innerText = totalScore;
}

/**
 * Toggles the 'hidden' class to show and hide the instructions box.
 */
function toggleSettings() {
    document.getElementById("instructions").classList.toggle('hidden');
    topDisplay.classList.toggle('hidden');

}

// Event listener for submit answer button.  Runs checkAnswer function
submitAnswer[0].addEventListener('click', checkAnswer);
submitAnswer[0].addEventListener('click', checkScore);

//Event listener for show instructions button.
const showInstructions = document.getElementById("show-instructions");
showInstructions.addEventListener('click',toggleSettings);

//Event listener for hide instructions button.
const hideInstructions = document.getElementById("hide-instructions");
hideInstructions.addEventListener('click', toggleSettings);

/**
 * Event listener for play button which triggers the runGame function.
 * I had to research and implement Event Bubbling for this, as the event
 * listener was not not working when I dynamically reloaded the html for
 * the button after successful completion of a challenge.
 * I used and tweaked code from the following article to get this working:
 * https://dev.to/akhil_001/adding-event-listeners-to-the-future-dom-elements-using-event-bubbling-3cp1
 */

function playButtonEventListener (selector, event, handler) {
    let rootElement = document.querySelector('#display-main');
    //since the root element is set to be body for our current dealings
    rootElement.addEventListener(event, function (evt) {
            var targetElement = evt.target;
            while (targetElement != null) {
                if (targetElement.matches(selector)) {
                    handler(evt);
                    return;
                }
                targetElement = targetElement.parentElement;
            }
        },
        true
    );
}

playButtonEventListener('#play-game','click', runGame );
