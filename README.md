# **Spelling Bee Scramble Game**

Spelling Bee Scramble is a fun interactive game aimed at children of varying ages who are keen to practice and improve their spelling.  Players must decipher the scrambled words and spell them correctly by arranging the letters in the required order.  They work against the clock to complete the challenge by helping our beekeeper to fill the hive with bees.  The game has varying levels of difficulty to continue challenging the player.

<br>

## **CONTENTS**

* [User Experience (UX)](#user-experience-ux)
    * [Strategy](#strategy)
        * [Project Goals](#project-goals)
        * [User Stories](#user-stories)
    * [Design](#design)
        * [Features](#features)
        * [Wireframes](#wireframes)
        * [Colour Palette](#colour-palette)
        * [Contrast](#contrast)
        * [Typography](#typography)
        * [Imagery](#imagery)
* [Technologies Used](#technologies-used)
    * [Languages Used](#languages-used)
    * [Frameworks, Libraries and Programs Used](#frameworks-libraries-and-programs-used)
* [Deployment and Local Development](#deployment-and-local-development)
    * [How to Fork](#how-to-fork)
    * [How to Clone](#how-to-clone)
* [Testing](#testing)
    * [Automated Testing](#automated-testing)
        * [W3C Validator](#w3c-validator)
        * [Lighthouse](#lighthouse)
        * [WAVE](#wave)
    * [Manual Testing](#manual-testing)
        * [Testing User Stories](#testing-user-stories)
        * [Full Testing](#full-testing)
* [Bugs](#bugs)
    * [Known Bugs](#known-bugs)
    * [Solved Bugs](#solved-bugs)
* [Credits](#credits)
    * [Code Used](#code-used)
    * [Content](#content)
    * [Media](#media)
    * [Acknowledgements](#acknowledgements)

# **User Experience (UX)**

## **STRATEGY**
___

## **Project Goals**

<br>

To help children of all ages with their spelling by providing a fun and engaging interactive game.  The aim is that parents and schools can use the game with their children as part of their early years education and demonstrate that learning can be a fun experience which should keep them engaged and interested.

Anagrams are a useful tool when teaching children to spell, as it encourages them to consider each letter and how different letters group together to form certain sounds.

Word games and puzzles can also be beneficial for children in a variety of other ways.  They can help to improve working memory, help to broaden and extend their vocabulary, teach them problem solving skills and encourage a healthy sense of competition.

<br>

## **User Stories**

<br>

### Client Goals:

<br>

* As the client, I want to offer an educational experience to help children with their spelling.
* As the client, I want to make sure that the user has an enjoyable, engaging experience so they continue playing and return to the site in the future.
* As the client, I want to offer differing levels of difficulty to ensure that the user continues to learn as their spelling improves.
* As the client, I want to set targets for the user, to keep the experience interesting and challenging.
* As the client, I want to make the game responsive over a range of device sizes.

<br>

### First Time Visitor Goals:

<br>

* As a first time visitor, I am looking for a fun and interactive way to practice and improve my spelling.
* As a first time visitor, I want clear and concise feedback each time I submit a correct or incorrect answer.
* As a first time visitor, I want clear feedback about how close I am to reaching my target number of correct answers.
* As a first time visitor, I want clear feedback to let me know I have completed the challenge and how to proceed.
* As a first time visitor, I want the ability to mute sound effects.
* As a first time visitor, I want easy intuitive access to an explanation of how to play the game.

<br>

### Return Visitor Goals:

<br>

* As a return visitor, I want to continue challenging myself and learn to spell more complicated words.

<br>

### Frequent Visitor Goals:

<br>

* As a frequent visitor, I want to be able to compete against myself to see how quickly I can complete the challenge and log this result on a leaderboard so I have a target to beat.

## **DESIGN**
___

## **Features**

<br>

### **Logo**

<br>

As the game is called Spelling **Bee** Scramble, a Bumble Bee icon is used to tie in with this theme.  Clicking on the logo resets the page to its initial default settings.

<br>

### **Navigation Bar**

<br>

Icons are used here rather than text to save space.  Players can navigate to the settings page by clicking on the universally recognisable gear icon.  Here they are presented with the option to select a difficulty level and also choose whether sound FX are audible or muted.  Clicking on the cross icon hides this page and the player is once again presented with the game page.

Clicking on the question mark icon presents the player with instructions on how to play the game.

<br>

### **Game Landing Screen**

<br>

On loading the site, players are greeted with the Spelling Bee Scramble logo and a button inviting them to play.  I have chosen to have the main game name and logo displayed here, rather than having it permanently displayed at the top which would take up valuable screen space.  This is especially important when taking into account that this game is mostly likely to be played on a mobile device where screen real estate is at a premium.

<br>

### **During Play**

<br>

On hitting play, four or six empty boxes appear below the central logo (depending on the game difficulty setting).  The scrambled word letters drop into these boxes.  Empty answer boxes also appear above the logo box.

The central box flips and a picture hint is displayed for the scrambled word.

The player must identify the word and spell it correctly by clicking on each letter in the right order.  Once a letter has been clicked, it becomes greyed out so it cannot be used again.

As letters are clicked, they appear in the answer box spaces above the picture hint.  The next empty space that needs populating comes into focus and is highlighted to give the player feedback that a letter is required.

On the control panel, the backspace button gives the option to remove letters if the player decides they have spelt the word incorrectly.

Once the player is happy with their spelling of the word, they can submit their answer with the green GO! Button.  This is then checked against the correct spelling of the word.  If the players answer matches, all squares turn green and a positive sound plays to provide feedback that they have been successful.

If the user's answer is incorrect, all squares turn red and a negative sound plays.  Feedback is also provided if the player tries to submit an answer while any answer boxes are unpopulated.  These are highlighted red to show they must be populated to submit an answer.

A new scrambled word is then generated and the answer boxes are cleared, ready for the next spelling attempt.

<br>

### **Game Progress Section**

<br>

The beehive to the left of this section represents a visual counter, where one bee is added to the hive each time a player submits a correct answer. It starts empty and after 8 correct answers the hive is full and the challenge is complete.

Players are working against a countdown clock.  They must spell 8 words correctly within the designated time to successfully complete the challenge.  The countdown starts as soon as the scrambled word and picture hint card is generated. 

<br>

### **Game Outcomes**

<br>

If the player spells 8 words successfully within the time limit, the visual counter reaches its maximum limit and the count down timer is stopped. Players are greeted with a message of congratulations and the following 2 options:

* Play Again
* Try a harder challenge.  If the player has successfully completed the challenge at the difficult level, this option is not available.

If the player fails to submit 8 successfully spelt answers within the time limit, they are presented with a record of the number of correct answers and a message encouraging them to try again.

<br>

### **404 Error Screens**

### **Responsive Design**

### **Accessibility**

### **Future Implementations**

<br>

## **Wireframes**

<br>

### **Mobile**

<br>

![Mobile wireframe for landing view and game play view](docs/wireframes/Spelling%20Bee%20Scramble%20Mobile_resize.png)

## **Colour Palette**

## **Contrast**

## **Typography**

## **Imagery**

<br>

# **Technologies Used**

## **Languages Used**

<br>

HTML, CSS and JavaScript were used to create the game.

<br>

## **Frameworks, Libraries and Programs Used**

<br>

* Git -  Version control.
* GitHub - All files for the website stored and saved in a repository.
* GitHub Pages - Used to deploy the final version of the website.
* Balsamiq - Used to create wireframes.
* Font Awesome - Used for all icons throughout the website.
* Google Fonts - Used to import required fonts for the website via the css style page.
* Google Developer Tools - Used throughout build of website for debugging, checking responsiveness and trialing new features/ styling.
* Google Lighthouse - Used at testing stage to show statistics for performance, accessibility,  best practices and SEO.
* TinyPNG - For compression of image files to improve website performance.
* Birme - For resizing and re-formatting images to make them suitable for use on the website.
* Am I Responsive? - For displaying images of how the website looks across a range of devices.
* Favicon.ico & App Icon Generator - for creating the 16x16px ico favicon.
* [Meta Tags IO](https://metatags.io/) for improving site visual appearance on social media.


<br>


<br>

## **Bugs**

<br>

### **Known Bugs:**

<br>

### **Solved Bugs:**

<br>

1. When trying to loop through the variable scrambleButtons using the forEach() method, the console in google developer tools threw the following error:

![forEach method bug when trying to loop a collection of items that are not an array](docs/bugs/javascript-for-each-bug-snapshot.png)

* On researching this I found the [following article:](https://stackdiary.com/guides/typeerror-foreach-is-not-a-function/) 

* This explains that the error occurs when the code attempts to call the forEach() method on a value that is not an array or an array-like object.  To solve this, I transformed scrambleButtons into an array using the following code:

```js

const buttonArray = Array.from(scrambleButtons);

```
___

2. I created an event listener for the answer button which runs the checkAnswer function. The final step of this function is to run the playGame function in order to clear the boxes and generate a newly scrambled word.  However the playerAnswer array was not being cleared and was causing the issue as demonstrated below:

![bug when playerAnswer array not cleared when running playGame function](docs/bugs/gifs/clear-player-answer-array-bug.gif)

* I fixed this by using the following line of code within the playGame function to clear the playerAnswer array:

```js

playerAnswer.length = 0;

```

___

3. When setting up the timer, I made this element avaialble in the JavaScript file initially using getElementById("timer").  However this caused the text in my scramble letter boxes to disappear as shown in the snapshot below:

![using getElementById causes text in scramble letter boxes to disappear](docs/bugs/get-element-by-id-bug-scramble-boxes.png)

* Using querySelector instead to select the span in the HTML file with the id="timer" resolved this issue as can be seen below:

![using querySelector solves bug](docs/bugs/get-element-by-id-bug-scramble-boxes-fixed.png)

___

4. When I was trying to set the src file path of an image in my JavaScript file using a template literal, the innerHTML was sucessfully updated but the image was not displaying:  Instead a broken image file was shown which suggested my file path was incorrect.  My original file path stored in an object read as this:

```js

picture: "../assets/images/fresh-apple-icon.png",

```

* After some research and reading [this thread on the Code Institute Slack channels](https://code-institute-room.slack.com/archives/C7EJUQT2N/p1653076076263549?thread_ts=1653073079.354849&cid=C7EJUQT2N), I discovered that although the image file path is loaded from JavaScript, it is executed from the HTML so the path should be from the HTML file to the images so I updated the path to this and the image displayed as expected:

```js

picture: "assets/images/fresh-apple-icon.png",

```

___

5. I encountered a bug with the score counter on submitting a correct answer.  The score was not increasing and the following message appeared in the console:

![score counter variable scope bug console message](docs/bugs/score-counter-variable-scope-bug.png)

* I realised the problem was that the variable **score** (gets element by Id "score") was being defined in global scope, but the HTML containg this element with an id of "score" only exists once the gameToggle function is run with an argument of "game".  I therefore defined the variable **score** within the addPoint function instead, which solved the problem as by the time this function is run, an HTML element with the id of "score" exists in the DOM.  See code below:

```js

function addPoint() {
    let score = document.getElementById("score");
    totalScore++;
    score.innerText = totalScore;
    if (totalScore >= 2) {
        gameToggle("hide");
        displayMain.innerHTML = "Congratulations!";
    }
}

```

___

6. When I decided to display the scramble and answer letters as uppercase, the checkAnswer function stopped working so even if my spelling was correct, it did not recognise this as a correct answer. I realised that the correctAnswer variable as set in the generateWord function needed to be in uppercase before checking the submittedAnswer against this.  I wrote the following code to achieve this:

```js

let correctUpperAnswer = correctAnswer.toUpperCase();

```

* An alternative would be to have all words stored in uppercase within the wordCollection array of objects.

___

7. A problem I encountered while testing during the build was that somtimes the scrambled word would infact be the correct spelling.  To prevent this happening I modified the generateWord function and added the following line of code:

```js

    if (scrambledString === correctAnswer) {
        return;
    }

```

___

8. I encountered a problem with my display functions as shown below.  Having completed the challenge at the top level of difficulty, the player has the chance to play again to continue testing themselves.  But on running the game again, the display would jump to a 5 column grid layout:

![Bug where replaying game at hardest difficulty setting toggles to 5 column grid layout](docs/bugs/gifs/replay-difficult-grid-bug.gif)

* I realised that this was because of the way I had my display functions set up to toggle between grid layouts depending on the difficulty setting.  This worked when switching from easy to medium, and medium to hard, but running hard a second time was actually toggling back to the medium display.  I decided to simplify these functions and rather than use toggle, replace the class each time a difficulty level changes, as shown in the example below for the function easyDisplay:

```js

document.getElementById("answer-tiles").className = "grid grid-tiles-4";
document.getElementById("scramble-tiles").className = "grid grid-tiles-4";

```

___

9. After implementing the code to switch difficulty level in the settings page, I found a bug where if you tried to set the level from hard to medium, the sixth answer and sramble box remained visible rather than hidden as expected:

![Hard to medium level setting bug displays too many boxes](docs/bugs/gifs/hard-to-medium-setting-bug.gif)

* On investigating my function mediumDisplay, I realised that I had not specified what should happen to these boxes.  On adding the two lines of code shown below, the bug was resolved:

```js

answerBoxes[5].style.display = 'none';
scrambleBoxes[5].style.display = 'none';

```

___

10. A problem I encountered quite early while testing was that with my initial methodology for generating a random word from the challengeWords array, this would quite regularly result in the same word being displayed several times during a game.  I explored several ways of fixing this, initially pushing each word to a new array once used.  These were then only re-introduced when the challenegeWords array was empty.  This was one solution but on discussing with my Mentor Can, I decided a better approach would be to choose words from the challengeWords array using a shuffled integer array.  Once an integer has been used it is moved to the back of the challengeIndexes array and will only be used again once all the avaialble words have been used.  For each new game, the integer array is shuffled randomly using the Fisher Yates method so words do not always appear to the player in the same order. 



# **Credits**

## **Code Used**

* [Referenced this article on Stack Overflow for solution to how setting difficulty level changes which object the random word is chosen from](https://stackoverflow.com/questions/64712803/change-game-difficulty-javascript)
* [Referenced this tutorial on YouTube on how to generate the random word and how to split and scramble](https://www.youtube.com/watch?v=4-s3g_fU7Vg)
* [Adding a single event listener for all buttons of a certain class](https://stackoverflow.com/questions/49680484/how-to-add-one-event-listener-for-all-buttons)
* [getting inner text on button click](https://stackoverflow.com/questions/69663406/how-to-get-value-from-button-after-it-has-been-clicked)
* [How to check if a div is empty](https://bobbyhadz.com/blog/javascript-check-if-div-is-empty)
* [Disabling scramble letter buttons after click so it cannot be selected more than once](https://stackoverflow.com/questions/23724639/make-a-button-unclickable-after-one-click)
* Used this [article](https://css-tricks.com/overriding-default-button-styles/) to learn about removing default styling from buttons.  Referenced and modified some code [here](https://codepen.io/andy-set-studio/pen/Vxpjvo)
* Referenced these articles when considering how to make the square tiles responsive and stay square across various screen sizes. [Article 1](https://stackoverflow.com/questions/66817240/how-to-make-css-grid-container-keep-responsive-square-size) and [Article 2](https://stackoverflow.com/questions/46548987/a-grid-layout-with-responsive-squares) gave me the soution to use 100% padding-top on my button-container class.
* Referenced [this code](https://www.tutorialspoint.com/what-is-fisher-yates-shuffle-in-javascript) when finding a solution for shuffling an array of integers randomly.
* Referenced and modified [this code](https://softauthor.com/make-selected-clicked-button-active-in-javascript/) when exploring ways of toggling the font awesome icon used each time a button clicked on the settings page to change the difficulty level.

<br>

## **Content**

* [Article about using word scrambles to improve spelling](https://ourfamilylifestyle.com/exercises-to-help-children-improve-spelling-skills/)
* [Article about the benefits of word games for children](https://www.theschoolrun.com/10-ways-word-puzzles-can-help-your-child)
* [Inspiration for google fonts pairings](https://inkbotdesign.com/google-font-combinations-mixing-typefaces/)

<br>

## **Media**

* [Royalty free images used for the game logo and word hint pictures](https://uxwing.com/)

<br>

## **Acknowledgements**