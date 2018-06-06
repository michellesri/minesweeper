class Solver {
  constructor(minesweeper) {
    this.minesweeper = minesweeper;
  }

  // Returns [isRightClick, row, col]
  getNextMove() {
    const dimen = this.minesweeper.dimension;

    // See if there is any cell that we can flag
    let rowToFlag = undefined;
    let colToFlag = undefined;
    forEachCell(this.minesweeper.board, (cell, row, col) => {
      if (cell.isRevealed || cell.isFlagged || (rowToFlag !== undefined)) {
        return;
      }

      // A cell can be flagged if there is one neighbor that has bombs
      // that cannot be accounted for otherwise.
      runOnAllAdjacentBlocks(row, col, dimen, (neighborRow, neighborCol) => {
        const neighbor = this.minesweeper.board[neighborRow][neighborCol];
        // probably need to change this structure, technically I can just access
        // neighbor.isBomb or neighbor.number since there is no restrictions here.
        if (neighbor.isRevealed && neighbor.number > 0) {
          let numFlaggedAroundNeighbor = 0;
          runOnAllAdjacentBlocks(neighborRow, neighborCol, dimen, (i, j) => {
            const neighborOfNeighbor = this.minesweeper.board[i][j];
            if (!neighborOfNeighbor.isRevealed && neighborOfNeighbor.isFlagged) {
              numFlaggedAroundNeighbor++;
            }
          });
          if (numFlaggedAroundNeighbor === neighbor.number - 1) {
            // All other bombs are accounted for, this must be a bomb
            rowToFlag = row;
            colToFlag = col;
          }
        }
      });
    });

    if (rowToFlag !== undefined) {
      return [false, rowToFlag, colToFlag];
    }

    const row = Math.floor(Math.random() * (dimen - 1));
    const col = Math.floor(Math.random() * (dimen - 1));
    return [true, row, col];
  }
}
