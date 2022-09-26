const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;

  let score = 0;
  const getScore = () => score;
  const winRound = () => score++;

  return {
    getName,
    getMark,
    getScore,
    winRound,
  };
};

const gameFlow = (() => {
  const player1 = Player("Jogador(a)", "X");
  const player2 = Player("Jogador(a)", "O");

  let currentPlayer = player1;
  const switchCurrentPlayer = () => {
    currentPlayer === player1
      ? (currentPlayer = player2)
      : (currentPlayer = player1);
  };
  const getCurrentPlayer = () => currentPlayer;

  return { getCurrentPlayer, switchCurrentPlayer };
})();

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const playerTurnIndicator = document.querySelectorAll(
    ".player-turn-indicator"
  );

  const displayCurrentPlayer = () => {
    if (gameFlow.getCurrentPlayer().getMark() === "X") {
      playerTurnIndicator[0].innerText = "Sua vez";
      playerTurnIndicator[1].innerText = "";
    } else {
      playerTurnIndicator[0].innerText = "";
      playerTurnIndicator[1].innerText = "Sua vez";
    }
  };

  const highlightMarks = (position1, position2, position3) => {
    const styleValue = "rgba(255, 255, 255, 0.1)";
    boardPositions[position1].style["background-color"] = styleValue;
    boardPositions[position2].style["background-color"] = styleValue;
    boardPositions[position3].style["background-color"] = styleValue;
  };

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
    if (board[0] === mark && board[1] === mark && board[2] === mark) {
      blockBoard();
      highlightMarks(0, 1, 2);
    } else if (board[3] === mark && board[4] === mark && board[5] === mark) {
      blockBoard();
      highlightMarks(3, 4, 5);
    } else if (board[6] === mark && board[7] === mark && board[8] === mark) {
      blockBoard();
      highlightMarks(6, 7, 8);
    } else if (board[0] === mark && board[3] === mark && board[6] === mark) {
      blockBoard();
      highlightMarks(0, 3, 6);
    } else if (board[1] === mark && board[4] === mark && board[7] === mark) {
      blockBoard();
      highlightMarks(1, 4, 7);
    } else if (board[2] === mark && board[5] === mark && board[8] === mark) {
      blockBoard();
      highlightMarks(2, 5, 8);
    } else if (board[0] === mark && board[4] === mark && board[8] === mark) {
      blockBoard();
      highlightMarks(0, 4, 8);
    } else if (board[2] === mark && board[4] === mark && board[6] === mark) {
      blockBoard();
      highlightMarks(2, 4, 6);
    }
  };

  const insertMark = (e) => {
    board[e.target.getAttribute("data-position")] = gameFlow
      .getCurrentPlayer()
      .getMark();
    updateBoard();
    e.target.removeEventListener("click", gameBoard.insertMark); // Block position
    searchScore(gameFlow.getCurrentPlayer().getMark());
    gameFlow.switchCurrentPlayer();
    displayCurrentPlayer();
  };

  return { insertMark };
})();

const boardPositions = document.querySelectorAll("main div");
boardPositions.forEach((position) => {
  position.addEventListener("click", gameBoard.insertMark);
});
