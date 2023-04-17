let scrambleBoxes = document.getElementsByClassName("scramble-box");
const scrambleButtons = document.getElementsByClassName("scramble-button");
const buttonArray = Array.from(scrambleButtons);
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
    let randomWord = challengeWords[Math.floor(Math.random() * challengeWords.length)];
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
        console.log('element innerText:', event.target.innerText);
    });
});
