const boardPositions = document.querySelectorAll("main div");

const gameBoard = ["", "", "", "", "", "", "", "", ""];

function updateBoard() {
  for (let position = 0; position < 9; position++) {
    boardPositions[position].innerText = gameBoard[position];
  }
}

const Player = (name, mark) => {
  return { name, mark };
};
