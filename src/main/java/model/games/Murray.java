package model.games;

import model.LeapFrog;
import model.boards.MurrayBoard;

public class Murray extends LeapFrog {
    public Murray() {
        super("Murray");
    }

    public void initialize(int rows, int cols) {
        super.initialize(rows, cols);
        this.board = new MurrayBoard().createBoard(rows, cols);
    }
}
