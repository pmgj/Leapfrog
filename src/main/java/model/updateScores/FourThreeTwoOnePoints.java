package model.updateScores;

import model.CellState;
import model.LeapFrog;

public class FourThreeTwoOnePoints implements UpdateScores {
    private LeapFrog game;

    public FourThreeTwoOnePoints(LeapFrog c) {
        this.game = c;
    }

    public void updateScore(CellState piece) {
        int points = piece.ordinal() + 1;
        int old = this.game.getScores().get(this.game.getTurn());
        this.game.getScores().put(this.game.getTurn(), old + points);
    }
}
