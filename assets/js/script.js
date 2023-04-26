document.addEventListener("DOMContentLoaded", function() {
    challengeWords.length = 0;
    changeDifficulty(currentDifficulty);
})

// GLOBAL VARIABLES

const topDisplay = document.getElementById("top-display");

const playerMessage = document.getElementById("player-message");

const playerInstructions = document.getElementById("player-instructions");

const feedbackInfo =document.getElementById("feedback-info");

const answerDisplay = document.getElementById("answer");

const answerBoxes = document.getElementsByClassName("answer-box");

const answerLetters = document.getElementsByClassName("answer-letter")

const infoDisplay = document.getElementById("display");

const displayMain = document.getElementById("display-main");

const scoreBox = `

    <div class="grid grid-tiles-2" >
        <div class="flex-rows">
            <h2>Score</h2>   
            <div id="score" class="counters">0</div>
        </div>
        <div class="flex-rows">
            <h2>Time</h2>
            <div id="timer" class="counters">60</div>
        </div>
    </div>

`

const playButtonStructure = `

    <button type="button" id="play-game" class="control-button">
        <img src="assets/images/go-icon.png" alt="round green go icon">
    </button>
`

const scrambleDisplay = document.getElementById("scramble");

const scrambleBoxes = document.getElementsByClassName("scramble-box");

const scrambleButtons = document.getElementsByClassName("scramble-button");

const buttonArray = Array.from(scrambleButtons);

const controlBox = document.getElementById("control-box");

const submitAnswer = document.getElementsByClassName("check-answer");

let correctAnswer = "";

let playerAnswer = [];

let totalScore = 0;

let scoreTarget = 2;

let timeLeft = 60;

let startCountDown;

let currentDifficulty = "easy";

let challengeWords = [];

let chosenWord;

let nextStep;

let levelGraphic;

let usedWords =[];

// FUNCTIONS

/**
 * Toggles between home screen setting where player controls are hidden and
 * game screen where controlsa are visible and layout of the top box changes
 * to display score counter and countdown clock. 
 */
function gameToggle(display) {
    if (display === "home") {
        document.getElementById("controls").classList.toggle("hidden");
    } else if (display === "game") {
        document.getElementById("controls").classList.toggle("hidden");        
        document.getElementById("feedback-info").className = "flex";
        topDisplay.innerHTML = scoreBox;
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
        nextStep = "You're ready for the next level...";
        levelGraphic ="assets/images/star-symbol-icon.png";
        easyDisplay();  
        wordCollection.forEach(function(collection) {
            if (collection.level === "easy" && collection.word.length === 4) {
                challengeWords.push(collection);
            }
        currentDifficulty = "easy";
        })
    } else if (difficulty === "medium") {
        nextStep = "You're doing great...";
        levelGraphic = "assets/images/achievement-award-medal-icon.png"
        mediumDisplay(); 
        wordCollection.forEach(function(collection) {
            if (collection.level === "medium" && collection.word.length === 5) {
                challengeWords.push(collection);
            }
        currentDifficulty = "medium";
        })
    } else if (difficulty === "hard") {
        hardDisplay();
        nextStep = "You have reached the top level!"
        levelGraphic = "assets/images/1st-prize-icon.png"       
        wordCollection.forEach(function(collection) {
            if (collection.level === "hard" && collection.word.length === 6) {
                challengeWords.push(collection);
            }
            currentDifficulty = "hard";
        })
    }
    console.log("Challenge Words as game run" ,challengeWords);   
}

/**
 * The 5th and 6th answer and scramble boxes are hidden from display but remain in 
 * the DOM.  Grid set to a 4 column layout using the grid-tiles-4-class.
 */
function easyDisplay() {
    answerBoxes[4].style.display = 'none';
    answerBoxes[5].style.display = 'none';
    scrambleBoxes[4].style.display = 'none';
    scrambleBoxes[5].style.display = 'none';
    document.getElementById("answer-tiles").className = "grid grid-tiles-4";
    document.getElementById("scramble-tiles").className = "grid grid-tiles-4";    
}

/**
 * The 6th answer and scramble box is hidden from display but remains in 
 * the DOM.  Grid set to a 5 column layout using the grid-tiles-5-class.
 */
function mediumDisplay() {
    answerBoxes[4].style.display = 'block';
    scrambleBoxes[4].style.display = 'block';
    answerBoxes[5].style.display = 'none';
    scrambleBoxes[5].style.display = 'none';
    document.getElementById("answer-tiles").className = "grid grid-tiles-5";
    document.getElementById("scramble-tiles").className = "grid grid-tiles-5"; 
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
    document.getElementById("answer-tiles").className = "grid grid-tiles-6";
    document.getElementById("scramble-tiles").className = "grid grid-tiles-6";     
}

/**
 * Runs on click of "Go" button.
 * Resets the length of the challengeWords array to zero before it is populated 
 * by the playGame function.  This makes sure that no words from other difficulty 
 * settings appear in the next game. 
 * Total score reset to zero.
 * The default difficulty level is set according to the global currentDifficulty variable.
 * Global timeLeft variable set to 60.
 * Starts clock countdown.
 * Runs playGame function
 */
