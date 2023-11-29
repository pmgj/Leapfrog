package model.boards;

import model.CellState;

public class MurrayBoard extends Board {
    public CellState[][] createBoard(int rows, int cols) {
        CellState[][] matrix = new CellState[rows][cols];
        int size = rows * cols;
        double p1 = Math.ceil(size * 0.4);
        double p2 = Math.ceil(size * 0.3);
        double p3 = Math.ceil(size * 0.2);
        double p4 = size - p1 - p2 - p3;
        double[] sizes = new double[] { p1, p2, p3, p4 };
        CellState[] data = new CellState[size];
        for (int i = 0, k = 0; i < sizes.length; i++) {
            for (int j = 0; j < sizes[i]; j++) {
                data[k++] = CellState.values()[i];
            }
        }
        this.shuffle(data);
        for (int i = 0, k = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                matrix[i][j] = data[k++];
            }
        }
        int i = this.getRandomInt(0, rows);
        int j = this.getRandomInt(0, cols);
        matrix[i][j] = CellState.EMPTY;
        return matrix;
    }
}
