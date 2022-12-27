import CellState from "./CellState.js";
import Player from "./Player.js";
import Cell from "./Cell.js";

export default class LeapFrog {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.turn = Player.PLAYER1;
        this.scores = { "PLAYER1": 0, "PLAYER2": 0 };
    }
    move(path) {
        let beginCell = path[0];
        let endCell = path[path.length - 1];
        if (path.some(c => !(c instanceof Cell) || !this.onBoard(c))) {
            throw new Error("Path is invalid.");
        }
        let pm = this.possibleMoves(beginCell);
        if (!pm.some(p => this.containsSequence(path, p))) {
            throw new Error("Invalid move.");
        }
        this.board[endCell.x][endCell.y] = this.board[beginCell.x][beginCell.y];
        this.board[beginCell.x][beginCell.y] = CellState.EMPTY;
        for (let i = 1; i < path.length; i++) {
            const { x: or, y: oc } = path[i - 1];
            const { x: dr, y: dc } = path[i];
            let capturedPiece = this.board[(or + dr) / 2][(oc + dc) / 2];
            this.board[(or + dr) / 2][(oc + dc) / 2] = CellState.EMPTY;
            this.updateScoresStrategy.updateScore(capturedPiece);
        }
        this.turn = this.turn === Player.PLAYER1 ? Player.PLAYER2 : Player.PLAYER1;
        return this.endOfGame();
    }
    containsSequence(path, move) {
        if(path.length - 1 > move.length) {
            return false;
        }
        return path.slice(1).every((c, i) => c.equals(move[i]));
    }
    endOfGame() {
        return this.endOfGameStrategy.condition();
    }
    canPlay(player) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let piece = this.board[i][j];
                if (piece === player) {
                    let pm = this.possibleMoves(new Cell(i, j));
                    if (pm.length > 0) {
                        return true;
                    }
                }
            }
        }
        return false;
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
    getScores() {
        return this.scores;
    }
    onBoard({ x, y }) {
        let inLimit = (value, limit) => value >= 0 && value < limit;
        return inLimit(x, this.rows) && inLimit(y, this.cols);
    }
}