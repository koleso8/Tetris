export default class Game {
  score = 0;
  lines = 0;
  level = 0;
  playField = this.createPlayField();
  activePieceX = 0;
  activePieceY = 0;
  activePiece = this.createPiece();

  /*  rotionIndex: 0,
    rotations: [
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
    ], */

  nextPiece = this.createPiece();

  getState() {
    const playField = this.createPlayField();
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    for (let y = 0; y < this.playField.length; y++) {
      playField[y] = [];

      for (let x = 0; x < this.playField[y].length; x++) {
        playField[y][x] = this.playField[y][x];
      }
    }

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          playField[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }
    }

    return { playField };
  }
  createPlayField() {
    const playField = [];

    for (let y = 0; y < 20; y++) {
      playField[y] = [];

      for (let x = 0; x < 10; x++) {
        playField[y][x] = 0;
      }
    }
    return playField;
  }

  createPiece() {
    const index = Math.floor(Math.random() * 7);

    const type = 'IJLOSTZ'[index];
    const piece = {};

    switch (type) {
      case 'I':
        piece.blocks = [
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ];
        break;
      case 'J':
        piece.blocks = [
          [0, 0, 0],
          [2, 2, 2],
          [0, 0, 2],
        ];
        break;
      case 'L':
        piece.blocks = [
          [0, 0, 0],
          [3, 3, 3],
          [3, 0, 0],
        ];
        break;
      case 'O':
        piece.blocks = [
          [0, 0, 0, 0],
          [0, 4, 4, 0],
          [0, 4, 4, 0],
          [0, 0, 0, 0],
        ];
        break;
      case 'S':
        piece.blocks = [
          [0, 0, 0],
          [0, 5, 5],
          [5, 5, 0],
        ];
        break;
      case 'T':
        piece.blocks = [
          [0, 0, 0],
          [6, 6, 6],
          [0, 6, 0],
        ];
        break;
      case 'Z':
        piece.blocks = [
          [0, 0, 0],
          [7, 7, 0],
          [0, 7, 7],
        ];
        break;
      default:
        throw new Error('Невідома фігура');
    }

    piece.x = Math.floor((10 - piece.blocks[0].length) / 2);
    piece.y = -1;

    return piece;
  }

  movePieceLeft() {
    this.activePiece.x -= 1;

    if (this.hasCollision()) {
      this.activePiece.x += 1;
    }
  }

  movePieceRight() {
    this.activePiece.x += 1;

    if (this.hasCollision()) {
      this.activePiece.x -= 1;
    }
  }

  movePieceDown() {
    this.activePiece.y += 1;

    if (this.hasCollision()) {
      this.activePiece.y -= 1;
      this.lockPiece();
      this.clearLines();
      this.updatePieces();
    }
  }

  rotatePiece() {
    /*  this.activePiece.rotionIndex =
      this.activePiece.rotionIndex < 3 ? this.activePiece.rotionIndex + 1 : 0;

    if (this.hasCollision()) {
      this.activePiece.rotionIndex =
        this.activePiece.rotionIndex > 0 ? this.activePiece.rotionIndex - 1 : 3;
    }
    return this.activePiece.blocks;
  */

    this.rotateBlocks();

    if (this.hasCollision()) {
      this.rotateBlocks(false);
    }
  }

  rotateBlocks(clocwise = true) {
    const blocks = this.activePiece.blocks;
    const length = blocks.length;
    const x = Math.floor(length / 2);
    const y = length - 1;

    for (let i = 0; i < x; i++) {
      for (let j = i; j < y - i; j++) {
        const temp = blocks[i][j];

        if (clocwise) {
          blocks[i][j] = blocks[y - j][i];
          blocks[y - j][i] = blocks[y - i][y - j];
          blocks[y - i][y - j] = blocks[j][y - i];
          blocks[j][y - i] = temp;
        } else {
          blocks[i][j] = blocks[j][y - i];
          blocks[j][y - i] = blocks[y - i][y - j];
          blocks[y - i][y - j] = blocks[y - j][i];
          blocks[y - j][i] = temp;
        }
      }
    }
  }

  hasCollision() {
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (
          blocks[y][x] &&
          (this.playField[pieceY + y] === undefined ||
            this.playField[pieceY + y][pieceX + x] === undefined ||
            this.playField[pieceY + y][pieceX + x])
        ) {
          return true;
        }
      }
    }

    return false;
  }

  lockPiece() {
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          this.playField[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }
    }
  }

  clearLines() {
    const rows = 20;
    const columns = 10;
    let lines = [];

    for (let y = rows - 1; y >= 0; y--) {
      let numberOfBlocks = 0;

      for (let x = 0; x < columns; x++) {
        if (this.playField[y][x]) {
          numberOfBlocks += 1;
        }
      }

      if (numberOfBlocks === 0) {
        break;
      } else if (numberOfBlocks < columns) {
        continue;
      } else if (numberOfBlocks === columns) {
        lines.unshift(y);
      }
    }
    console.log(lines);
  }

  updatePieces() {
    this.activePiece = this.nextPiece;
    this.nextPiece = this.createPiece();
  }
}
