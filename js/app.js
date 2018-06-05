/*

App represents the primary logic for hooking up the various elements
on the page with the appropriate handlers. It contains the initialization
code to start a new game, calls back to the minesweeper class whenever
there is any kind of interaction (such as click), and redraws the game
board whenever anything changes.

*/

class App {

  constructor() {
    this.boardDom = $('#board');
    this.terminationTextDom = $('#termination-text');
    this.numUnrevealedBlocksDom = $('#num-unrevealed-blocks');
    this.numBombsLeftDom = $('#num-bombs-left');

    $('#playBtn').on('click', () => {
      this.playGame();
    })
  }

  playGame() {
    const dimensionsInput = $('#dimensionsInput').val();
    const bombsInput = $('#bombsInput').val();
    if (dimensionsInput < 1 || bombsInput < 1) {
      return;
    }

    const minesweeper = new Minesweeper(dimensionsInput, bombsInput);
    this.drawBoard(minesweeper);
  }

  drawBoard(minesweeper) {
    console.log("Drawing board");
    this.boardDom.empty();

    for (let i = 0; i < minesweeper.dimension; i++) {
      const row = $('<div class="row"></div>');
      for (let j = 0; j < minesweeper.dimension; j++) {
        row.append(this.makeCell(minesweeper, i, j));
      }
      this.boardDom.append(row);
    }

    if (minesweeper.won) {
      this.terminationTextDom.text("You've won!");
    } else if (minesweeper.lost) {
      this.terminationTextDom.text("You've lost.");
    }

    let numUnrevealedBlocks = 0;
    let numBombsLeft = minesweeper.numBombs;
    forEachCell(minesweeper.board, cell => {
      if (!cell.isRevealed) {
        numUnrevealedBlocks++;
      }
      if (cell.isFlagged) {
        numBombsLeft--;
      }
    })
    this.numUnrevealedBlocksDom.text(numUnrevealedBlocks);
    this.numBombsLeftDom.text(numBombsLeft);
  }

  makeCell(minesweeper, row, col) {
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
}