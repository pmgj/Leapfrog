package model.endOfGame;

import model.CellState;
import model.LeapFrog;
import model.Player;
import model.Winner;

public class HighestPiece implements EndOfGameStrategy {
    private LeapFrog game;

    public HighestPiece(LeapFrog c) {
        this.game = c;
    }

    public Winner condition() {
        if (this.game.canPlay(CellState.PIECE1)) {
            return Winner.NONE;
        }
        int p1 = this.game.getScores().get(Player.PLAYER1);
        int p2 = this.game.getScores().get(Player.PLAYER2);
        if (p1 > p2) {
            return Winner.PLAYER1;
        }
        if (p1 < p2) {
            return Winner.PLAYER2;
        }
        if (p1 == p2) {
            return Winner.DRAW;
        }
    }
}
