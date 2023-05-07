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

// buttonArray.forEach(function(currentLetter) {
//     currentLetter.addEventListener('click', function(event){
//         if (playerAnswer.length < answerBoxes.length) {
//             playerAnswer.push(event.target.innerText);
//         }
//         if (answerLetters[0].childNodes.length === 0) {
//             answerLetters[0].innerText = playerAnswer[0];
//         } else if (answerLetters[1].childNodes.length === 0) {
//             answerLetters[1].innerText = playerAnswer[1];           
//         } else if (answerLetters[2].childNodes.length === 0) {
//             answerLetters[2].innerText = playerAnswer[2];
//         } else if (answerLetters[3].childNodes.length === 0) {
//             answerLetters[3].innerText = playerAnswer[3];
//         } else if (answerLetters[4].childNodes.length === 0) {
//             answerLetters[4].innerText = playerAnswer[4];
//         } else if (answerLetters[5].childNodes.length === 0) {
//             answerLetters[5].innerText = playerAnswer[5];
//         }
//         this.disabled = true;        
//     });  
// });

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

 /**
     * Toggles the 'hidden' class to show and hide the instructions box.
     */
    // function toggleInstructions() {
    //     document.getElementById("instructions").classList.toggle('hidden');
    //     topDisplay.classList.toggle('hidden');
    // }

    /**
     * Toggles the 'hidden' class to show and hide the settings box.
     */
    // function toggleSettings() {
    //     document.getElementById("settings").classList.toggle('hidden');
    //     topDisplay.classList.toggle('hidden'); 
    // }

// //Event listener for game run button
// playButtonEventListener('#play-game','click', runGame );

    /**
     * Displays toggle-on font awesome icon for when a button is selected.
     * Referenced and modified code from this article to get this function working:
     * https://softauthor.com/make-selected-clicked-button-active-in-javascript/  
     */
    // function buttonToggle(event) {
    //     event.target.classList.add('fa-toggle-on');
    //     if(previousButton !== null) {
    //         previousButton.classList.remove('fa-toggle-on');
    //     }
    //     previousButton = event.target;
    // }


      // //Event listener for show settings button.
    // const showSettings = document.getElementById("show-settings");
    // showSettings.addEventListener('click', toggleSettings);

    // //Event listener for hide settings button.
    // const hideSettings = document.getElementById("hide-settings");
    // hideSettings.addEventListener('click', toggleSettings);

    // //Event listener for show instructions button.
    // const showInstructions = document.getElementById("show-instructions");
    // showInstructions.addEventListener('click', toggleInstructions);

    // //Event listener for hide instructions button.
    // const hideInstructions = document.getElementById("hide-instructions");
    // hideInstructions.addEventListener('click', toggleInstructions);