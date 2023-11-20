package model.boards;

import java.util.Random;

import model.CellState;

public abstract class Board {
    private Random r = new Random();

    public abstract CellState[][] createBoard(int rows, int cols);

    protected CellState[] shuffle(CellState[] array) {
        int currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = (int) Math.floor(r.nextDouble() * currentIndex);
            currentIndex--;
            CellState temp;
            temp = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temp;
        }
        return array;
    }

    protected int getRandomInt(int min, int max) {
        return (int) Math.floor(r.nextDouble() * (max - min) + min);
    }
}