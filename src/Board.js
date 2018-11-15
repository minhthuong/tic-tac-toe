/**
 * Created by nguyenminhthuong on 15/11/18.
 */
import { SEED } from './constants';

export default class Board {
  constructor(n) {
    this.n = n;
    this.board = [];
    this.currRow = -1;
    this.currCol = -1;
    this.moveCount = 0;
    this.init();
  }

  init() {
    let count = 1;
    for(let i = 0; i < this.n; i++) {
      let row = [];
      for(let j = 0; j < this.n; j++) {
        row.push(count.toString());
        count ++;
      }
      this.board.push(row);
    }
  }

  display() {
    for(let i = 0; i < this.n; i++) {
      for(let j = 0; j < this.n; j++) {
        process.stdout.write(this.board[i][j].padEnd((this.n * this.n).toString().length) +' | ');
      }
      process.stdout.write('\n');
      if(i < this.n - 1) {
          for(let col = 0; col < this.n; col++){
            process.stdout.write('------');
          }
      }
      process.stdout.write('\n');
    }
  }

  checkAndUpdate(index, seed) {
    if(index > this.n * this.n || index <= 0 || !parseInt(index)) {
      return false;
    }
    this.currRow = Math.floor((index - 1) / this.n);
    this.currCol = ((index - 1) % this.n);
    if([SEED.CROSS, SEED.DOUGHT].includes(this.board[this.currRow][this.currCol])) {
      return false;
    } else {
      this.board[this.currRow][this.currCol] = seed;
      this.moveCount ++;
    }
    return true;
  }

  hasWonCol(seed) {
    return (this.currRow < this.n - 1  && this.currRow > 0 // with 2 cells on sides
    && this.board[this.currRow - 1][this.currCol] === seed
    && this.board[this.currRow + 1][this.currCol] === seed

    ||this.currRow < this.n - 2
    && this.board[this.currRow + 1][this.currCol] === seed // with 2 next cells down
    && this.board[this.currRow + 2][this.currCol] === seed

    ||this.currRow > 1
    && this.board[this.currRow - 1][this.currCol] === seed // with 2 next cells up
    && this.board[this.currRow - 2][this.currCol] === seed);
  }
  
  hasWonRow(seed){
    return (this.currCol < this.n - 1 && this.currCol > 0 // with 2 cells on sides
    && this.board[this.currRow][this.currCol - 1] === seed
    && this.board[this.currRow][this.currCol + 1] === seed

    ||this.currCol < this.n - 2
    && this.board[this.currRow][this.currCol + 1] === seed // with 2 next cells on the right
    && this.board[this.currRow][this.currCol + 2] === seed

    ||this.currCol > 1
    && this.board[this.currRow][this.currCol - 1] === seed // with 2 next cells on the left
    && this.board[this.currRow][this.currCol - 2] === seed);

  }

  hasWonDiagonal(seed){
    return (this.currRow < this.n - 1 && this.currRow > 0 && this.currCol < this.n - 1 && this.currCol > 0
    && this.board[this.currRow + 1][this.currCol + 1] === seed // with 2 cells on sides
    && this.board[this.currRow - 1][this.currCol - 1] === seed

    || this.currRow < this.n - 2 && this.currCol < this.n - 2
    && this.board[this.currRow + 1][this.currCol + 1] === seed // with 2 next cells down
    && this.board[this.currRow + 2][this.currCol + 2] === seed

    || this.currRow > 1 && this.currCol > 1
    && this.board[this.currRow - 1][this.currCol - 1] === seed // with 2 next cells up
    && this.board[this.currRow - 2][this.currCol - 2] === seed);

  }

  hasWonAntiDiagonal(seed){
    return (this.currRow < this.n - 1 && this.currRow > 0 && this.currCol < this.n - 1 && this.currCol > 0
    && this.board[this.currRow - 1][this.currCol + 1] === seed // with 2 cells on sides
    && this.board[this.currRow + 1][this.currCol - 1] === seed

    || this.currRow < this.n - 2 && this.currCol > 1
    && this.board[this.currRow + 1][this.currCol - 1] === seed // with 2 cells down
    && this.board[this.currRow + 2][this.currCol - 2] === seed

    || this.currRow > 1 && this.currCol < this.n - 2
    && this.board[this.currRow - 1][this.currCol + 1] === seed // with 2 cells up
    && this.board[this.currRow - 2][this.currCol + 2] === seed);

  }  
  
  hasWon() {
    const seed = this.getCurrSeed();
    return this.hasWonRow(seed)
        || this.hasWonCol(seed)
        || this.hasWonDiagonal(seed)
        || this.hasWonAntiDiagonal(seed);
  }

  getCurrSeed() {
    return this.board[this.currRow][this.currCol];
  }
  
  isDraw() {
    return this.moveCount === this.n * this.n;
  }
}
