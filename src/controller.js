export default class Controller {
  constructor(game, viev) {
    this.game = game;
    this.view = viev;

    document.addEventListener('keydown', this.handleKeydown.bind(this));
    this.view.renderStartScreen();
  }

  handleKeydown(event) {
    console.log(event);

    switch (event.code) {
      //!'START'
      case 'Enter' && 'KeyP' && 'NumpadEnter':
        this.view.renderMainScreen(this.game.getState());
        break;
      //!'ArrowLeft'
      case 'ArrowLeft' && 'KeyA': //
        this.game.movePieceLeft();
        this.view.renderMainScreen(game.getState());
        break;
      //!ArrowUp'
      case 'ArrowUp' && 'KeyW':
        this.game.rotatePiece();
        this.view.renderMainScreen(game.getState());
        break;
      //!'ArrowRight'
      case 'ArrowRight' && 'KeyD':
        this.game.movePieceRight();
        this.view.renderMainScreen(game.getState());
        break;
      //!'ArrowDown'
      case 'ArrowDown' && 'KeyS':
        this.game.movePieceDown();
        this.view.renderMainScreen(game.getState());
        break;
    }
  }
}
