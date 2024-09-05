export default class Controller {
  constructor(game, viev) {
    this.game = game;
    this.view = viev;
    this.isPlaying = false;

    document.addEventListener('keydown', this.handleKeydown.bind(this));
    document.addEventListener('keyup', this.handleKeyup.bind(this));

    const pad = document.querySelector('.PAD');
    pad.addEventListener('click', this.handlePadPress.bind(this));
    pad.addEventListener('click', this.handlePadup.bind(this));

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

  reset() {
    this.game.reset();
    this.play();
  }

  updateView() {
    const state = this.game.getState();

    if (state.isGameOver) {
      this.view.renderGameOverScreen(state);
    } else if (!this.isPlaying) {
      this.view.renderPauseScreen();
    } else {
      this.view.renderMainScreen(state);
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

  handlePadPress(event) {
    const state = this.game.getState();

    if (event.target.value === undefined) return;
    console.log(event.target.innerText);

    switch (event.target.innerText) {
      //!'START'
      case 'Enter':
        if (state.isGameOver) {
          this.reset();
        } else if (this.isPlaying) {
          this.pause();
        } else {
          this.play();
        }
        break;
      //!'ArrowLeft'
      case 'B':
        if (!this.isPlaying) return;
        this.game.movePieceLeft();
        this.updateView();
        break;

      //!ArrowUp'
      case 'A':
        if (!this.isPlaying) return;
        this.game.rotatePiece();
        this.updateView();
        break;

      //!'ArrowRight'
      case 'C':
        if (!this.isPlaying) return;
        this.game.movePieceRight();
        this.updateView();
        break;

      //!'ArrowDown'
      case 'D':
        if (!this.isPlaying) return;
        this.stoptTimer();
        this.game.movePieceDown();
        this.updateView();
        break;
    }
  }

  handlePadup(event) {
    switch (event.target.innerText) {
      //!'ArrowDown'
      case 'D':
        if (!this.isPlaying) return;
        this.startTimer();
        break;
    }
  }

  handleKeydown(event) {
    const state = this.game.getState();

    switch (event.code) {
      //!'START'
      case 'Enter':
        if (state.isGameOver) {
          this.reset();
        } else if (this.isPlaying) {
          this.pause();
        } else {
          this.play();
        }
        break;
      //!'ArrowLeft'
      case 'ArrowLeft':
        if (!this.isPlaying) return;
        this.game.movePieceLeft();
        this.updateView();
        break;
      case 'KeyA':
        if (!this.isPlaying) return;
        this.game.movePieceLeft();
        this.updateView();
        break;
      //!ArrowUp'
      case 'ArrowUp':
        if (!this.isPlaying) return;
        this.game.rotatePiece();
        this.updateView();
        break;
      case 'KeyW':
        if (!this.isPlaying) return;
        this.game.rotatePiece();
        this.updateView();
        break;
      //!'ArrowRight'
      case 'ArrowRight':
        if (!this.isPlaying) return;
        this.game.movePieceRight();
        this.updateView();
        break;
      case 'KeyD':
        if (!this.isPlaying) return;
        this.game.movePieceRight();
        this.updateView();
        break;
      //!'ArrowDown'
      case 'ArrowDown':
        if (!this.isPlaying) return;
        this.stoptTimer();
        this.game.movePieceDown();
        this.updateView();
        break;
      case 'KeyS':
        if (!this.isPlaying) return;
        this.stoptTimer();
        this.game.movePieceDown();
        this.updateView();
        break;
    }
  }

  handleKeyup(event) {
    switch (event.code) {
      //!'ArrowDown'
      case 'ArrowDown':
        if (!this.isPlaying) return;
        this.startTimer();
        break;
      case 'KeyS':
        if (!this.isPlaying) return;
        this.startTimer();
        break;
    }
  }
}
