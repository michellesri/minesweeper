const board = $('#board');

function initializeListeners() {
  $('#playBtn').on('click', () => {
    playGame();
  })
}

function playGame() {
  const dimensionsInput = $('#dimensionsInput').val();
  const bombsInput = $('#bombsInput').val();
  const minesweeper = new Minesweeper(dimensionsInput, bombsInput);
  drawBoard(minesweeper);
}

function drawBoard(minesweeper) {
  board.empty();

  for (let i = 0; i < minesweeper.dimension; i++) {
    const row = $('<div class="row"></div>');
    for (let j = 0; j < minesweeper.dimension; j++) {
      row.append(makeCell(minesweeper, i, j));
    }
    board.append(row);
  }
}

function makeCell(minesweeper, row, col) {
  const cell = minesweeper.board[row][col];
  const div = $('<div class="cell-wrapper"></div>');
  if (cell.isRevealed) {
    if (cell.isBomb && cell.isFlagged) {
      div.append($('<img class="misflagged"></img>'));
    } else if (cell.isBomb) {
      div.append($('<img class="bomb"></img>'));
    } else {
      div.append($('<img class="revealed"></img>'));
      const bombCount = $('<div class="bomb-count"></div>');
      bombCount.text(cell.number);
      div.append(bombCount);
    }

  } else if (cell.isFlagged) {
    div.append($('<img class="flagged"></img>'));
  } else {
    div.append($('<img class="cell"></img>'));
  }

  div.on('click', () => {
    minesweeper.onCellClicked(row, col);
    drawBoard(minesweeper);
  });
  div.on('contextmenu', e => {
    e.preventDefault();
    minesweeper.onCellRightClicked(row, col);
    drawBoard(minesweeper);
  });

  return div;
}

initializeListeners();