function runGame() { 
    challengeWords.length = 0;
    totalScore = 0;
    changeDifficulty(currentDifficulty);
    gameToggle("game");
    timeLeft = 60;
    startClock();
    playGame();
}

/**
 * Starts countdown from time specified in timeLeft variable.  
 * Inserts timeLeft into the HTML and sends a message to the player once time has run out.
 */
function countDown() {
    let timer = document.querySelector('#timer');
    timeLeft--;
    timer.innerText = timeLeft;
    if (timeLeft === 0) {
        stopClock();
        let correctRequired = (scoreTarget - totalScore);
        topDisplay.innerHTML = `
        
        <div id="feedback-info" class="flex-rows">
            <div id= "player-message">
                <h1>Keep trying!</h1>
            </div>
            <div class="single-image-display">
                <img src="assets/images/clapping-icon.png" alt="a gold star">
            </div>
            <div id= "player-instructions">
                <h2>You need ${correctRequired} more correct next time!</h2>
            </div>
        </div> 

        `;
        displayMain.innerHTML = playButtonStructure;
    }
}

/**
 * Sets interval for startCountDown variable.
 */
function startClock() {
    startCountDown = setInterval(countDown, 1000);
}

/**
 * Clears Interval of the startCountDown variable.
 */
function stopClock() {
    clearInterval(startCountDown);     
}
/**
 * Runs resetLetterBoxes and generateWord functions.
 */
function playGame() {
    resetLetterBoxes();
    generateWord();
}

/**
 * Generates random word from challengeWords array, splits the individual letters into the 
 * wordLetters array and scrambles these in a random order.
 * I used the following tutorial to help with coding this: https://www.youtube.com/watch?v=4-s3g_fU7Vg
 * The scrambled word is checked against the correct answer to make sure they are never the same.  If this
 * evaluates to false, the scramble boxes are populated with the scrambled letters. And the related
 * image url is inserted into the html.
 * At the end of the function, the index of random word is stored in the variable chosenWord.  This is
 * used in the handleOldWords function to remove a word form the challengeWords once it has ben used, so
 * the same words do not keep coming up.
 */
function generateWord() {
    let randomWord = challengeWords[Math.floor(Math.random() * challengeWords.length)];
    correctAnswer = randomWord.word;
    let wordLetters = correctAnswer.split("");
    for (let x = wordLetters.length - 1; x > 0 ; x--) {
        let y = Math.floor(Math.random() * (x + 1));
        [wordLetters[x], wordLetters[y]] = [wordLetters[y], wordLetters[x]];
    }
    let scrambledString = wordLetters.join("");
    if (scrambledString === correctAnswer) {
        return;
    } else {
        // Populate each scramble box with a letter from the scrambled word
        wordLetters.forEach((letter, index) => {
            scrambleButtons[index].innerHTML = letter;
        });
        // Retrieves image path from randomWord object and stores in the variable pictureHint  
        let pictureHint = randomWord.picture;
        displayMain.innerHTML = `<img src = "${pictureHint}">`;
        // Finds index of the random word within the challengeWords array.
        chosenWord = challengeWords.indexOf(randomWord);
        // handleOldWords();
    }   
}

/**
 * Sets the playerAnswer array to a length of zero in readiness for the next answer.
 * clearAnswer function emptys the text from the Answer boxes.
 * Scramble buttons are reactivated so the player can input a fresh answer.
 */
function resetLetterBoxes() {
    playerAnswer.length = 0;
    clearAnswer();
    buttonArray.forEach(function(currentLetter) {
        currentLetter.disabled = false;
    });
}

/**
 * Removes the word that has just been displayed from the
 * challengeWords array to prevent it being chosen again.
 * These removed words are stored in a new array called usedWords.
 * If there are no more words left in the challengeWords array,
 * it is refilled with the usedWords.  This function is to help
 * with duplicate words being generated during a game.
 */
// function handleOldWords() {
//     let removedWord = challengeWords.splice(chosenWord);
//     // Gets object from the returned array 
//     // POSSIBLY NOT NEEDED?
//     // let wordUsed = removedWord[0];
//     // Stores in a new array called usedWords
//     usedWords.push(removedWord[0]);
//     removedWord.length = 0;
//     console.log("Removed:", removedWord);
//     // console.log("Object removed from array:", wordUsed )
//     console.log("Array of used Words:" ,usedWords);
//     console.log("Challenge Words after removal" ,challengeWords);
//     // THIS COULD BE CAUSING PROBLEM AS CHALLENEG WORDS LENGTH IS SET TO ZERO FOR EACH NEW GAME
//     // if (challengeWords.length === 0) {
//     //     challengeWords = usedWords;    
//     // }
//     // 
// }
    

/**
 * Clears all answer boxes of their letters
 */
function clearAnswer() {
    for(let letter of answerLetters){
        letter.innerHTML = "";
    }   
}

/**
 * Clears all scramble boxes of their letters.
 */
