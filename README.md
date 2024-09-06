#Pallankuzhi
This is an interactive 2 player game that can be played right on your desktop or mobile! In order to play, simply grab a friend and enjoy.

## Technologies Used
### JQuery/JavaScript:
#### Event listeners:
  * Marble holes (moving marbles on click, providing marble count on hover)
  * Navigation buttons
#### Event handlers:
  * Setting global variables
  * Removing marbles from holes 
  * Determining hover behavior on mouse leaving and entering holes
#### Functions:
  * Creating the board and marble setup
  * Moving the marbles around the board
  * Determining the color of marbles and location within their holes
  * Disabling players’ holes
  * Determining the winner
  * Starting over/clearing the board
#### Global variables:
  * Total marble counts for both players
  * Current player’s turn
  * Number of marbles to distribute in a single turn
  * Location of the starting and ending holes on a given turn
  * Marble color combinations
### HTML
### CSS:
  * Image (background for board)
  * Font families (“Tex Gyre Adventor”)


## Approach

Reference: 
https://paige1381.github.io/Mancala/

### Wireframe: 
Once I had decided on the game, I created the wireframe below to lay out the board and the navigation. Because the board is the only real focus of the game, there wasn’t much need to develop more mockups. There is also a feature I included here, the score section, that was intended to keep a running tally of player 1 and player 2 scores over multiple games, but I decided to remove that functionality; I thought it cluttered the page design.

<img src="https://i.imgur.com/5hs3sdy.png" 
alt="Wireframe" width="500" height="400" border="10" /></a>

## Github Link: 

https://paige1381.github.io/Mancala/

## Future Enhancements
### Static marble colors: 
Right now, the marble elements in the game are removed and re-created at each move around the board so the gradient colors are reassigned. The fact that the colors randomly change may confuse some players.

### Greeting modal: 
When users first load the page, it would be nice to have some sort of greeting or quick explanation about how to start the game. It might not be intuitive to click on the different holes in order to get the game moving. 

### Randomly determine who goes first: 
As I was playing the game, I realized there could be a slight advantage in going first, meaning being player 1. Players could alternatively decide amongst themselves who gets to be player 1 with each game, but it would be a nice touch to add some randomization in choosing the first player to move or even alternating automatically between player 1 and player 2 with each game played.

### Animation to show marbles being dropped in holes: 
I also noticed that the difference between the real game and my computerized version is the time it takes to actually move your marbles around the board game. There were many times while I was playing that I had to check the console log generated to make sure that the resulting distribution of marbles from a play was correct. In the end, the code should always execute the plays correctly, but it all happens so fast that certain moves can leave you confused, especially when your last marble is placed in your row in an empty hole.

