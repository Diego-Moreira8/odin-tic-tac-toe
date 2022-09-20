const gameBoard = {
  board: ["", "", "", "", "", "", "", "", ""],
};

const PlayerFactory = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;

  const play = () => {};

  return { getName, getMark, play };
};

const diego = PlayerFactory("Diego", "X");
const paloma = PlayerFactory("Paloma", "O");
