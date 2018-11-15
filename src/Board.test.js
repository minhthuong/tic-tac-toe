/**
 * Created by nguyenminhthuong on 15/11/18.
 */

import { expect } from 'chai';
import Board from './Board';

describe('Board', () => {
  describe('init', () => {
        it('should initialize correct board', () => {
            const board = new Board(3);
            expect(board.board).to.deep.equal([['1','2','3'], ['4','5','6'], ['7','8','9']]);
        });
    });

  describe('checkAndUpdate', () => {
      it('should update the board for valid move', () => {
          const board = new Board(3);
          expect(board.checkAndUpdate(5, 'X')).to.equal(true);
          expect(board.board).to.deep.equal([['1','2','3'], ['4','X','6'], ['7','8','9']]);
          expect(board.checkAndUpdate(6, 'O')).to.equal(true);
          expect(board.board).to.deep.equal([['1','2','3'], ['4','X','O'], ['7','8','9']]);
      });
      it('should not update the board for invalid move', () => {
          const board = new Board(3);
          expect(board.checkAndUpdate(5, 'X')).to.equal(true);
          expect(board.checkAndUpdate(5, 'O')).to.equal(false);
          expect(board.checkAndUpdate(-2, 'O')).to.equal(false);
          expect(board.checkAndUpdate('invalid', 'O')).to.equal(false);
          expect(board.board).to.deep.equal([['1','2','3'], ['4','X','6'], ['7','8','9']]);
      });
  });

  describe('hasWonRow', () => {
        it('should return true when there are 3 same seeds in a row', () => {
           const board = new Board(4);
           board.checkAndUpdate(6, 'X');
           board.checkAndUpdate(7, 'X');
           board.checkAndUpdate(5, 'X');
           expect(board.hasWonRow('X')).to.equal(true);
        });
  });

  describe('hasWonCol', () => {
        it('should return true when there are 3 same seeds in a col', () => {
            const board = new Board(4);
            board.checkAndUpdate(8, 'X');
            board.checkAndUpdate(16, 'X');
            board.checkAndUpdate(12, 'X');
            expect(board.hasWonCol('X')).to.equal(true);
        });
    });

  describe('hasWonAntiDiagonal', () => {
        it('should return true when there are 3 same seeds in a diagonal', () => {
            const board = new Board(4);
            board.checkAndUpdate(13, 'X');
            board.checkAndUpdate(10, 'X');
            board.checkAndUpdate(7, 'X');
            expect(board.hasWonAntiDiagonal('X')).to.equal(true);
        });
    });

  describe('hasWonDiagonal', () => {
        it('should return true when there are 3 same seeds in a diagonal', () => {
            const board = new Board(4);
            board.checkAndUpdate(2, 'X');
            board.checkAndUpdate(7, 'X');
            board.checkAndUpdate(12, 'X');
            expect(board.hasWonDiagonal('X')).to.equal(true);
        });
    });

  describe('isDraw', () => {
    it('should return true when the board is full', () => {
        const board = new Board(2);
        board.checkAndUpdate(1, 'X');
        board.checkAndUpdate(2, 'O');
        board.checkAndUpdate(3, 'X');
        board.checkAndUpdate(4, 'O');
        expect(board.isDraw()).to.equal(true);
    });
 });

  describe('getCurrSeed', () => {
      it('should return correct current seed', () => {
          const board = new Board(3);
          board.checkAndUpdate(3, 'X');
          expect(board.getCurrSeed()).to.equal('X');
          board.checkAndUpdate(4, 'O');
          expect(board.getCurrSeed()).to.equal('O');
      });
  });
});
