function inBounds(r,c){return r>=0&&r<8&&c>=0&&c<8;}

export function generateMoves(board,r,c){
  const piece=board[r][c];
  if(!piece) return [];
  const color=piece[0];
  const type=piece[1];
  switch(type){
    case 'p': return pawn(board,r,c,color);
    case 'r': return slide(board,r,c,color,[[1,0],[-1,0],[0,1],[0,-1]]);
    case 'b': return slide(board,r,c,color,[[1,1],[1,-1],[-1,1],[-1,-1]]);
    case 'q': return slide(board,r,c,color,[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]);
    case 'k': return king(board,r,c,color);
    case 'n': return knight(board,r,c,color);
  }
  return [];
}

function pawn(board,r,c,color){
  const dir=color==='w'? -1:1;
  const startRow=color==='w'?6:1;
  const moves=[];
  if(inBounds(r+dir,c)&&!board[r+dir][c]){
    moves.push([r+dir,c]);
    if(r===startRow&&inBounds(r+2*dir,c)&&!board[r+2*dir][c])
      moves.push([r+2*dir,c]);
  }
  for(const dc of [-1,1]){
    const nr=r+dir,nc=c+dc;
    if(inBounds(nr,nc)&&board[nr][nc]&&board[nr][nc][0]!==color)
      moves.push([nr,nc]);
  }
  return moves;
}

function slide(board,r,c,color,dirs){
  const moves=[];
  for(const [dr,dc] of dirs){
    let nr=r+dr,nc=c+dc;
    while(inBounds(nr,nc)){
      if(!board[nr][nc]){
        moves.push([nr,nc]);
      } else {
        if(board[nr][nc][0]!==color) moves.push([nr,nc]);
        break;
      }
      nr+=dr; nc+=dc;
    }
  }
  return moves;
}

function knight(board,r,c,color){
  const deltas=[[2,1],[1,2],[-1,2],[-2,1],[-2,-1],[-1,-2],[1,-2],[2,-1]];
  const moves=[];
  for(const [dr,dc] of deltas){
    const nr=r+dr,nc=c+dc;
    if(inBounds(nr,nc)&&(!board[nr][nc]||board[nr][nc][0]!==color))
      moves.push([nr,nc]);
  }
  return moves;
}

function king(board,r,c,color){
  const moves=[];
  for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){
    if(dr===0&&dc===0) continue;
    const nr=r+dr,nc=c+dc;
    if(inBounds(nr,nc)&&(!board[nr][nc]||board[nr][nc][0]!==color))
      moves.push([nr,nc]);
  }
  return moves;
}
