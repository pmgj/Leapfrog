package model;

import java.util.Arrays;

import model.boards.Board;
import model.boards.TraditionalBoard;

public class Test {
    public static void main(String[] args) {
        Board b = new TraditionalBoard();
        CellState[][] board = b.createBoard(4, 5);
        for (CellState[] cellStates : board) {
            System.out.println(Arrays.toString(cellStates));
        }
    }
}
