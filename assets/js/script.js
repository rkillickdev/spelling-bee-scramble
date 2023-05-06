// MODULE LEVEL CONSTANTS

const DIFFICULTY = {
    EASY: "easy",
    MEDIUM: "medium",
    HARD: "hard"
}

const DISPLAY = {
    HOME: "home",
    GAME: "game"
}

const ANSWER_STATUS = {
    CORRECT: "correct",
    INCORRECT: "incorrect"
}

// HTML ELEMENTS DEFINED

const setLevel= document.querySelectorAll(".set-level");
const topDisplay = document.getElementById("top-display");
const answerBoxes = document.querySelectorAll(".answer-box");
const answerLetters = document.getElementsByClassName("answer-letter");
const displayMain = document.getElementById("display-main");
const feedbackInfo = document.getElementById("feedback-info");
const score = document.getElementById("score");
const timer = document.querySelector('#timer');

const playButtonStructure = `

    <button type="button" id="play-game" class="control-button" aria-label="play game">
        <img src="assets/images/go-icon.png" alt="round green go icon">
    </button>
`;
const scrambleBoxes = document.getElementsByClassName("scramble-box");
const scrambleButtons = document.getElementsByClassName("scramble-button");
const buttonArray = Array.from(scrambleButtons);
const submitAnswer = document.getElementsByClassName("check-answer");

// GLOBAL VARIABLES

let correctAnswer = "";
let randomWord;
let wordLetters;
let scrambledString;
let challengeIndexes = [];
let playerAnswer = [];
let totalScore = 0;
let scoreTarget = 2;
let previousButton = null;
let timeLeft = 60;
let startCountDown;
let currentDifficulty = DIFFICULTY.EASY;
let challengeWords = [];
let nextStep;
let levelGraphic;

// FUNCTIONS

/**
 * Toggles between home screen setting where player controls are hidden and
 * game screen where controlsa are visible and layout of the top box changes
 * to display score counter and countdown clock. 
 */
function gameToggle(display) {
    if (display === DISPLAY.HOME) {
        document.getElementById("controls").classList.toggle("hidden");
        feedbackInfo.className = "flex-rows";
        toggleProgress();
    } else if (display === DISPLAY.GAME) {
        document.getElementById("controls").classList.toggle("hidden");        
        feedbackInfo.className = "flex";
        // topDisplay.innerHTML = scoreBox;
        toggleProgress();
    }
}

/** 
 * Sets challenge difficulty level. Called by event listeners on settings page where the function will
 * recieve an argument of DIFFICULTY.EASY, DIFFICULTY.MEDIUM or DIFFICULTY.HARD.  The function then iterates over the wordCollection
 * array and adds objects to the challengeWords array based on the level of difficulty selected.  It also
 * confirms that the word is the correct number of characters for the difficulty level.
*/
function changeDifficulty(difficulty) {
    if (difficulty === DIFFICULTY.EASY) {
        nextStep = "You're ready for the next level...";
        levelGraphic ="assets/images/star-symbol-icon.png";
        easyDisplay();  
        wordCollection.forEach(function(collection) {
            if (collection.level === DIFFICULTY.EASY && collection.word.length === 4) {
                challengeWords.push(collection);
            }
        currentDifficulty = DIFFICULTY.EASY;
        
        });
    } else if (difficulty === DIFFICULTY.MEDIUM) {
        nextStep = "You need something trickier...";
        levelGraphic = "assets/images/achievement-award-medal-icon.png";
        mediumDisplay(); 
        wordCollection.forEach(function(collection) {
            if (collection.level === DIFFICULTY.MEDIUM && collection.word.length === 5) {
                challengeWords.push(collection);
            }
        currentDifficulty = DIFFICULTY.MEDIUM;
        });
    } else if (difficulty === DIFFICULTY.HARD) {
        hardDisplay();
        nextStep = "You have reached the top level!";
        levelGraphic = "assets/images/1st-prize-icon.png";       
        wordCollection.forEach(function(collection) {
            if (collection.level === DIFFICULTY.HARD && collection.word.length === 6) {
                challengeWords.push(collection);
            }
            currentDifficulty = DIFFICULTY.HARD;
        });
    }
    // Generates array of integers for length of challenegWords array
    for (let i = 0 ; i < challengeWords.length ; i++) {
        challengeIndexes.push(i);
    }
    // Shuffles array of integers in a random order so game always runs in a different order
    integerShuffle();
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
    challengeIndexes.length = 0;
    timeLeft = 60;
    totalScore = 0;
    changeDifficulty(currentDifficulty);
    generateWord();
    gameToggle(DISPLAY.GAME);
    startClock();
    playGame();
}

