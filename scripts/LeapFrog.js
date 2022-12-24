import CellState from "./CellState.js";
import Player from "./Player.js";
// import MurrayBoard from "./boards/MurrayBoard.js";
import TraditionalBoard from "./boards/TraditionalBoard.js";
import Cell from "./Cell.js";

export default class LeapFrog {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.board = new TraditionalBoard().createBoard(rows, cols);
        this.turn = Player.PLAYER1;
    }
    move(beginCell, endCell) {
        if (!beginCell || !endCell) {
            throw new Error("Origin or destination is undefined.");
        }
        if (beginCell.equals(endCell)) {
            throw new Error("Origin and destination must be different.");
        }
        if (!this.onBoard(beginCell) || !this.onBoard(endCell)) {
            throw new Error("Origin or destination is not on board.");
        }
        let { x: or, y: oc } = beginCell;
        let { x: dr, y: dc } = endCell;
        if (this.board[or][oc] === CellState.EMPTY) {
            throw new Error("Origin must not be empty.");
        }
        if (this.board[dr][dc] !== CellState.EMPTY) {
            throw new Error("Destination must be empty.");
        }
    }
    possibleMoves(beginCell, visitedCells = []) {
        let coords = [];
        let { x: i, y: j } = beginCell;
        let cells = [{ op: new Cell(i - 1, j), empty: new Cell(i - 2, j) }, { op: new Cell(i, j - 1), empty: new Cell(i, j - 2) }, { op: new Cell(i, j + 1), empty: new Cell(i, j + 2) }, { op: new Cell(i + 1, j), empty: new Cell(i + 2, j) }];
        for (let obj of cells) {
            let { op, empty } = obj;
            let { x: c, y: d } = op;
            let { x: a, y: b } = empty;
            if (this.onBoard(op) && this.onBoard(empty) && this.board[c][d] !== CellState.EMPTY && this.board[a][b] === CellState.EMPTY && !visitedCells.find(c => c.equals(empty))) {
                visitedCells.push(beginCell);
                let p = this.possibleMoves(empty, visitedCells);
                if(p.length !== 0) {
                    p.forEach(v => v.unshift(empty));
                    coords.push(...p);
                } else {
                    coords.push([empty]);
                }
                visitedCells.pop();
            }
        }
        return coords;
    }
    setBoard(matrix) {
        this.board = matrix;
        this.rows = this.board.length;
        this.cols = this.board[0].length;
    }
    getBoard() {
        return this.board;
    }
    getTurn() {
        return this.turn;
    }
    onBoard({ x, y }) {
        let inLimit = (value, limit) => value >= 0 && value < limit;
        return inLimit(x, this.rows) && inLimit(y, this.cols);
    }
}