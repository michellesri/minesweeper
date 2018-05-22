 class Minesweeper {

  constructor(dimension, numBombs) {
    this.dimension = dimension;
    this.numBombs = numBombs;

    // Initialize the board
    this.board = [];
    for (let i = 0; i < dimension; i++) {
      const innerArr = [];
      for (let j = 0; j < dimension; j++) {
        innerArr.push(new Cell());
      }
      this.board.push(innerArr);
    }

    this.board[2][3].isBomb = true
    this.board[3][4].isRevealed = true
    this.board[1][5].isFlagged = true
  }
}