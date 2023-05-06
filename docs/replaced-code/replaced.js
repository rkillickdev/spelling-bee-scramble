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

// /**
//  * The 5th and 6th answer and scramble boxes are hidden from display but remain in 
//  * the DOM.  Grid set to a 4 column layout using the grid-tiles-4-class.
//  */
// function easyDisplay() {
//     answerBoxes[4].style.display = 'none';
//     answerBoxes[5].style.display = 'none';
//     scrambleBoxes[4].style.display = 'none';
//     scrambleBoxes[5].style.display = 'none';
//     document.getElementById("answer-tiles").className = "grid grid-tiles-4";
//     document.getElementById("scramble-tiles").className = "grid grid-tiles-4";    
// }

// /**
//  * The 6th answer and scramble box is hidden from display but remains in 
//  * the DOM.  Grid set to a 5 column layout using the grid-tiles-5-class.
//  */
// function mediumDisplay() {
//     answerBoxes[4].style.display = 'block';
//     scrambleBoxes[4].style.display = 'block';
//     answerBoxes[5].style.display = 'none';
//     scrambleBoxes[5].style.display = 'none';
//     document.getElementById("answer-tiles").className = "grid grid-tiles-5";
//     document.getElementById("scramble-tiles").className = "grid grid-tiles-5"; 
// }

// /**
//  * All 6 answer and scramble boxes are displayed.  Grid set to a 6 column layout
//  * using the grid-tiles-6-class. 
//  */
// function hardDisplay() {
//     answerBoxes[4].style.display = 'block';
//     answerBoxes[5].style.display = 'block';
//     scrambleBoxes[5].style.display = 'block';
//     scrambleBoxes[4].style.display = 'block';
//     document.getElementById("answer-tiles").className = "grid grid-tiles-6";
//     document.getElementById("scramble-tiles").className = "grid grid-tiles-6";     
// }

/**
 * Function used by the run game event listener.
 * I had to research and implement Event Bubbling for this, as the event
 * listener was not not working when I dynamically reloaded the html for
 * the button after successful completion of a challenge.
 * I used and tweaked code from the following article to get this working:
 * https://dev.to/akhil_001/adding-event-listeners-to-the-future-dom-elements-using-event-bubbling-3cp1
 */
// function playButtonEventListener (selector, event, handler) {
//     let rootElement = document.querySelector('#display-main');
//     rootElement.addEventListener(event, function (evt) {
//             var targetElement = evt.target;
//             while (targetElement != null) {
//                 if (targetElement.matches(selector)) {
//                     handler(evt);
//                     return;
//                 }
//                 targetElement = targetElement.parentElement;
//             }
//         },
//         true
//     );
// }

// //Event listener for game run button
// playButtonEventListener('#play-game','click', runGame );