 class Minesweeper {

  constructor(dimension, numBombs) {
    this.dimension = dimension;
    this.numBombs = numBombs;

    this.initializeBoard();

    // testing 
    this.board[3][4].isRevealed = true;
    this.board[1][5].isFlagged = true;
  }

  initializeBoard() {
    this.createBoard();

    const bombs = this.generateBombs();
    for (let i = 0; i < bombs.length; i++) {
      const bomb = bombs[i];
      this.board[bomb[0]][bomb[1]].isBomb = true;
      runOnAllAdjacentBlocks(bomb[0], bomb[1], this.dimension, (row, col) => {
        const cell = this.board[row][col];
        if (!cell.isBomb) {
          cell.number++;
        }
      })
    }

    console.log(this.board);
  }

  createBoard() {
    this.board = [];
    for (let i = 0; i < this.dimension; i++) {
      const innerArr = [];
      for (let j = 0; j < this.dimension; j++) {
        innerArr.push(new Cell());
      }
      this.board.push(innerArr);
    }
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