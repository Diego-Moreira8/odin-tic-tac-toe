// Creates the Game Board
// (IIFE (Immediately Invoked Function Expression))
const gameBoard = (() => new Array(9))();

const Player = (name, mark) => {
  return { name, mark };
};
