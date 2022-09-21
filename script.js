const gameBoard = {
  board: ["", "", "", "", "", "", "", "", ""],
};

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
    gameBoard.board[clickedPosition] = playerX.getMark();
    currentPlayer = playerO;
  } else {
    gameBoard.board[clickedPosition] = playerO.getMark();
    currentPlayer = playerX;
  }

  updateBoard();
  blockPosition(e.target);
}

function updateBoard() {
  for (let position of boardPositions) {
    position.innerText =
      gameBoard.board[parseInt(position.getAttribute("data-position"))];
  }
}

function blockPosition(position) {
  position.removeEventListener("click", insertMark);
}

const boardPositions = document.querySelectorAll("main div");
boardPositions.forEach((position) => {
  position.addEventListener("click", insertMark);
});
