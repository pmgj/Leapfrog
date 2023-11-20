package model.updateScores;

import model.CellState;
import model.LeapFrog;

public class SumNumberOfPieces implements UpdateScores {
    private LeapFrog game;

    public SumNumberOfPieces(LeapFrog c) {
        this.game = c;
    }

    public void updateScore(CellState piece) {
        int old = this.game.getScores().get(this.game.getTurn());
        this.game.getScores().put(this.game.getTurn(), old + 1);
    }
}
