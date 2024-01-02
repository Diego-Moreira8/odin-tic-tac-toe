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
    for (let i = 0; i < 9; i++) {
      const btn = document.createElement("button");
      btn.id = i;
      btn.addEventListener("click", () => this.handleClick(i));
      document.querySelector("body").appendChild(btn);
    }
  }

  handleClick(index) {
    if (this.isGameOver) return;
    this.updateBoard(index);
    this.renderBoard();
    this.isGameOver = this.evaluateBoard();

    //this.logBoard();
    //console.log(this.evaluateBoard());
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
    const btns = document.querySelectorAll("button");
    btns.forEach((b) => (b.textContent = this.board[b.id]));
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

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        return true;
      }
    }

    return false;
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
