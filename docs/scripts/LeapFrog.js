import CellState from "./CellState.js";
import Player from "./Player.js";
import Cell from "./Cell.js";
import Winner from "./Winner.js";

export default class LeapFrog {
    #ROWS
    #COLS
    #turn
    #scores
    #name
    constructor(name) {
        this.#name = name;
    }
    initialize(rows, cols) {
        this.#ROWS = rows;
        this.#COLS = cols;
        this.#turn = Player.PLAYER1;
        this.#scores = new Map([[Player.PLAYER1, 0], [Player.PLAYER2, 0]]);
    }
    move(path) {
        let beginCell = path[0];
        let endCell = path[path.length - 1];
        if (path.some(c => !this.#onBoard(c))) {
            throw new Error("Path is invalid.");
        }
        let pm = this.#possibleMoves(beginCell);
        if (!pm.some(p => this.#containsSequence(path, p))) {
            throw new Error("Invalid move.");
        }
        this.board[endCell.x][endCell.y] = this.board[beginCell.x][beginCell.y];
        this.board[beginCell.x][beginCell.y] = CellState.EMPTY;
        for (let i = 1; i < path.length; i++) {
            const { x: or, y: oc } = path[i - 1];
            const { x: dr, y: dc } = path[i];
            let capturedPiece = this.board[(or + dr) / 2][(oc + dc) / 2];
            this.board[(or + dr) / 2][(oc + dc) / 2] = CellState.EMPTY;
            this.#updateScore(capturedPiece);
        }
        this.#turn = this.#turn === Player.PLAYER1 ? Player.PLAYER2 : Player.PLAYER1;
        return this.#endOfGame();
    }
    #updateScore(capturedPiece) {
        let points = Object.keys(CellState).indexOf(capturedPiece) + 1;
        this.#scores.set(this.#turn, this.#scores.get(this.#turn) + points);
    }
    #containsSequence(path, move) {
        if (path.length - 1 > move.length) {
            return false;
        }
        return path.slice(1).every((c, i) => c.equals(move[i]));
    }
    #endOfGame() {
        for (let cs of Object.keys(CellState).slice(0, -1)) {
            if (this.#canPlay(cs)) {
                return Winner.NONE;
            }
        }
        let p1 = this.#scores.get(Player.PLAYER1);
        let p2 = this.#scores.get(Player.PLAYER2);
        if (p1 > p2) {
            return Winner.PLAYER1;
        }
        if (p1 < p2) {
            return Winner.PLAYER2;
        }
        return Winner.DRAW;
    }
    #canPlay(player) {
        for (let i = 0; i < this.#ROWS; i++) {
            for (let j = 0; j < this.#COLS; j++) {
                let piece = this.board[i][j];
                if (piece === player) {
                    let pm = this.#possibleMoves(new Cell(i, j));
                    if (pm.length > 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    #possibleMoves(beginCell, visitedCells = []) {
        let coords = [];
        let { x: i, y: j } = beginCell;
        let cells = [{ op: new Cell(i - 1, j), empty: new Cell(i - 2, j) }, { op: new Cell(i, j - 1), empty: new Cell(i, j - 2) }, { op: new Cell(i, j + 1), empty: new Cell(i, j + 2) }, { op: new Cell(i + 1, j), empty: new Cell(i + 2, j) }];
        for (let obj of cells) {
            let { op, empty } = obj;
            let { x: c, y: d } = op;
            let { x: a, y: b } = empty;
            if (this.#onBoard(op) && this.#onBoard(empty) && this.board[c][d] !== CellState.EMPTY && this.board[a][b] === CellState.EMPTY && !visitedCells.find(c => c.equals(empty))) {
                visitedCells.push(beginCell);
                let p = this.#possibleMoves(empty, visitedCells);
                if (p.length !== 0) {
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
    getBoard() {
        return this.board;
    }
    getTurn() {
        return this.#turn;
    }
    getScores() {
        return this.#scores;
    }
    #onBoard({ x, y }) {
        let inLimit = (value, limit) => value >= 0 && value < limit;
        return inLimit(x, this.#ROWS) && inLimit(y, this.#COLS);
    }
    toString() {
        return this.#name;
    }
}