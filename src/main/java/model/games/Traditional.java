package model.games;

import model.LeapFrog;
import model.boards.TraditionalBoard;

public class Traditional extends LeapFrog {
    public Traditional() {
        super("Traditional");
    }

    public void initialize(int rows, int cols) {
        super.initialize(rows, cols);
        this.board = new TraditionalBoard().createBoard(rows, cols);
    }
}
