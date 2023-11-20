import CellState from "../CellState.js";
import Board from "./Board.js";

export default class MurrayBoard extends Board {
    createBoard(rows, cols) {
        let matrix = Array(rows).fill().map(() => Array(cols).fill(CellState.EMPTY));
        let size = rows * cols;
        let p1 = Math.ceil(size * 0.4);
        let p2 = Math.ceil(size * 0.3);
        let p3 = Math.ceil(size * 0.2);
        let p4 = size - p1 - p2 - p3;
        let sizes = [p1, p2, p3, p4];
        let data = [];
        for (let i = 0; i < sizes.length; i++) {
            for (let j = 0; j < sizes[i]; j++) {
                data.push(Object.keys(CellState)[i]);
            }
        }
        this.shuffle(data);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                matrix[i][j] = data.shift();
            }
        }
        let i = this.getRandomInt(0, rows);
        let j = this.getRandomInt(0, cols);
        matrix[i][j] = CellState.EMPTY;
        return matrix;
    }
}