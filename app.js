let scores, pointsCount, activePlayer, diceNew, diceOld, winningScore;
const ELEMENTS = {
  rollButton: document.querySelector(".btn-roll"),
  holdButton: document.querySelector(".btn-hold"),

  player0Panel: document.querySelector(".player-0-panel"),
  player1Panel: document.querySelector(".player-1-panel"),
  dice1: document.querySelector("#dice1"),
  dice2: document.querySelector("#dice2"),
  score0: document.getElementById("score-0"),
  score1: document.getElementById("score-1"),
  currentPoints0: document.getElementById("current-0"),
  currentPoints1: document.getElementById("current-1"),
  winningScoreInput: document.querySelector(".winning-score-input"),
  newGameForm: document.querySelector("#new-game-form"),
};
const ANIMATION_DELAY = 150;
const ANIMATION_FRAMES = 7;

const activePlayerCurrentPointsEl = () =>
  ELEMENTS[`currentPoints${activePlayer}`];
const activePlayerScoreEl = () => ELEMENTS[`score${activePlayer}`];

const randomDiceNumber = () => Math.floor(Math.random() * 6 + 1);

const roll = () => {
  ELEMENTS.rollButton.disabled = true;
  let imageChangeTimes = 0;

  const animate = () =>
    setTimeout(() => {
      let dice1 = randomDiceNumber();
      let dice2 = randomDiceNumber();
      changeImage(dice1, dice2);
      if (imageChangeTimes < ANIMATION_FRAMES) {
        imageChangeTimes++;
        animate();
      } else {
        pointsCount += dice1 + dice2;
        activePlayerCurrentPointsEl().textContent = pointsCount;
        ELEMENTS.rollButton.disabled = false;
        if (dice1 === 1 || dice2 === 1) {
          endTurn();
        }
      }
    }, ANIMATION_DELAY);

  animate();
};

const endTurn = () => {
  pointsCount = 0;
  activePlayerCurrentPointsEl().textContent = pointsCount;
  activePlayer = activePlayer === 0 ? 1 : 0;
  changeActivePlayerClass();
};

//change player and check if there is a winner
const nextPlayer = () => {
  scores[activePlayer] += pointsCount;
  activePlayerScoreEl().innerHTML = scores[activePlayer];
  if (scores[0] >= winningScore) {
    alert("Player1 won!");
    newGame();
    return;
  } else if (scores[1] >= winningScore) {
    alert("Player2 won!");
    newGame();
    return;
  }
  pointsCount = 0;
  activePlayerCurrentPointsEl().textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  changeActivePlayerClass();
};

const changeActivePlayerClass = () => {
  ELEMENTS.player0Panel.classList.toggle("active");
  ELEMENTS.player1Panel.classList.toggle("active");
};

//pick the right dice images
const changeImage = (dice1, dice2) => {
  ELEMENTS.dice1.src = `dice_img/dice-${dice1}.png`;
  ELEMENTS.dice2.src = `dice_img/dice-${dice2}.png`;
};

//game initialiazation function
const newGame = () => {
  winningScore = ELEMENTS.winningScoreInput.value;
  scores = [0, 0];
  ELEMENTS.score0.innerHTML = scores[0];
  ELEMENTS.score1.innerHTML = scores[1];
  pointsCount = 0;
  ELEMENTS.currentPoints0.textContent = pointsCount;
  ELEMENTS.currentPoints1.textContent = pointsCount;
  activePlayer = 0;
  ELEMENTS.player0Panel.classList.add("active");
  ELEMENTS.player1Panel.classList.remove("active");
};

const handleSubmit = (e) => {
  e.preventDefault();
  newGame();
};

const addEventListeners = () => {
  ELEMENTS.rollButton.addEventListener("click", roll);
  ELEMENTS.holdButton.addEventListener("click", nextPlayer);
  ELEMENTS.newGameForm.addEventListener("submit", handleSubmit);
};

addEventListeners();
newGame();
