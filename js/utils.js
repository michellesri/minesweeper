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
