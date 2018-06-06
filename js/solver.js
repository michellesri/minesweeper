class Solver {
  constructor(minesweeper) {
    this.minesweeper = minesweeper;
  }

  // Returns [isRightClick, row, col]
  getNextMove() {
    const dimen = this.minesweeper.dimension;
    const row = Math.floor(Math.random() * (dimen - 1));
    const col = Math.floor(Math.random() * (dimen - 1));
    return [false, row, col];
  }
}
