package model.boards;

import model.CellState;

public class TraditionalBoard extends Board {
    public CellState[][] createBoard(int rows, int cols) {
        CellState[][] matrix = new CellState[rows][cols];
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                matrix[i][j] = CellState.PIECE1;
            }
        }
        int i = this.getRandomInt(0, rows);
        int j = this.getRandomInt(0, cols);
        matrix[i][j] = CellState.EMPTY;
        return matrix;
    }
}
