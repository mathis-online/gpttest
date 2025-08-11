import { generateMoves } from './moves.js';
import { cloneBoard } from './board.js';

export function isLegalMove(board, from, to){
  const [r,c]=from; const moves=generateMoves(board,r,c);
  return moves.some(m=>m[0]===to[0]&&m[1]===to[1]);
}

export function applyMove(board, from, to){
  if(!isLegalMove(board,from,to)) return board;
  const nb=cloneBoard(board);
  nb[to[0]][to[1]]=nb[from[0]][from[1]];
  nb[from[0]][from[1]]=null;
  return nb;
}
