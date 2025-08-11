import { createEmptyBoard } from '../src/core/board.js';
import { generateMoves } from '../src/core/moves.js';

function assert(cond, msg){
  if(!cond) throw new Error(msg);
}

function testPawnMoves(){
  const b=createEmptyBoard();
  b[6][4]='wp'; // e2
  let m=generateMoves(b,6,4);
  assert(m.some(([r,c])=>r===5&&c===4),'pawn one step');
  assert(m.some(([r,c])=>r===4&&c===4),'pawn two step');
  b[5][4]='bp';
  m=generateMoves(b,6,4);
  assert(!m.some(([r,c])=>r===5&&c===4),'blocked pawn');
}

function testKnightMoves(){
  const b=createEmptyBoard();
  b[4][4]='wn';
  const m=generateMoves(b,4,4);
  assert(m.length===8,'knight has 8 moves');
}

function testRookBlock(){
  const b=createEmptyBoard();
  b[4][4]='wr';
  b[4][6]='wp';
  const m=generateMoves(b,4,4);
  assert(!m.some(([r,c])=>r===4&&c===7),'rook blocked by own piece');
}

export function runTests(){
  testPawnMoves();
  testKnightMoves();
  testRookBlock();
  return 'ok';
}

if (typeof document!=='undefined'){
  try { document.getElementById('out').textContent=runTests(); }
  catch(e){ document.getElementById('out').textContent=e.message; }
} else {
  console.log(runTests());
}
