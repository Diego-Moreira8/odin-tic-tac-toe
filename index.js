class Player {
  constructor(mark) {
    this.mark = mark;
    this.score = 0;
  }

  incrementScore = () => this.score++;
  resetScore = () => (this.score = 0);
}

class gameBoard {
  constructor() {
    this.board = new Array(9).fill(null);
    this.isGameOver = false;
    this.isPlayer1Turn = true;
    this.roundWinner = null;
    this.player1 = new Player("X");
    this.player2 = new Player("O");

    this.startUi();
  }

  startUi() {
    const board = document.querySelector("#board");
    const nextRoundBtn = document.querySelector(".next-round");
    const restartScoreBtn = document.querySelector(".restart-score");

    for (let i = 0; i < 9; i++) {
      const square = document.createElement("button");
      square.id = i;
      square.addEventListener("click", () => this.handleSquareClick(i));
      board.appendChild(square);
    }

    nextRoundBtn.addEventListener("click", () => this.resetBoard());
    restartScoreBtn.addEventListener("click", () => this.resetScore());

    this.updateUi();
  }

  handleSquareClick(index) {
    if (this.isGameOver) return;
    this.insertMark(index);
    this.evaluateBoard();
    this.updateUi();
  }

  insertMark(index) {
    if (this.board[index] !== null) return;

    this.board[index] = this.isPlayer1Turn
      ? this.player1.mark
      : this.player2.mark;

    this.isPlayer1Turn = !this.isPlayer1Turn;
  }

  evaluateBoard() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Verify if is a draw
    const hasNullSquares = this.board.find((square) => square === null);
    if (hasNullSquares === undefined) this.isGameOver = true;

    // Search for a winner
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        if (this.board[a] === this.player1.mark) {
          this.player1.incrementScore();
          this.roundWinner = this.player1;
        } else {
          this.player2.incrementScore();
          this.roundWinner = this.player2;
        }

        this.isGameOver = true;
      }
    }
  }

  updateUi() {
    const scoreDivs = document.querySelectorAll(".player-score");
    const statusDiv = document.querySelector("#board-status");
    const squaresBtns = document.querySelectorAll("#board button");
    const nextRoundBtn = document.querySelector(".next-round");

    scoreDivs[0].textContent = `${this.player1.mark}: ${this.player1.score}`;
    scoreDivs[1].textContent = `${this.player2.mark}: ${this.player2.score}`;

    if (this.isGameOver) {
      statusDiv.textContent =
        this.roundWinner === null
          ? "Empate"
          : `${this.roundWinner.mark} venceu!`;
    } else {
      statusDiv.textContent = `Vez de ${
        this.isPlayer1Turn ? this.player1.mark : this.player2.mark
      }`;
    }

    squaresBtns.forEach((btn) => (btn.textContent = this.board[btn.id]));

    nextRoundBtn.disabled = !this.isGameOver;
  }

  resetBoard() {
    this.board = new Array(9).fill(null);
    this.isGameOver = false;
    this.roundWinner = null;
    this.updateUi();
  }

  resetScore() {
    this.board = new Array(9).fill(null);
    this.isGameOver = false;
    this.isPlayer1Turn = true;
    this.roundWinner = null;
    this.player1.resetScore();
    this.player2.resetScore();
    this.updateUi();
  }
}

new gameBoard();
