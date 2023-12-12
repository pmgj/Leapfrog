import CellState from "../CellState.js";
import Board from "./Board.js";

export default class KonaneBoard extends Board {
    createBoard(rows, cols) {
        let matrix = Array(rows).fill().map(() => Array(cols).fill(CellState.EMPTY));
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                matrix[i][j] = ((i % 2 !== 0 && j % 2 === 0) || (i % 2 === 0 && j % 2 !== 0)) ? CellState.PIECE1 : CellState.PIECE2;
            }
        }
        matrix[Math.floor(rows / 2)][Math.floor(rows / 2)] = CellState.EMPTY;
        matrix[Math.floor(rows / 2)][Math.floor(rows / 2) - 1] = CellState.EMPTY;
        return matrix;
    }
}