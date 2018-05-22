

function playGame() {
  const minesweeper = new Minesweeper(10, 10);
  const board = $('#board');
  board.empty();

  for (let i = 0; i < 10; i++) {
    const row = $('<div class="row"></div>');
    for (let j = 0; j < 10; j++) {
      const cell = minesweeper.board[i][j];
      if (cell.isBomb) {
        row.append($('<div class="cell bomb"></div>'));
      } else if (cell.isFlagged) {
        row.append($('<div class="cell flagged"></div>'));
      } else if (cell.isRevealed) {
        row.append($('<div class="cell revealed"></div>'));
      } else {
        row.append($('<div class="cell"></div>'));
      }
    }
    board.append(row);
  }
}


playGame();