/**
 * Starts countdown from time specified in timeLeft variable.  
 * Inserts timeLeft into the HTML and sends a message to the player once time has run out.
 */
function countDown() {
    timeLeft--;
    timer.innerText = timeLeft;
    if (timeLeft === 0) {
        stopClock();
        let correctRequired = (scoreTarget - totalScore);
        topDisplay.innerHTML = `
        
        <div id="feedback-info" class="flex-rows">
            <div>
                <h1>Keep trying!</h1>
            </div>
            <div class="single-image-display">
                <img src="assets/images/clapping-icon.png" alt="a gold star">
            </div>
            <div>
                <h2>You need ${correctRequired} more correct next time...</h2>
            </div>
        </div> 

        `;
        clearAnswer();
        clearScramble();
        gameToggle(DISPLAY.HOME);
        buttonArray.forEach(function(currentLetter) {
            currentLetter.disabled = true;
        });
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
    setTimeout(clearAnswerStyle, 2000);
    resetLetterBoxes();
}

/**
 * Removes css styling for correct or incorrect answers from answer boxes.
 */
function clearAnswerStyle () {
   for (let box of answerBoxes) {
    box.classList.remove("answer-box-correct");
    box.classList.remove("answer-box-incorrect"); 
   }
}

/**
 * I used the following tutorial to help with coding this: https://www.youtube.com/watch?v=4-s3g_fU7Vg
 * Generates random word from challengeWords array, splits the individual letters into the  wordLetters array.
 * Runs the scrambleWord function
 * The scrambled word is checked against the correct answer to make sure they are never the same.  If this
 * evaluates to false, the displayScramble function runs
 */
function generateWord() {
    // Word selected from the challengeWords array using index zero of the challengeIndexes array
    randomWord = challengeWords[challengeIndexes[0]];
    correctAnswer = randomWord.word;
    wordLetters = correctAnswer.split("");
    scrambleWord();
    while ((scrambledString === correctAnswer)) {
        scrambleWord();
    }
    displayScramble()
    // The integer occupying index 0 of challengeIndexes sent to the end of this array.
    const firstIndex = challengeIndexes.shift();
    challengeIndexes.push(firstIndex);   
}

/**
 * Displays the scrambled letters in the scramble boxes and displays the picture relating to the chosen
 * word in the div with id display-main
 */
function displayScramble() {
    // Populate each scramble box w ith a letter from the scrambled word
    wordLetters.forEach((letter, index) => {
        scrambleButtons[index].innerHTML = letter;
    });
    // Retrieves image path and alt description from randomWord object and stores in the 
    //variables pictureHint and altDescription. Inserted into HTML using template literals.   
    let pictureHint = randomWord.picture;
    let altDescription = randomWord.description;
    displayMain.innerHTML = `<img src = "${pictureHint}" alt ="${altDescription}">`;
}

/**
 * Takes the letters from the chosen word, scrambles their order and joins them back into
 * a string which is saved in the variable scrambledString.
 */
function scrambleWord(){
    for (let x = wordLetters.length - 1; x > 0 ; x--) {
        let y = Math.floor(Math.random() * (x + 1));
        [wordLetters[x], wordLetters[y]] = [wordLetters[y], wordLetters[x]];
    }
    scrambledString = wordLetters.join("");   
}
    
/**
 * Takes challengeIndexes array of integers and shuffles using the Fisher-Yates method.  I used the
 * following article and code to learn about this way of randomly shuffling integers:
 * https://www.tutorialspoint.com/what-is-fisher-yates-shuffle-in-javascript
 */
function integerShuffle() {
    let i = challengeIndexes.length;
    while (--i > 0) {
        let temp = Math.floor(Math.random() * (i + 1));
        [challengeIndexes[temp], challengeIndexes[i]] = [challengeIndexes[i], challengeIndexes[temp]];
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
    const answerIcon = document.getElementById("answer-icon");
    if (submittedAnswer === correctUpperAnswer) {
        addPoint();
        answerIcon.innerHTML = `<img src = "assets/images/tick-green-icon.png" alt ="A green tick">`;
        answerFeedback(ANSWER_STATUS.CORRECT);
    } else {
        answerIcon.innerHTML = `<img src = "assets/images/cross-icon.png" alt ="A red cross">`;
        answerFeedback(ANSWER_STATUS.INCORRECT);        
    }
    setTimeout(function(){
        answerIcon.innerHTML="";
    }, 1000);
    checkScore();
}

/**
 * Adds styling class to answer boxes depending on whether player
 * answer evaluates to correct or incorrect.
 */
function answerFeedback(answer) {
    if (answer === ANSWER_STATUS.CORRECT) {
        for (let box of answerBoxes) {
            box.classList.add("answer-box-correct");
        }
    } else if (answer === ANSWER_STATUS.INCORRECT) {
        for (let box of answerBoxes) {
            box.classList.add("answer-box-incorrect");
        }           
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
        if (currentDifficulty === DIFFICULTY.EASY) {
            currentDifficulty = DIFFICULTY.MEDIUM;
        } else if (currentDifficulty === DIFFICULTY.MEDIUM) {
            currentDifficulty = DIFFICULTY.HARD;
        } else if (currentDifficulty === DIFFICULTY.HARD) {
            hardDisplay();
        }
        let levelMessage = nextStep;
        let encouragingImage = levelGraphic;
        score.innerText = "0";
        timer.innerText = "60";
        gameToggle(DISPLAY.HOME);
        feedbackInfo.innerHTML = `
        
            <div>
                <h1>You completed the challenge!</h1>
            </div>
            <div class="single-image-display">
                <img src=${encouragingImage} alt="a gold star">
            </div>
            <div>
                <h2>${levelMessage}</h2>
            </div>        

        `;
        clearAnswer();
        clearScramble();
        displayMain.innerHTML = playButtonStructure;
    } else {
        generateWord();
        playGame(); 
    } 
}

/**
 * The global total Score variable is incremented by 1 and this value is
 * inserted in the score box.
 */
function addPoint() {
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

/**
 * Displays toggle-on font awesome icon for when a button is selected.
 * Referenced and modified code from this article to get this function working:
 * https://softauthor.com/make-selected-clicked-button-active-in-javascript/  
 */
function buttonToggle(event) {
    event.target.classList.add('fa-toggle-on');
    if(previousButton !== null) {
        previousButton.classList.remove('fa-toggle-on');
    }
    previousButton = event.target;
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

function toggleProgress() {
    document.getElementById("progress").classList.toggle('hidden');
    topDisplay.classList.toggle('hidden');    
}

// Event listener for submit answer button.  Runs checkAnswer function.
submitAnswer[0].addEventListener('click', checkAnswer);

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

// Event listener for 3 difficulty settings buttons
setLevel.forEach(function(button){
    button.addEventListener('click' , buttonToggle);
});

// Event listener for easy difficulty settings button.
const selectEasy = document.getElementById("select-easy");
selectEasy.addEventListener('click' , function() {
    currentDifficulty = DIFFICULTY.EASY;    
});

// Event listener for medium difficulty settings button.
const selectMedium = document.getElementById("select-medium");
selectMedium.addEventListener('click' , function() {
    currentDifficulty = DIFFICULTY.MEDIUM;    
});

// Event listener for hard difficulty settings button.
const selectHard = document.getElementById("select-hard");
selectHard.addEventListener('click' , function() {
    currentDifficulty = DIFFICULTY.HARD;
});

//Event listener for game run button
playButtonEventListener('#play-game','click', runGame );


