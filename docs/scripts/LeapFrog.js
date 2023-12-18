import CellState from "./CellState.js";
import Player from "./Player.js";
import Cell from "./Cell.js";

export default class LeapFrog {
    #ROWS
    #COLS
    #turn
    #scores
    #name
    constructor(name) {
        this.#name = name;
        this.board = null;
        this.possibleMoves = null;
        this.endOfGame = null;
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
        if (path.some(c => !this.onBoard(c))) {
            throw new Error("Path is invalid.");
        }
        let pm = this.possibleMoves.compute(beginCell);
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
            this.updateScore.compute(capturedPiece);
        }
        this.#turn = this.#turn === Player.PLAYER1 ? Player.PLAYER2 : Player.PLAYER1;
        return this.endOfGame.compute();
    }
    #containsSequence(path, move) {
        if (path.length - 1 > move.length) {
            return false;
        }
        return path.slice(1).every((c, i) => c.equals(move[i]));
    }
    canPlay(player) {
        for (let i = 0; i < this.#ROWS; i++) {
            for (let j = 0; j < this.#COLS; j++) {
                let piece = this.board[i][j];
                if (piece === player) {
                    let pm = this.possibleMoves.compute(new Cell(i, j));
                    if (pm.length > 0) {
                        return true;
                    }
                }
            }
        }
        return false;
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
    onBoard({ x, y }) {
        let inLimit = (value, limit) => value >= 0 && value < limit;
        return inLimit(x, this.#ROWS) && inLimit(y, this.#COLS);
    }
    toString() {
        return this.#name;
    }
}