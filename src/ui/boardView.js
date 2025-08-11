import { createStartBoard } from '../core/board.js';
import { generateMoves } from '../core/moves.js';
import { applyMove } from '../core/rules.js';

export function initBoardView(el){
  let board=createStartBoard();
  let selected=null; let highlights=[];

  function render(){
    el.innerHTML='';
    el.className='board';
    for(let r=0;r<8;r++){
      for(let c=0;c<8;c++){
        const sq=document.createElement('div');
        sq.className='square '+((r+c)%2?'dark':'light');
        if(highlights.some(h=>h[0]===r&&h[1]===c)) sq.classList.add('highlight');
        const piece=board[r][c];
        if(piece){
          const symbol=pieceSymbols[piece];
          sq.textContent=symbol||'';
        }
        sq.addEventListener('click',()=>onClick(r,c));
        el.appendChild(sq);
      }
    }
  }

  function onClick(r,c){
    if(selected){
      if(highlights.some(h=>h[0]===r&&h[1]===c)){
        board=applyMove(board,selected,[r,c]);
      }
      selected=null; highlights=[];
    } else if(board[r][c]) {
      selected=[r,c];
      highlights=generateMoves(board,r,c);
    }
    render();
  }

  render();
}

const pieceSymbols={
  'wr':'♖','wn':'♘','wb':'♗','wq':'♕','wk':'♔','wp':'♙',
  'br':'♜','bn':'♞','bb':'♝','bq':'♛','bk':'♚','bp':'♟'
};
