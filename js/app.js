function initializeListeners() {
  $('#playBtn').on('click', () => {
    playGame();
  })
}

function playGame() {
  const dimensionsInput = $('#dimensionsInput').val();
  const bombsInput = $('#bombsInput').val();
  const minesweeper = new Minesweeper(dimensionsInput, bombsInput);
  const board = $('#board');
  board.empty();

  for (let i = 0; i < dimensionsInput; i++) {
    const row = $('<div class="row"></div>');
    for (let j = 0; j < dimensionsInput; j++) {
      const cell = minesweeper.board[i][j];
      row.append(makeCell(cell));
    }
    board.append(row);
  }
}

function makeCell(cell) {
  const div = $('<div class="cell-wrapper"></div>');
  if (cell.isBomb) {
    div.append($('<img class="bomb"></img>'));
  } else if (cell.isFlagged) {
    div.append($('<img class="flagged"></img>'));
  } else if (cell.isRevealed) {
    div.append($('<img class="revealed"></img>'));
  } else {
    div.append($('<img class="cell"></img>'));
  }

  const bombCount = $('<div class="bomb-count"></div>');
  bombCount.text(cell.number);
  div.append(bombCount);

  return div;
}

initializeListeners();