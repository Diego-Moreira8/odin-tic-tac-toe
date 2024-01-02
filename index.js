class Player {
  constructor(mark) {
    this.mark = mark;
    this.score = 0;
  }

  incrementScore = () => this.score++;
}

class gameBoard {
  constructor() {
    this.board = new Array(9).fill(null);
    this.player1 = new Player("X");
    this.player2 = new Player("O");
    this.isPlayer1Turn = true;
    this.isGameOver = false;

    this.renderButtons();
  }

  renderButtons() {
    const board = document.querySelector("#board");
    const nextRoundBtn = document.querySelector(".next-round");

    for (let i = 0; i < 9; i++) {
      const btn = document.createElement("button");
      btn.id = i;
      btn.addEventListener("click", () => this.handleClick(i));
      board.appendChild(btn);
    }

    nextRoundBtn.addEventListener("click", () => this.resetBoard());

    this.renderBoard();
  }

  handleClick(index) {
    if (this.isGameOver) return;
    this.updateBoard(index);
    this.evaluateBoard();
    this.renderBoard();
  }

  updateBoard(index) {
    if (this.board[index] !== null) {
      console.error("Already marked!");
      return;
    }

    this.board[index] = this.isPlayer1Turn
      ? this.player1.mark
      : this.player2.mark;

    this.isPlayer1Turn = !this.isPlayer1Turn;
  }

  renderBoard() {
    const btns = document.querySelectorAll("#board button");
    const scoreDivs = document.querySelectorAll(".player-score");
    const statusDiv = document.querySelector("#board-status");
    const nextRoundBtn = document.querySelector(".next-round");

    btns.forEach((b) => (b.textContent = this.board[b.id]));

    scoreDivs[0].textContent = `${this.player1.mark}: ${this.player1.score}`;
    scoreDivs[1].textContent = `${this.player2.mark}: ${this.player2.score}`;

    if (!this.isGameOver)
      statusDiv.textContent = `Vez de ${
        this.isPlayer1Turn ? this.player1.mark : this.player2.mark
      }`;

    nextRoundBtn.disabled = !this.isGameOver;
  }

  resetBoard() {
    this.board = new Array(9).fill(null);
    this.isGameOver = false;
    this.renderBoard();
  }

  evaluateBoard() {
    const statusDiv = document.querySelector("#board-status");
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

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        if (this.board[a] === this.player1.mark) this.player1.incrementScore();
        else this.player2.incrementScore();

        statusDiv.textContent = `${this.board[a]} venceu!`;
        this.isGameOver = true;
        return;
      }
    }

    const hasNullSquares = this.board.find((square) => square === null);
    if (hasNullSquares === undefined) {
      statusDiv.textContent = "Empate";
      this.isGameOver = true;
    }
  }

  logBoard() {
    let str = "";

    for (let i = 0; i < this.board.length; i++) {
      str += this.board[i] + " ";
      if (i !== 0 && (i + 1) % 3 === 0) str += "\n";
    }

    console.log(str);
  }
}

new gameBoard();
