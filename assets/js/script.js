// Code wrapped in a self executing function to avoid polluting the global namespace. 
(() => {
    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("easy-icon").classList.toggle('fa-toggle-on');
        if (landscape.matches) {
            document.getElementById("landscape-warning").classList.toggle('hidden');
            topDisplay.classList.toggle('hidden');    
        }
    });

    // MODULE LEVEL CONSTANTS

    const DIFFICULTY = {
        EASY: "easy",
        MEDIUM: "medium",
        HARD: "hard"
    };

    const DISPLAY = {
        HOME: "home",
        GAME: "game"
    };

    const ANSWER_STATUS = {
        CORRECT: "correct",
        INCORRECT: "incorrect"
    };

    const SELECTOR_DIFFICULTY_MAP = {
        [DIFFICULTY.EASY]: "select-easy",
        [DIFFICULTY.MEDIUM]: "select-medium",
        [DIFFICULTY.HARD]: "select-hard"
    };

    // HTML ELEMENTS DEFINED

    const setLevel= document.querySelectorAll(".set-level");
    const instructionsIcon = document.querySelectorAll(".instructions-icon")
    const settingsIcon = document.querySelectorAll(".settings-icon")
    const clearWarning = document.getElementById("clear-warning");
    const topDisplay = document.getElementById("top-display");
    const answerTiles = document.getElementById("answer-tiles");
    const answerBoxes = document.querySelectorAll(".answer-box");
    const answerLetters = document.querySelectorAll(".answer-letter");
    const display = document.getElementById("display");
    const displayPicture = document.getElementById("display-picture");
    const feedbackInfo = document.getElementById("feedback-info");
    const score = document.getElementById("score");
    const timer = document.querySelector('#timer');
    const scrambleTiles = document.getElementById("scramble-tiles");
    const scrambleBoxes = document.getElementsByClassName("scramble-box");
    const scrambleButtons = document.getElementsByClassName("scramble-button");
    const buttonArray = Array.from(scrambleButtons);
    const submitAnswer = document.getElementById("submit-answer");

    // GLOBAL VARIABLES

    let correctAnswer = "";
    let randomWord;
    let wordLetters;
    let scrambledString;
    let challengeIndexes = [];
    let playerAnswer = [];
    let totalScore = 0;
    let scoreTarget = 6;
    let timeLeft = 60;
    let startCountDown;
    let currentDifficulty = DIFFICULTY.EASY;
    let challengeWords = [];
    let nextStep;
    let levelGraphic;
    let landscape = window.matchMedia("(orientation: landscape)");
    let mobileDevice = window.matchMedia("screen and (max-width: 768px)");
    // let portrait = window.matchMedia("(orientation: portrait)");

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
            togglePicture();
        } else if (display === DISPLAY.GAME) {
            document.getElementById("controls").classList.toggle("hidden");        
            feedbackInfo.className = "flex";
            // topDisplay.innerHTML = scoreBox;
            toggleProgress();
            togglePicture();
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
            wordCollection.forEach((collection) => {
                if (collection.level === DIFFICULTY.EASY && collection.word.length === 4) {
                    challengeWords.push(collection);
                }
            currentDifficulty = DIFFICULTY.EASY; 
            });
        } else if (difficulty === DIFFICULTY.MEDIUM) {
            nextStep = "You need something trickier...";
            levelGraphic = "assets/images/achievement-award-medal-icon.png";
            wordCollection.forEach((collection) => {
                if (collection.level === DIFFICULTY.MEDIUM && collection.word.length === 5) {
                    challengeWords.push(collection);
                }
            currentDifficulty = DIFFICULTY.MEDIUM;
            });
        } else if (difficulty === DIFFICULTY.HARD) {
            nextStep = "You have reached the top level!";
            levelGraphic = "assets/images/1st-prize-icon.png";       
            wordCollection.forEach((collection) => {
                if (collection.level === DIFFICULTY.HARD && collection.word.length === 6) {
                    challengeWords.push(collection);
                }
                currentDifficulty = DIFFICULTY.HARD;
            });
        }
        // Changes display of lettter boxes depending on difficulty level
        lettersDisplay(currentDifficulty);
        // Generates array of integers for length of challenegWords array
        for (let i = 0 ; i < challengeWords.length ; i++) {
            challengeIndexes.push(i);
        }
        // Shuffles array of integers in a random order so game always runs in a different order
        integerShuffle();
    }

    /**
     * Takes the level of difficulty as an argument and sets the number of answer and scramble boxes
     * appropiately for the length of word. 
     */
    function lettersDisplay (difficulty) {
        if (difficulty === DIFFICULTY.EASY) {
            [4, 5].forEach((index) => {
                [answerBoxes, scrambleBoxes].forEach((box) => {
                    box[index].style.display = 'none';
                });
            });
            [answerTiles, scrambleTiles].forEach((index) => {
                index.className = "grid grid-tiles-4";
            });
        } else if (difficulty === DIFFICULTY.MEDIUM) {
            [4].forEach((index) => {
                [answerBoxes, scrambleBoxes].forEach((box) => {
                    box[index].style.display = 'block';
                });
            });
            [5].forEach((index) => {
                [answerBoxes, scrambleBoxes].forEach((box) => {
                    box[index].style.display = 'none';
                });
            });
            [answerTiles, scrambleTiles].forEach((index) => {
                index.className = "grid grid-tiles-5";
            });      
        } else if (difficulty === DIFFICULTY.HARD) {
            [4, 5].forEach((index) => {
                [answerBoxes, scrambleBoxes].forEach((box) => {
                    box[index].style.display = 'block';
                });
            });
            [answerTiles, scrambleTiles].forEach((index) => {
                index.className = "grid grid-tiles-6";
            });
        }
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
            buttonArray.forEach((currentLetter) => {
                currentLetter.disabled = true;
            });
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
        score.innerText = "0";
        timer.innerText = "60";     
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
        displayScramble();
        // The integer occupying index 0 of challengeIndexes sent to the end of this array.
        const firstIndex = challengeIndexes.shift();
        challengeIndexes.push(firstIndex);   
    }

    /**
     * Displays the scrambled letters in the scramble boxes and displays the picture relating to the chosen
     * word in the div with id display-picture.
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
        displayPicture.innerHTML = `<img src = "${pictureHint}" alt ="${altDescription}">`;
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
        buttonArray.forEach((currentLetter) => {
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
     * Turns the playerAnswer array into a string, converts the 
     * correct answer to upper case letters and then compares the
     * two against each other.  If they are equal, a point is added
     * to the score counter and styling for the answer boxes change
     * to give the player feedback.
     */
    function checkAnswer() {
        const submittedAnswer = playerAnswer.join("");
        const correctUpperAnswer = correctAnswer.toUpperCase();
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

        const classMapping ={
            [ANSWER_STATUS.CORRECT]: "answer-box-correct",
            [ANSWER_STATUS.INCORRECT]: "answer-box-incorrect"
        };

        answerBoxes.forEach(box => box.classList.add(classMapping[answer]));
    }

    /**
     * Checks total score against score target.  If equal: 
     * Toggles to display "home".
     * Runs challenegComplete function.
     * Answer and scramble boxes cleared of letters.
     * Global currentDifficulty level updated according to the current value,
     * so the level of difficulty increases if a challeneg is completed.
     * If the score target has not been reached:
     * generateWord function runs.
     * playGame function runs.
     */
    function checkScore() {
        if (totalScore === scoreTarget) {
            gameToggle(DISPLAY.HOME);
            challenegeComplete();
            clearAnswer();
            clearScramble();     
            if (currentDifficulty === DIFFICULTY.EASY) {
                currentDifficulty = DIFFICULTY.MEDIUM;
            } else if (currentDifficulty === DIFFICULTY.MEDIUM) {
                currentDifficulty = DIFFICULTY.HARD;
            } 
        } else {
            generateWord();
            playGame(); 
        } 
    }

    /**
     * stopClock function runs. 
     * Message and associated image displayed based on difficulty level completed.
     */
    function challenegeComplete() {
        stopClock();
        const levelMessage = nextStep;
        const encouragingImage = levelGraphic;
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
     * Toggles the 'hidden' class to show and hide the progress box.
     */
    function toggleProgress() {
        document.getElementById("progress").classList.toggle('hidden');
        topDisplay.classList.toggle('hidden');    
    }
    /**
     * Toggles the 'hidden' class to show and hide the picture box.
     */
    function togglePicture() {
        document.getElementById("picture").classList.toggle('hidden');
        display.classList.toggle('hidden');
    }

    // EVENT LISTENERS

    /**
     * Add event listeners for all boxes containing a scrambled letter. 
     * Clicking on each scrambled letter then pushes this to the playerAnswer 
     * array. Also checks if an answer box is empty and if so poulates it with 
     * the scramble letter that has been clicked.
     * After each scramble button is clicked, it is disabled so the same letter 
     * cannot be entered again.
    */
    buttonArray.forEach((currentLetter) => {
        currentLetter.addEventListener('click', function(event){
            if (playerAnswer.length < answerBoxes.length) {
                playerAnswer.push(event.target.innerText);
            }
            answerLetters.forEach((letter, index) => {
                if (letter.childNodes.length === 0 && playerAnswer[index]) {
                    letter.innerText = playerAnswer[index];
                }
            });
            this.disabled = true;        
        });  
    });

    // Event listener for "GO" button that runs game.
    document.querySelector('#play-game').addEventListener('click' , runGame);

    // Event listener for submit answer button.  Runs checkAnswer function.
    submitAnswer.addEventListener('click', checkAnswer);

    // Event listener for clear answer button.
    const removeAnswer = document.getElementById("remove-answer");
    removeAnswer.addEventListener('click', resetLetterBoxes);

    // Add event listeners to instructions navbar and clear buttons.
    // Clicking toggles between visible and hidden.
    instructionsIcon.forEach((icon) => {
        icon.addEventListener('click' , () => {
            document.getElementById("instructions").classList.toggle('hidden');
            topDisplay.classList.toggle('hidden');
        })
    });

    // Add event listeners to settings navbar and clear buttons.
    // Clicking toggles between visible and hidden.
    settingsIcon.forEach((icon) => {
        icon.addEventListener('click' , () => {
            document.getElementById("settings").classList.toggle('hidden');
            topDisplay.classList.toggle('hidden');
        })
    });

    clearWarning.addEventListener('click' , () => {
        document.getElementById("landscape-warning").classList.toggle('hidden');
        topDisplay.classList.toggle('hidden');    
    });

    // Event listener for 3 difficulty settings buttons.
    // Clicking toggles icon "on" styling for clicked button and "off" styling for others
    // I used this Stack overflow article to give me the idea for using iteration:
    // https://stackoverflow.com/questions/68425366/toggle-active-class-to-buttons-when-clicked 
    setLevel.forEach((button) => {
        button.addEventListener('click' , (event) => {
            setLevel.forEach(icon => icon.classList.remove('fa-toggle-on'));
            event.target.classList.toggle('fa-toggle-on');
        });
    });

    // Iterates over SELECTOR_DIFFICULTY_MAP. 
    // Adds an event listener to the three difficulty settings buttons.
    // Changes difficulty setting when clicked.
    // Learn about Object.entries here:  https://javascript.info/keys-values-entries
    Object.entries(SELECTOR_DIFFICULTY_MAP).forEach(([difficulty, selector]) => {
        document.getElementById(selector).addEventListener('click', () => {
            currentDifficulty = difficulty;
        });
    });

    // Event listener for change from portrait to landscape orientation.
    // Displays warning message when change to landscape orientation detected.
    landscape.addEventListener("change", (event) => {
        if(event.matches && mobileDevice.matches) {
            document.getElementById("landscape-warning").classList.toggle('hidden');
            topDisplay.classList.toggle('hidden');
        }
    });

    // // Event listener for change from landscape to portrait orientation.
    // // Clears warning message when rotated back to portrait orientation.
    // portrait.addEventListener("change", (event) => {
    //     if(event.matches) {
    //         document.getElementById("landscape-warning").classList.toggle('hidden');
    //         topDisplay.classList.toggle('hidden');
    //     }
    // });

})();