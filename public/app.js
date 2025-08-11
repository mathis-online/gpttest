import { initBoardView } from '../src/ui/boardView.js';
import { t } from '../src/utils/i18n.js';

const app = document.getElementById('app');

function showMenu() {
  app.innerHTML = `\n    <h1>${t('title')}</h1>\n    <button id="learn">${t('learn')}</button>\n    <button id="puzzles">${t('puzzles')}</button>\n    <button id="play">${t('freePlay')}</button>`;
  document.getElementById('learn').onclick = () => location.hash = '#learn';
  document.getElementById('puzzles').onclick = () => location.hash = '#puzzles';
  document.getElementById('play').onclick = () => location.hash = '#play';
}

function showBoard() {
  app.innerHTML = '<div id="board"></div>';
  initBoardView(document.getElementById('board'));
}

function route() {
  const hash = location.hash.replace('#','');
  if (!hash) return showMenu();
  switch(hash) {
    case 'play':
      showBoard();
      break;
    default:
      showMenu();
  }
}

window.addEventListener('hashchange', route);
route();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
