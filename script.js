const gameBoard = {
  board: ["", "", "", "", "", "", "", "", ""],
};

const boardPositions = document.querySelectorAll("main div");
boardPositions.forEach((position) => {
  position.addEventListener("click", updateBoard);
});

function updateBoard() {
  for (let position of boardPositions) {
    position.innerText =
      gameBoard.board[parseInt(position.getAttribute("data-position")) - 1];
  }
}

const PlayerFactory = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;

  const play = () => {
    console.log(mark);
  };

  return { getName, getMark, play };
};

const diego = PlayerFactory("Diego", "X");
const paloma = PlayerFactory("Paloma", "O");
