const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  let currentPlayer = "X";

  const blockBoard = () => {
    boardPositions.forEach((position) => {
      position.removeEventListener("click", gameBoard.insertMark);
    });
  };

  const updateBoard = () => {
    for (let position of boardPositions) {
      position.innerText =
        board[parseInt(position.getAttribute("data-position"))];
    }
  };

  const searchScore = (mark) => {
    if (
      (board[0] === mark && board[1] === mark && board[2] === mark) ||
      (board[3] === mark && board[4] === mark && board[5] === mark) ||
      (board[6] === mark && board[7] === mark && board[8] === mark) ||
      (board[0] === mark && board[3] === mark && board[6] === mark) ||
      (board[1] === mark && board[4] === mark && board[7] === mark) ||
      (board[2] === mark && board[5] === mark && board[8] === mark) ||
      (board[0] === mark && board[4] === mark && board[8] === mark) ||
      (board[2] === mark && board[4] === mark && board[6] === mark)
    ) {
      console.log(mark + " SCORE");
      blockBoard();
    }
  };

  const insertMark = (e) => {
    board[e.target.getAttribute("data-position")] = currentPlayer;
    updateBoard();
    e.target.removeEventListener("click", gameBoard.insertMark); // Block position
    searchScore(currentPlayer);
    currentPlayer === "X" ? (currentPlayer = "O") : (currentPlayer = "X");
  };

  return { insertMark };
})();

const boardPositions = document.querySelectorAll("main div");
boardPositions.forEach((position) => {
  position.addEventListener("click", gameBoard.insertMark);
});