function clearScramble(){
    for(let button of scrambleButtons){
        button.innerHTML = "";
    }
}

/**
 * Add event listeners for all boxes containing a scrambled letter. 
 * Clicking on each scrambled letter then pushes this to the playerAnswer 
 * array. Also checks if an answer box is empty and if so poulates it with 
 * the scramble letter that has been clicked.
 * After each scramble button is clicked, it is disabled so the same letter 
 * cannot be entered again.
*/
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

/**
 * Turns the playerAnswer array into a string, converts the 
 * correct answer to upper case letters and then compares the
 * two against each other.  If they are equal, a point is added
 * to the score counter and styling for the answer boxes change
 * to give the player feedback.
 */
function checkAnswer() {
    let submittedAnswer = playerAnswer.join("");
    let correctUpperAnswer = correctAnswer.toUpperCase();
    if (submittedAnswer === correctUpperAnswer) {
        addPoint();
    } else {
        alert("Incorrect!")
    }
}

/**
 * Checks total score against score target.  If equal: 
 * The countdown clock is stopped. 
 * Global currentDifficulty level updated according to the current value
 * so the level of difficulty increases if a challeneg is completed.
 * Message and associated image displayed based on which difficulty
 * level has been completed.
 * Answer and scramble boxes cleared.
 * The run game button is made visible so the player can play again.
 * Player controls are hidden.
 * If the score target has not been reached, the playGame function runs which
 * generates the next word.
 */
function checkScore() {
    if (totalScore === scoreTarget) {
        stopClock();
        if (currentDifficulty === "easy") {
            currentDifficulty = "medium";
        } else if (currentDifficulty === "medium") {
            currentDifficulty = "hard";
        } else if (currentDifficulty === "hard") {
            hardDisplay();
        }
        let levelMessage = nextStep;
        let encouragingImage = levelGraphic;
        topDisplay.innerHTML = `
        
        <div id="feedback-info" class="flex-rows">
            <div id= "player-message">
                <h1>Congratulations... you did it!</h1>
            </div>
            <div class="single-image-display">
                <img src=${encouragingImage} alt="a gold star">
            </div>
            <div id= "player-instructions">
                <h2>${levelMessage}</h2>
            </div>
        </div> 

        `;
        clearAnswer();
        clearScramble();
        displayMain.innerHTML = playButtonStructure;
        gameToggle("home");
    } else {
        playGame();
    } 
}

/**
 * The global total Score variable is incremented by 1 and this value is
 * inserted in the score box.
 */
function addPoint() {
    let score = document.getElementById("score");
    totalScore++;
    score.innerText = totalScore;
}

/**
 * Function used by the run game event listener.
 * I had to research and implement Event Bubbling for this, as the event
 * listener was not not working when I dynamically reloaded the html for
 * the button after successful completion of a challenge.
 * I used and tweaked code from the following article to get this working:
 * https://dev.to/akhil_001/adding-event-listeners-to-the-future-dom-elements-using-event-bubbling-3cp1
 */
function playButtonEventListener (selector, event, handler) {
    let rootElement = document.querySelector('#display-main');
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

// EVENT LISTENERS

/**
 * Toggles the 'hidden' class to show and hide the instructions box.
 */
function toggleInstructions() {
    document.getElementById("instructions").classList.toggle('hidden');
    topDisplay.classList.toggle('hidden');
}

/**
 * Toggles the 'hidden' class to show and hide the settings box.
 */
function toggleSettings() {
    document.getElementById("settings").classList.toggle('hidden');
    topDisplay.classList.toggle('hidden'); 
}

// Event listener for submit answer button.  Runs checkAnswer function.
submitAnswer[0].addEventListener('click', checkAnswer);
submitAnswer[0].addEventListener('click', checkScore);

// Event listener for clear answer button.
const removeAnswer = document.getElementById("remove-answer");
removeAnswer.addEventListener('click', resetLetterBoxes);

//Event listener for show instructions button.
const showInstructions = document.getElementById("show-instructions");
showInstructions.addEventListener('click', toggleInstructions);

//Event listener for show settings button.
const showSettings = document.getElementById("show-settings");
showSettings.addEventListener('click', toggleSettings);

//Event listener for hide instructions button.
const hideInstructions = document.getElementById("hide-instructions");
hideInstructions.addEventListener('click', toggleInstructions);

//Event listener for hide settings button.
const hideSettings = document.getElementById("hide-settings");
hideSettings.addEventListener('click', toggleSettings);

// Event listener for easy difficulty settings button.
const selectEasy = document.getElementById("select-easy");
selectEasy.addEventListener('click' , function() {
    currentDifficulty = "easy";   
});

// Event listener for easy difficulty settings button.
const selectMedium = document.getElementById("select-medium");
selectMedium.addEventListener('click' , function() {
    currentDifficulty = "medium";    
});

// Event listener for easy difficulty settings button.
const selectHard = document.getElementById("select-hard");
selectHard.addEventListener('click' , function() {
    currentDifficulty = "hard";
});

//Event listener for game run button
playButtonEventListener('#play-game','click', runGame );
