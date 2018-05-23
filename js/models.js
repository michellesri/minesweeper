// The cell represents a single cell in the minesweeper game
class Cell {
  constructor() {
    this.isBomb = false;
    this.isFlagged = false;
    this.isRevealed = false;
    // Only care about this number if isBomb is false
    this.number = 0;
  }
}