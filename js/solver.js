/*

Solver bot that tries to generate safe moves for you to make. It will default
to a random move if no safe move is found.

*/

class Solver {
  constructor(minesweeper) {
    this.minesweeper = minesweeper;
  }

  // Returns [isLeftClick, row, col]
  getNextMove() {
    const cellToFlag = this.findCellToFlag();
    if (cellToFlag) {
      return [false, cellToFlag[0], cellToFlag[1]];
    }

    const cellToClick = this.findCellToClick();
    if (cellToClick) {
      return [true, cellToClick[0], cellToClick[1]];
    }

    // All hope is lost, generate a random location to click
    const dimen = this.minesweeper.dimension;
    const row = Math.floor(Math.random() * (dimen - 1));
    const col = Math.floor(Math.random() * (dimen - 1));
    return [true, row, col];
  }

  findCellToFlag() {
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
          let numUnrevealedAroundNeighbor = 0;
          runOnAllAdjacentBlocks(neighborRow, neighborCol, dimen, (i, j) => {
            const neighborOfNeighbor = this.minesweeper.board[i][j];
            if (!neighborOfNeighbor.isRevealed) {
              numUnrevealedAroundNeighbor++;
            }
          });

          // If the number of bombs is equal to the number of unrevealed
          // neighbors, then all of the unrevealed neighbors must be bombs.
          if (numUnrevealedAroundNeighbor === neighbor.number) {
            // This must be a bomb
            rowToFlag = row;
            colToFlag = col;
          }
        }
      });
    });

    if (rowToFlag !== undefined) {
      return [rowToFlag, colToFlag];
    }
    return undefined;
  }

  findCellToClick() {
    const dimen = this.minesweeper.dimension;

    let rowToClick = undefined;
    let colToClick = undefined;
    forEachCell(this.minesweeper.board, (cell, row, col) => {
      if (cell.isRevealed || cell.isFlagged || (rowToClick !== undefined)) {
        return;
      }

      // A cell can be clicked on if there is one neighbor that has all of its
      // bombs accounted for
      runOnAllAdjacentBlocks(row, col, dimen, (neighborRow, neighborCol) => {
        const neighbor = this.minesweeper.board[neighborRow][neighborCol];
        if (neighbor.isRevealed) {
          let numFlagged = 0;
          runOnAllAdjacentBlocks(neighborRow, neighborCol, dimen, (i, j) => {
            const neighborOfNeighbor = this.minesweeper.board[i][j];
            if (!neighborOfNeighbor.isRevealed && neighborOfNeighbor.isFlagged) {
              numFlagged++;
            }
          });

          if (numFlagged === neighbor.number) {
            // All bombs are accounted for
            rowToClick = row;
            colToClick = col;
          }
        }
      });
    });

    if (rowToClick !== undefined) {
      return [rowToClick, colToClick];
    }
    return undefined;
  }
}
