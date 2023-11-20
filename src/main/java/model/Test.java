package model;

import java.util.Arrays;
import java.util.Scanner;

import model.games.Traditional;

public class Test {
    public static void main(String[] args) {
        LeapFrog game = new Traditional();
        game.initialize(6, 6);
        Scanner sc = new Scanner(System.in);
        CellState[][] board = game.getBoard();
        for (CellState[] cellStates : board) {
            System.out.println(Arrays.toString(cellStates));
        }
        System.out.print("Selecionar coordenadas da peça: ");
        int row = sc.nextInt();
        int col = sc.nextInt();
        System.out.println(row);
        System.out.println(col);
    }
}
