const board = $('#board');

function initializeListeners() {
  $('#playBtn').on('click', () => {
    playGame();
  })
}

function playGame() {
  const dimensionsInput = $('#dimensionsInput').val();
  const bombsInput = $('#bombsInput').val();
  if (dimensionsInput < 1 || bombsInput < 1) {
    return;
  }

  const minesweeper = new Minesweeper(dimensionsInput, bombsInput);
  drawBoard(minesweeper);
}

function drawBoard(minesweeper) {
  console.log("Drawing board");
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
    if (cell.isBomb) {
      div.append($('<img class="bomb"></img>'));
    } else {
      div.append($('<img class="revealed"></img>'));

      if (cell.number > 0) {
        const bombCount = $('<div class="bomb-count"></div>');
        bombCount.text(cell.number);
        div.append(bombCount);
      }
    }

  } else if (cell.isFlagged) {
    if (minesweeper.lost) {
      div.append($('<img class="misflagged"></img>'));
    } else {
      div.append($('<img class="flagged"></img>'));
    }
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