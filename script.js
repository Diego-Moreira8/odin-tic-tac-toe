const gameBoard = ["", "", "", "", "", "", "", "", ""];

const PlayerFactory = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;

  const play = () => {
    console.log(mark);
  };

  return { getName, getMark, play };
};

const playerX = PlayerFactory("Diego", "X");
const playerO = PlayerFactory("Paloma", "O");

let currentPlayer = playerX;

function insertMark(e) {
  const clickedPosition = e.target.getAttribute("data-position");

  if (currentPlayer === playerX) {
    gameBoard[clickedPosition] = playerX.getMark();
    searchScore(playerX.getMark());
    currentPlayer = playerO;
  } else {
    gameBoard[clickedPosition] = playerO.getMark();
    searchScore(playerO.getMark());
    currentPlayer = playerX;
  }

  updateBoard();
  blockPosition(e.target);
}

function updateBoard() {
  for (let position of boardPositions) {
    position.innerText =
      gameBoard[parseInt(position.getAttribute("data-position"))];
  }
}

function blockPosition(position) {
  position.removeEventListener("click", insertMark);
}

function searchScore(mark) {
  if (
    (gameBoard[0] === mark && gameBoard[1] === mark && gameBoard[2] === mark) ||
    (gameBoard[3] === mark && gameBoard[4] === mark && gameBoard[5] === mark) ||
    (gameBoard[6] === mark && gameBoard[7] === mark && gameBoard[8] === mark) ||
    (gameBoard[0] === mark && gameBoard[3] === mark && gameBoard[6] === mark) ||
    (gameBoard[1] === mark && gameBoard[4] === mark && gameBoard[7] === mark) ||
    (gameBoard[2] === mark && gameBoard[5] === mark && gameBoard[8] === mark) ||
    (gameBoard[0] === mark && gameBoard[4] === mark && gameBoard[8] === mark) ||
    (gameBoard[2] === mark && gameBoard[4] === mark && gameBoard[6] === mark)
  )
    console.log(mark + "SCORE");
}

const boardPositions = document.querySelectorAll("main div");
boardPositions.forEach((position) => {
  position.addEventListener("click", insertMark);
});
