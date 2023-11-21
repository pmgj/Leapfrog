package model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.function.Consumer;

import model.games.Murray;
import model.games.Traditional;

public class Test {

    public static final String ANSI_RESET = "\u001B[0m";
    public static final String ANSI_BLUE = "\u001B[34m";
    public static final String ANSI_RED = "\u001B[31m";
    public static final String ANSI_GREEN = "\u001B[32m";
    public static final String ANSI_ORANGE = "\u001B[33m";

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        LeapFrog game = null;
        int option;
        do {
            System.out.print("Qual regra você quer jogar (0 - Tradicional, 1 - Murray)? ");
            option = sc.nextInt();
            switch (option) {
                case 0:
                    game = new Traditional();
                    break;
                case 1:
                    game = new Murray();
                    break;
                default:
                    break;
            }
        } while (option != 0 && option != 1);
        game.initialize(6, 6);
        Winner winner = Winner.NONE;
        Consumer<LeapFrog> printBoard = (g) -> {
            CellState[][] board = g.getBoard();
            for (int i = 0; i < board.length; i++) {
                if (i == 0) {
                    System.out.print(String.format("%3s ", " "));
                    for (int j = 0; j < board[i].length; j++) {
                        System.out.print(String.format("%6d ", j));
                    }
                    System.out.println();
                }
                CellState[] cellStates = board[i];
                System.out.print(String.format("%3d ", i));
                for (CellState cs : cellStates) {
                    Map<CellState, String> colors = Map.of(CellState.PIECE1, ANSI_BLUE, CellState.PIECE2, ANSI_RED,
                            CellState.PIECE3, ANSI_GREEN, CellState.PIECE4, ANSI_ORANGE);
                    String color = colors.get(cs), value = (color == null) ? " " : color + cs + ANSI_RESET;
                    System.out.print(String.format("%6s ", value));
                }
                System.out.println();
            }
        };
        Consumer<LeapFrog> showScores = (g) -> {
            Map<Player, Integer> scores = g.getScores();
            System.out.println("Pontuação do Player 1: " + scores.get(Player.PLAYER1));
            System.out.println("Pontuação do Player 2: " + scores.get(Player.PLAYER2));
        };
        do {
            printBoard.accept(game);
            System.out.println("Vez de jogar: " + game.getTurn());
            List<Cell> path = new ArrayList<>();
            while (true) {
                System.out.print("Selecionar coordenadas da peça e do caminho (-1 para sair): ");
                int row = sc.nextInt();
                int col = sc.nextInt();
                if (row < 0 || col < 0)
                    break;
                path.add(new Cell(row, col));
            }
            try {
                winner = game.move(path);
                switch (winner) {
                    case DRAW:
                        printBoard.accept(game);
                        System.out.println("Draw!");
                        break;
                    case PLAYER1:
                        printBoard.accept(game);
                        System.out.println("Player 1 wins!");
                        break;
                    case PLAYER2:
                        printBoard.accept(game);
                        System.out.println("Player 2 wins!");
                        break;
                    default:
                        break;
                }
                showScores.accept(game);
            } catch (Exception ex) {
                System.out.println("Erro: " + ex.getMessage());
            }
        } while (winner == Winner.NONE);
        sc.close();
    }
}
