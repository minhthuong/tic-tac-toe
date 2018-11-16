# Tic Tac Toe NxN

This is a tic tac toe game with NxN board for 2 players. The game ends if either player gets 3​ in a row in any direction.

## Requirements

- node v8.0.0
- npm v5.0.0

## How to play

1. Install dependencies
   - npm install
2. Start game
   - npm run start-game
3. Follow the instructions and enjoy :)

## How does the won condition checked
- After the current user puts his seed, `hasWon` will check for the surrounding cells within radius of 2 from the current cell 
if there are 3 same seeds in a row in 4 directions(vertical, horizontal, diagonal, anti-diagonal). If yes, the current player wins.
- `isDraw` is also checked by keeping track of the number of moves to compare with the total cells of the board. If they are equal, it's a draw.

## Unit Test

Mocha and Chai are used for unit testing. These are the commands to run/watch the test:
- npm run test
- npm run watch-test
