/*

Some helpful utility methods.

*/

function runOnAllAdjacentBlocks(row, col, dimension, func) {
  if (row != 0 && col != 0) {
    func(row - 1, col - 1);
  }
  if (row != 0) {
    func(row - 1, col);
  }
  if (col != 0) {
    func(row, col - 1);
  }
  if (row != dimension - 1 && col != dimension - 1) {
    func(row + 1, col + 1);
  }
  if (row != dimension - 1) {
    func(row + 1, col);
  }
  if (col != dimension - 1) {
    func(row, col + 1);
  }
  if (row != 0 && col != dimension - 1) {
    func(row - 1, col + 1);
  }
  if (row != dimension - 1 && col != 0) {
    func(row + 1, col - 1);
  }
}

function forEachCell(matrix, func) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      func(matrix[i][j]);
    }
  }
}

function toMMSS(sec_num) {
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes+':'+seconds;
}
