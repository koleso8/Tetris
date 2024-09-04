import Game from './src/game.js';
import View from './src/view.js';

const root = document.querySelector('.root');

const game = new Game();
const view = new View(root, 320, 640, 20, 10);

window.game = game;
window.view = view;

document.addEventListener('keydown', event => {
  switch (event.code) {
    //!'ArrowLeft'
    case 'ArrowLeft' || 'KeyA': //
      game.movePieceLeft();
      view.render(game.getState());
      break;
    //!ArrowUp'
    case 'ArrowUp' || 'KeyW':
      game.rotatePiece();
      view.render(game.getState());
      break;
    //!'ArrowRight'
    case 'ArrowRight' || 'KeyD':
      game.movePieceRight();
      view.render(game.getState());
      break;
    //!'ArrowDown'
    case 'ArrowDown' || 'KeyS':
      game.movePieceDown();
      view.render(game.getState());
      break;
  }
});
