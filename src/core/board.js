export function createEmptyBoard() {
  return Array.from({ length: 8 }, () => Array(8).fill(null));
}

export function createStartBoard() {
  const board = createEmptyBoard();
  const back = ['r','n','b','q','k','b','n','r'];
  for (let i=0;i<8;i++) {
    board[1][i] = 'bp';
    board[6][i] = 'wp';
    board[0][i] = 'b'+back[i];
    board[7][i] = 'w'+back[i];
  }
  return board;
}

export function cloneBoard(board) {
  return board.map(row => row.slice());
}
