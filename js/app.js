

function playGame() {
  const minesweeper = new Minesweeper(10, 10);
  const board = $('#board');
  board.empty();

  for (let i = 0; i < 10; i++) {
    const row = $('<div class="row"></div>');
    for (let j = 0; j < 10; j++) {
      const cell = minesweeper.board[i][j];
      if (cell.isBomb) {
        row.append($('<img class="bomb"></img>'));
      } else if (cell.isFlagged) {
        row.append($('<img class="flagged"></img>'));
      } else if (cell.isRevealed) {
        row.append($('<img class="revealed"></img>'));
      } else {
        row.append($('<img class="cell"></img>'));
      }
    }
    board.append(row);
  }
}


playGame();