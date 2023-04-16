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
 * Generates random word from challengeWords array
 */
function playGame() {
    let randomWord = challengeWords[Math.floor(Math.random() * challengeWords.length)];
    console.log(randomWord);
}

changeDifficulty("easy");
playGame();