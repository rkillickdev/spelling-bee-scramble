const answerDisplay = document.getElementById("answer");

let answerBoxes = document.getElementsByClassName("answer-box");

let infoDisplay = document.getElementById("display");

const scrambleDisplay = document.getElementById("scramble");

let scrambleBoxes = document.getElementsByClassName("scramble-box");

const scrambleButtons = document.getElementsByClassName("scramble-button");

const buttonArray = Array.from(scrambleButtons);

const controlsDisplay = document.getElementById("controls");

const submitAnswer = document.getElementsByClassName("check-answer");

let correctAnswer = "";

let playerAnswer = [];

let timer = document.querySelector('#timer');
let startCountDown = setInterval(countDown, 1000);
let timeLeft = 60;

let score = document.getElementById("score");
let totalScore = 0;
let scoreTarget = 8;

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
        word: "tiger",
        hint: "a cat found on safari",
        picture: "",
        description: "a tiger",
        level: "medium",
        category: "animal"     
    },
    {
        word: "apple",
        hint: "crunchy fruit",
        picture: "../assets/images/fresh-apple-icon",
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
 * array and adds objects to the challengeWords array based on the level of difficulty selected.
*/
function changeDifficulty(difficulty) {
    if (difficulty === "easy") {
        wordCollection.forEach(function(collection) {
            if (collection.level === "easy") {
                challengeWords.push(collection);
            }
        })
    } else if (difficulty === "medium") {
        wordCollection.forEach(function(collection) {
            if (collection.level === "medium") {
                challengeWords.push(collection);
            }
        })
    } else if (difficulty === "hard") {
        wordCollection.forEach(function(collection) {
            if (collection.level === "hard") {
                challengeWords.push(collection);
            }
        })
    }   
}

changeDifficulty("medium");

console.log(challengeWords);

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
    let wordLetters = correctAnswer.split("");
    for (let x = wordLetters.length - 1; x > 0 ; x--) {
        let y = Math.floor(Math.random() * (x + 1));
        [wordLetters[x], wordLetters[y]] = [wordLetters[y], wordLetters[x]];
    }
    // Populate each scramble box with a letter from the scrambled word
    wordLetters.forEach((letter, index) => {
        scrambleBoxes[index].innerHTML = letter;
      });
     
}
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
    totalScore++;
    score.innerText = totalScore;
    if (totalScore >= 2) {
        gameToggle("hide");
        infoDisplay.innerHTML = "Congratulations!";
    }
}

function gameToggle(display) {
    if (display === "show") {
        answerDisplay.style.visibility = "visible";
        scrambleDisplay.style.visibility = "visible";
        controlsDisplay.style.visibility = "visible";
    } else if (display === "hide") {
        answerDisplay.style.visibility = "hidden";
        scrambleDisplay.style.visibility = "hidden";
        controlsDisplay.style.visibility = "hidden";
    }
}

function countDown() {
    timeLeft--;
    timer.innerText = timeLeft;
    if (timeLeft === 0) {
        clearInterval(startCountDown);
        let correctRequired = (scoreTarget - totalScore);
        infoDisplay.innerHTML = `Keep trying!  You need ${correctRequired} more correct answers next time! `;

        console.log(correctRequired);
    }
}

submitAnswer[0].addEventListener('click', checkAnswer);




