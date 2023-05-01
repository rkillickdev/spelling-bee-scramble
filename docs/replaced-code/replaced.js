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