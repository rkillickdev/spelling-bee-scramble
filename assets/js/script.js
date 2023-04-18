let scrambleBoxes = document.getElementsByClassName("scramble-box");

const scrambleButtons = document.getElementsByClassName("scramble-button");

const buttonArray = Array.from(scrambleButtons);

let answerBoxes = document.getElementsByClassName("answer-box");

const submitAnswer = document.getElementsByClassName("check-answer");

let correctAnswer = "";

let playerAnswer = [];

let score = document.getElementById("score");
let totalScore = 0;

let level = "";

let challengeWords = [];

const words = {
    easy: [
        {
            word: "pear",
            hint: "juicy fruit"
        },
        {
            word: "ball",
            hint: "round rolling object"
        }
    ],
    medium: [
        {
            word: "carrot", 
            hint: "orange vegetable"
        },
        {
            word: "cherry",
            hint: "small red fruit"
        }
    ], 
    hard: [
        {
            word: "cucumber",
            hint: "cool as a ..."
        },
        {
            word: "potatoes",
            hint: "good mashed"
        }
    ]
}


/** 
 * Sets challenge difficulty level. Called by event listeners on settings page.
 * Found neatest solution for this on stack overflow: 
 * https://stackoverflow.com/questions/64712803/change-game-difficulty-javascript
*/
function changeDifficulty(difficulty) {
    level = difficulty;
    challengeWords = words[level];
}

/**
 * Generates random word from challengeWords array, splits the individual letters into the 
 * wordLetters array and scrambles these in a random order.
 * I used the following tutorial to help with coding this: https://www.youtube.com/watch?v=4-s3g_fU7Vg
 */
function playGame() {
    playerAnswer.length = 0;
    for(let box of answerBoxes){
        box.innerHTML = "";
    }
    buttonArray.forEach(function(currentLetter) {
        currentLetter.disabled = false;
    });
    let randomWord = challengeWords[Math.floor(Math.random() * challengeWords.length)];
    correctAnswer = randomWord.word;
    let wordLetters = randomWord.word.split("");
    for (let x = wordLetters.length - 1; x > 0 ; x--) {
        let y = Math.floor(Math.random() * (x + 1));
        [wordLetters[x], wordLetters[y]] = [wordLetters[y], wordLetters[x]];
    }
    // Populate each scramble box with a letter from the scrambled word
    wordLetters.forEach((letter, index) => {
        scrambleBoxes[index].innerHTML = letter;
      }); 
}

changeDifficulty("medium");
playGame();

// Add event listeners for all boxes containing a scrambled letter
buttonArray.forEach(function(currentLetter) {
    currentLetter.addEventListener('click', function(event){
        if (playerAnswer.length < answerBoxes.length) {
            playerAnswer.push(event.target.innerText);
        }
        if (answerBoxes[0].childNodes.length === 0) {
            answerBoxes[0].innerText = playerAnswer[0];
        } else if (answerBoxes[1].childNodes.length === 0) {
            answerBoxes[1].innerText = playerAnswer[1];           
        } else if (answerBoxes[2].childNodes.length === 0) {
            answerBoxes[2].innerText = playerAnswer[2];
        } else if (answerBoxes[3].childNodes.length === 0) {
            answerBoxes[3].innerText = playerAnswer[3];
        } else if (answerBoxes[4].childNodes.length === 0) {
            answerBoxes[4].innerText = playerAnswer[4];
        } else if (answerBoxes[5].childNodes.length === 0) {
            answerBoxes[5].innerText = playerAnswer[5];
        }
        this.disabled = true;        
    });  
});

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

function addPoint() {
    totalScore++
    score.innerText = totalScore
}

submitAnswer[0].addEventListener('click', checkAnswer);




