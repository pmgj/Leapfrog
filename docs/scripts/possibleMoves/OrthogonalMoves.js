import Cell from "../Cell.js";
import CellState from "../CellState.js";

export default class OrthogonalMoves {
    constructor(game) {
        this.game = game;
        this.board = this.game.getBoard();
    }
    compute(beginCell, visitedCells = []) {
        let coords = [];
        let { x: i, y: j } = beginCell;
        let cells = [{ op: new Cell(i - 1, j), empty: new Cell(i - 2, j) }, { op: new Cell(i, j - 1), empty: new Cell(i, j - 2) }, { op: new Cell(i, j + 1), empty: new Cell(i, j + 2) }, { op: new Cell(i + 1, j), empty: new Cell(i + 2, j) }];
        for (let obj of cells) {
            let { op, empty } = obj;
            let { x: c, y: d } = op;
            let { x: a, y: b } = empty;
            if (this.game.onBoard(op) && this.game.onBoard(empty) && this.board[c][d] !== CellState.EMPTY && this.board[a][b] === CellState.EMPTY && !visitedCells.find(c => c.equals(empty))) {
                visitedCells.push(beginCell);
                let p = this.compute(empty, visitedCells);
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
}