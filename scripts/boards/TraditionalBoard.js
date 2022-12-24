import CellState from "../CellState.js";
import Board from "./Board.js";

export default class TraditionalBoard extends Board {
    createBoard(rows, cols) {
        let matrix = Array(rows).fill().map(() => Array(cols).fill(CellState.PIECE1));
        let i = this.getRandomInt(0, rows);
        let j = this.getRandomInt(0, cols);
        matrix[i][j] = CellState.EMPTY;
        return matrix;
    }
}