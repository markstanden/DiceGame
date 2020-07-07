/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//////////////////////////////////////////////////////////
// GENERAL (PURE-ISH?) FUNCTIONS
/////////////////////////////////////////////////////////

/** A function that changes a 1 into a 0 and a 0 into a 1 
    depending on what it is passed. */
function binarySwap(base2) {
    return Math.abs(base2 - 1);
}

/** Function returns a randomly generated integer between the lowbound and the highbound, inclusive.
for example a six sided dice would be rolled by randomInt(1,6);
defaults to 1 or 0 */
function randomInt(lowBound = 0, highBound = 1) {
    return Math.floor(Math.random() * (highBound + 1 - lowBound)) + lowBound;
}

/** Returns an integer between one and the provided value, to simulate the rolling of a multisided dice. defaults to 6 */
function rollDice(sides = 6) {
    return randomInt(1, sides);
}

/** Alter the textcontent of an html class */
function setText(className, text = '') {
    document.getElementById(className).textContent = text;
}

/////////////////////////////////////////////////
//GAME SPECIFIC FUNCTIONS
/////////////////////////////////////////////////

/** resets the current/round roll total to zero */
const roundScoreToZero = (player) => {
    roundScore = 0;
    setText('current-' + player, 0);
};

const changePlayer = (current) => {
    let currentPanel = document.querySelector(`.player-${current}-panel`);
    let otherPanel = document.querySelector(`.player-${binarySwap(current)}-panel`);
    currentPanel.classList.toggle('active');
    otherPanel.classList.toggle('active');
    return binarySwap(current);
};

/** function to add or remove the dice (visibility) from the gameboard. */
const displayDice = (visible) => {
    let display;
    if (visible) {
        display = 'block';
    } else {
        display = 'none';
    }
    dice = document.querySelectorAll('.dice');
    for (die of dice) {
        die.style.display = display;
    }
};

/** resets all the games scores, and hides the dice */
const newGame = () => {
    if (gamePlaying === false) {
        document.querySelector('.winner').classList.remove('winner');
    }
    if (activePlayer === 1) {
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove('.active');
        activePlayer = 0;
        document.querySelector(`.player-${activePlayer}-panel`).classList.add('.active');
    }
    targetInput = document.querySelector('.target');
    if (targetInput.value != '') {
        target = parseInt(targetInput.value);
        targetInput.placeholder = `Target: ${target}`;
        targetInput.value = '';
    }
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    setText('score-0', 0);
    setText('score-1', 0);
    setText('current-0', 0);
    setText('current-1', 0);
    displayDice(false);
    gamePlaying = true;
};
///////////////////////////
//Global Resetting / Init
///////////////////////////

let target = 100; // required score to win game, default 100;
let activePlayer,
    gamePlaying = true,
    roundScore,
    scores;
newGame();

/////////////////////////////
// New Game Button Clicked
/////////////////////////////
document.querySelector('.btn-new').addEventListener('click', newGame);

//////////////////////////////
// Roll Dice Button Clicked
/////////////////////////////

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        let rolledAOne = false;

        //display result
        diceClass = document.querySelectorAll('.dice');
        for (die of diceClass) {
            // random number
            let dice = rollDice();
            die.src = 'dice-' + dice + '.png';
            if (dice === 1) {
                rolledAOne = true;
            }
            roundScore += dice;
        }
        displayDice(true);

        //update the round score but only if the rolled number was not a 1;
        if (!rolledAOne) {
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            roundScoreToZero(activePlayer);
            activePlayer = changePlayer(activePlayer);
        }
        console.log('Active Player : ', activePlayer);
    }
});

/////////////////////////////
// Hold Button Clicked
/////////////////////////////
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // transfer current points to main score
        scores[activePlayer] += roundScore;
        roundScoreToZero(activePlayer);
        setText('score-' + activePlayer, scores[activePlayer]);
        setText('current-' + activePlayer, '0');

        // if score is above target (100) active player wins
        // if not transfer control to other player
        if (scores[activePlayer] >= target) {
            document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('winner');
            // alert(`Player ${activePlayer + 1} Wins!`);
            gamePlaying = false;
        } else {
            activePlayer = changePlayer(activePlayer);
            displayDice(false);
        }
    }
});
