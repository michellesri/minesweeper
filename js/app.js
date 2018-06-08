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
    this.timerDom = $('#timer');
    this.numUnrevealedBlocksDom = $('#num-unrevealed-blocks');
    this.numBombsLeftDom = $('#num-bombs-left');
    this.leaderboardDom = $('#leaderboard');

    this.leaderboard = new Leaderboard();

    $('#playBtn').on('click', () => {
      const dimensionsInput = $('#dimensionsInput').val();
      if (dimensionsInput < 1) {
        return;
      }
      this.playGame(dimensionsInput);
    })

    $('#auto-solve-one-move-btn').on('click', () => {
      this.autoSolveOneMove();
    });
    $('#auto-solve-everything-btn').on('click', () => {
      this.autoSolveGame();
    })
  }

  playGame(dimen) {
    this.minesweeper = new Minesweeper(dimen);
    this.solver = new Solver(this.minesweeper);
    this.drawBoard();
    this.drawLeaderboard();

    // Start timer
    this.timeElapsed = 0;
    this.timerDom.text(toMMSS(this.timeElapsed));
    this.timer = setInterval(() => {
      this.timeElapsed++;
      this.timerDom.text(toMMSS(this.timeElapsed));
    }, 1000);
  }

  autoSolveGame() {
    if (!this.solverTimer) {
      this.solverTimer = setInterval(() => {
        this.autoSolveOneMove();
      }, 1000);
    }
  }

  autoSolveOneMove() {
    const move = this.solver.getNextMove();
    if (move[0]) {
      this.click(move[1], move[2]);
    } else {
      this.rightClick(move[1], move[2]);
    }
  }

  drawBoard() {
    console.log("Drawing board");
    this.boardDom.empty();

    for (let i = 0; i < this.minesweeper.dimension; i++) {
      const row = $('<div class="row"></div>');
      for (let j = 0; j < this.minesweeper.dimension; j++) {
        row.append(this.makeCell(i, j));
      }
      this.boardDom.append(row);
    }

    if (this.minesweeper.won) {
      this.onGameEnded(true);
    } else if (this.minesweeper.lost) {
      this.onGameEnded(false);
    }

    let numUnrevealedBlocks = 0;
    let numBombsLeft = this.minesweeper.numBombs;
    forEachCell(this.minesweeper.board, cell => {
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

  makeCell(row, col) {
    const cell = this.minesweeper.board[row][col];
    const div = $('<div class="cell-wrapper"></div>');
    if (cell.isRevealed) {
      if (cell.isBomb) {
        if (cell.isFlagged) {
          div.append($('<img class="flagged"></img>'));
        } else {
          div.append($('<img class="bomb"></img>'));
        }
      } else {
        div.append($('<img class="revealed"></img>'));

        if (cell.number > 0) {
          const bombCount = $('<div class="bomb-count"></div>');
          bombCount.text(cell.number);
          div.append(bombCount);
        }
      }

    } else if (cell.isFlagged) {
      if (this.minesweeper.lost) {
        div.append($('<img class="misflagged"></img>'));
      } else {
        div.append($('<img class="flagged"></img>'));
      }
    } else {
      div.append($('<img class="cell"></img>'));
    }

    div.on('click', () => {
      this.click(row, col);
    });
    div.on('contextmenu', e => {
      e.preventDefault();
      this.rightClick(row, col);
    });

    return div;
  }

  click(row, col) {
    this.minesweeper.onCellClicked(row, col);
    this.drawBoard(this.minesweeper);
  }

  rightClick(row, col) {
    this.minesweeper.onCellRightClicked(row, col);
    this.drawBoard(this.minesweeper);
  }

  drawLeaderboard() {
    const dimen = this.minesweeper.dimension;
    const scores = this.leaderboard.getTop10ForDimen(dimen);
    this.leaderboardDom.empty();

    const header = $('<h3></h3>');
    header.text("Top scores for " + dimen + "x" + dimen);
    this.leaderboardDom.append(header);

    for (let i = 0; i < scores.length; i++) {
      const score = toMMSS(scores[i]);
      const scoreDom = $('<div></div>');
      scoreDom.text(score);
      this.leaderboardDom.append(scoreDom);
    }
  }

  onGameEnded(won) {
    let timerText = this.timerDom.text();
    if (won) {
      timerText = "You've won! Time: " + timerText;
      this.leaderboard.addWinData(this.minesweeper.dimension, this.timeElapsed);
    } else {
      timerText = "You've lost. Time: " + timerText;
    }
    this.timerDom.text(timerText);

    clearInterval(this.timer);
    clearInterval(this.solverTimer);
    this.drawLeaderboard();
  }
}
