import Cell from "../Cell.js";
import CellState from "../CellState.js";
import Player from "../Player.js";

export default class InLineMoves {
    constructor(game) {
        this.game = game;
        this.board = this.game.getBoard();
    }
    compute(beginCell) {
        let { x: i, y: j } = beginCell;
        if ((this.game.getTurn() === Player.PLAYER1 && this.board[i][j] !== CellState.PIECE1) ||
            (this.game.getTurn() === Player.PLAYER2 && this.board[i][j] !== CellState.PIECE2)) {
            throw new Error("This piece is not from the current player.");
        }
        let coords = [];
        let opponent = this.board[i][j] === CellState.PIECE1 ? CellState.PIECE2 : CellState.PIECE1;
        let cells = [{ stepX: -1, stepY: 0 }, { stepX: 0, stepY: -1 }, { stepX: 0, stepY: 1 }, { stepX: 1, stepY: 0 }];
        for (let obj of cells) {
            let { stepX, stepY } = obj;
            let a = i + 2 * stepX, b = j + 2 * stepY, c = i + stepX, d = j + stepY;
            let op = new Cell(c, d), empty = new Cell(a, b);
            let innerpath = [];
            while (this.game.onBoard(op) && this.game.onBoard(empty) && this.board[c][d] === opponent && this.board[a][b] === CellState.EMPTY) {
                innerpath.push(empty);
                c += 2 * stepX;
                d += 2 * stepY;
                a += 2 * stepX;
                b += 2 * stepY;
                op = new Cell(c, d);
                empty = new Cell(a, b);
            }
            if (innerpath.length > 0) {
                coords.push(innerpath);
            }
        }
        return coords;
    }
}