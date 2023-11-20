package model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.BiFunction;

import model.endOfGame.EndOfGameStrategy;

public class LeapFrog {
    private String name;
    private int rows;
    private int cols;
    private Player turn;
    private Map<Player, Integer> scores;
    private CellState[][] board;
    private EndOfGameStrategy endOfGameStrategy;

    public LeapFrog(String name) {
        this.name = name;
    }

    public void initialize(int rows, int cols) {
        this.rows = rows;
        this.cols = cols;
        this.turn = Player.PLAYER1;
        this.scores = Map.of(Player.PLAYER1, 0, Player.PLAYER2, 0);
    }

    public Map<Player, Integer> getScores() {
        return scores;
    }

    public Player getTurn() {
        return turn;
    }

    public CellState[][] getBoard() {
        return board;
    }

    public Winner endOfGame() {
        return this.endOfGameStrategy.condition();
    }

    private boolean containsSequence(List<CellState> path, List<CellState> move) {
        if (path.size() - 1 > move.size()) {
            return false;
        }
        return path.containsAll(move);
    }

    public void setBoard(CellState[][] matrix) {
        this.board = matrix;
        this.rows = this.board.length;
        this.cols = this.board[0].length;
    }

    private boolean onBoard(Cell cell) {
        int x = cell.x(), y = cell.y();
        BiFunction<Integer, Integer, Boolean> inLimit = (value, limit) -> value >= 0 && value < limit;
        return inLimit.apply(x, this.rows) && inLimit.apply(y, this.cols);
    }

    @Override
    public String toString() {
        return this.name;
    }

    private List<List<Cell>> possibleMoves(Cell beginCell) {
        List<Cell> visitedCells = new ArrayList<>();
        return this.possibleMoves(beginCell, visitedCells);
    }

    private List<List<Cell>> possibleMoves(Cell beginCell, List<Cell> visitedCells) {
        List<List<Cell>> coords = new ArrayList<>();
        int i = beginCell.x(), j = beginCell.y();
        List<InnerObj> cells = List.of(new InnerObj(new Cell(i - 1, j), new Cell(i - 2, j)),
                new InnerObj(new Cell(i, j - 1), new Cell(i, j - 2)),
                new InnerObj(new Cell(i, j + 1), new Cell(i, j + 2)),
                new InnerObj(new Cell(i + 1, j), new Cell(i + 2, j)));
        for (InnerObj obj : cells) {
            Cell op = obj.op(), empty = obj.empty();
            int c = op.x(), d = op.y();
            int a = empty.x(), b = empty.y();
            if (this.onBoard(op) && this.onBoard(empty) && this.board[c][d] != CellState.EMPTY
                    && this.board[a][b] == CellState.EMPTY && !visitedCells.contains(empty)) {
                visitedCells.add(beginCell);
                List<List<Cell>> p = this.possibleMoves(empty, visitedCells);
                if (p.size() != 0) {
                    for (List<Cell> item : p) {
                        List<Cell> temp = new ArrayList<>();
                        temp.add(empty);
                        temp.addAll(item);
                        coords.add(temp);
                    }
                } else {
                    List<Cell> temp = new ArrayList<>();
                    temp.add(empty);
                    coords.add(temp);
                }
                visitedCells.remove(visitedCells.size() - 1);
            }
        }
        return coords;
    }

    private record InnerObj(Cell op, Cell empty) {
    }
}
