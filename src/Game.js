/**
 * Created by nguyenminhthuong on 15/11/18.
 */
import readlineSync from 'readline-sync';
import Board from './Board';
import { SEED, GAME_STATE } from './constants';

class Player {
  constructor(name, seed) {
    this.name = name;
    this.seed = seed;
  }
}

export default class Game {
  constructor() {
    this.currPlayer = null;
    this.state = GAME_STATE.PLAYING;
  }

  start() {
    let isValidSize = false;
    let size;
    while(!isValidSize) {
      size = readlineSync.question('Enter N to play board NxN (N >=3):');
      isValidSize = size >= 3;
    }
    const board = new Board(size);

    const name1 = readlineSync.question('Enter name for Player 1: ');
    const player1 = new Player(name1, SEED.CROSS);

    const name2 = readlineSync.question('Enter name for Player 2: ');
    const player2 = new Player(name2, SEED.DOUGHT);

    board.display();

    this.currPlayer = player1;

    while(this.state === GAME_STATE.PLAYING) {
      let isValidMove = false;
      while(!isValidMove) {
        const moveIndex = readlineSync.question(`${this.currPlayer.name}, choose a box to place an ${this.currPlayer.seed} onto: `);
        isValidMove = board.checkAndUpdate(moveIndex, this.currPlayer.seed);
      }

      board.display();

      if(board.hasWon()) {
        this.state = GAME_STATE.END;
        console.log(`Congratulations, ${this.currPlayer.name}. You have won!`);
      } else if(board.isDraw()) {
        this.state = GAME_STATE.END;
        console.log('Its a draw.');
      }

      this.currPlayer = this.currPlayer.seed === SEED.CROSS ? player2 : player1;
    }
  }
}
