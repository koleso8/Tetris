export default class Controller {
  constructor(game, viev) {
    this.game = game;
    this.view = viev;
    this.isPlaying = false;

    document.addEventListener('keydown', this.handleKeydown.bind(this));
    this.view.renderStartScreen();
  }

  update() {
    this.game.movePieceDown();
    this.updateView();
  }

  play() {
    this.isPlaying = true;
    this.startTimer();
    this.updateView();
  }
  pause() {
    this.isPlaying = false;
    this.stoptTimer();
    this.updateView();
  }

  updateView() {
    if (!this.isPlaying) {
      this.view.renderPauseScreen();
    } else {
      this.view.renderMainScreen(this.game.getState());
    }
  }

  startTimer() {
    const speed = 1000 - this.game.getState().level * 100;

    if (!this.intervalID) {
      this.intervalID = setInterval(
        () => {
          this.update();
        },
        speed > 0 ? speed : 1000
      );
    }
  }
  stoptTimer() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = null;
    }
  }

  handleKeydown(event) {
    switch (event.code) {
      //!'START'
      case 'Enter':
        if (this.isPlaying) {
          this.pause();
        } else {
          this.play();
        }
        break;
      //!'ArrowLeft'
      case 'ArrowLeft' || 'KeyA': //
        this.game.movePieceLeft();
        this.view.renderMainScreen(game.getState());
        break;
      //!ArrowUp'
      case 'ArrowUp' || 'KeyW':
        this.game.rotatePiece();
        this.view.renderMainScreen(game.getState());
        break;
      //!'ArrowRight'
      case 'ArrowRight' || 'KeyD':
        this.game.movePieceRight();
        this.view.renderMainScreen(game.getState());
        break;
      //!'ArrowDown'
      case 'ArrowDown' || 'KeyS':
        this.game.movePieceDown();
        this.view.renderMainScreen(game.getState());
        break;
    }
  }
}
