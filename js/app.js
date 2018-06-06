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
    this.timerDom = $('#timer');
    this.numUnrevealedBlocksDom = $('#num-unrevealed-blocks');
    this.numBombsLeftDom = $('#num-bombs-left');

    this.leaderboard = new Leaderboard();

    $('#playBtn').on('click', () => {
      this.playGame();
    })
  }

  playGame() {
    const dimensionsInput = $('#dimensionsInput').val();
    if (dimensionsInput < 1) {
      return;
    }

    const minesweeper = new Minesweeper(dimensionsInput);
    this.drawBoard(minesweeper);

    // Start timer
    this.timeElapsed = 0;
    this.timerDom.text(toMMSS(this.timeElapsed));
    this.timer = setInterval(() => {
      this.timeElapsed++;
      this.timerDom.text(toMMSS(this.timeElapsed));
    }, 1000);
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
      this.onGameEnded(true);
    } else if (minesweeper.lost) {
      this.onGameEnded(false);
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
      this.drawBoard(minesweeper);
    });
    div.on('contextmenu', e => {
      e.preventDefault();
      minesweeper.onCellRightClicked(row, col);
      this.drawBoard(minesweeper);
    });

    return div;
  }

  onGameEnded(won) {
    if (won) {
      this.terminationTextDom.text("You've won!");
      this.leaderboard.addWinData(this.minesweeper.dimension, this.timeElapsed);
    } else {
      this.terminationTextDom.text("You've lost.");
    }

    clearInterval(this.timer);
  }
}
