/*

Minesweeper class represents the state of a single game board. It initializes
itself according to the provided dimensions and number of bombs (randomly
chooses the bomb locations so that they don't overlap). It contains callbacks
for when a cell gets revealed or flagged so that the game board's internal
state gets updated accordingly.

*/

class Minesweeper {

  constructor(dimension) {
    this.dimension = dimension;
    this.numBombs = Math.floor(dimension * dimension / 7);
    this.won = false;
    this.lost = false;

    this.initializeBoard();
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

  onCellClicked(row, col) {
    if (this.won || this.lost) {
      return;
    }

    const cell = this.board[row][col];
    if (cell.isBomb) {
      this.handleLoss();
    } else {
      this.revealNonBombCellsAndAdjacent(row, col);
      this.checkWin();
    }
  }

  revealNonBombCellsAndAdjacent(row, col) {
    const cell = this.board[row][col];
    if (cell.isRevealed || cell.isBomb) {
      return;
    }
    cell.reveal();
    if (cell.number === 0) {
      runOnAllAdjacentBlocks(row, col, this.dimension, (newRow, newCol) => {
        this.revealNonBombCellsAndAdjacent(newRow, newCol);
      })
    }
  }

  handleLoss() {
    this.lost = true;

    forEachCell(this.board, cell => {
      if (cell.isBomb) {
        cell.reveal();
      }
    })
  }

  checkWin() {
    let hasWon = true;
    forEachCell(this.board, newCell => {
      // Check if there is a cell that is not a bomb and hasn't been revealed.
      if (!newCell.isBomb && !newCell.isRevealed) {
        hasWon = false;
      }
    })

    if (hasWon) {
      this.won = true;
    }
  }

  onCellRightClicked(row, col) {
    if (this.won || this.lost) {
      return;
    }

    const cell = this.board[row][col];
    if (cell.isRevealed) {
      return;
    }

    cell.isFlagged = !cell.isFlagged;
    this.checkWin();
  }
}
