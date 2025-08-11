const strings={
  de:{
    title:'Kinder-Schach',
    learn:'Lernen',
    puzzles:'Puzzles',
    freePlay:'Freies Spielen'
  }
};
let lang='de';
export function t(key){
  return (strings[lang]&&strings[lang][key])||key;
}
