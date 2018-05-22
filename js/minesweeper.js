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

    console.log(this.generateBombs())

    this.board[2][3].isBomb = true
    this.board[3][4].isRevealed = true
    this.board[1][5].isFlagged = true
  }

  // Array of array, each subarray represents [row, column].
  generateBombs() {
    const bombLocations = [];
    for (var i = 0; i < this.numBombs; i++) {
      let bomb = this.generateRandomBomb();
      while (this.doesBombExist(bombLocations, bomb)) {
        bomb = this.generateRandomBomb();
      }
      bombLocations.push(bomb);
    }
    return bombLocations;
  }

  generateRandomBomb() {
    const rowBomb = Math.floor(Math.random() * this.dimension);
    const colBomb = Math.floor(Math.random() * this.dimension);
    return [rowBomb, colBomb];
  }

  doesBombExist(bombLocations, bomb) {
    for (let i = 0; i < bombLocations.length; i++) {
      const match = bomb[0] === bombLocations[i][0] && 
        bomb[1] === bombLocations[i][1];
      if (match) {
        return true;
      }
    }
    return false;
  }
}