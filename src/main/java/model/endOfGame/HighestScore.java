package model.endOfGame;

import java.util.Arrays;

import model.CellState;
import model.LeapFrog;
import model.Player;
import model.Winner;

public class HighestScore implements EndOfGameStrategy {
    private LeapFrog game;

    public HighestScore(LeapFrog c) {
        this.game = c;
    }

    public Winner condition() {
        CellState[] temp = Arrays.copyOf(CellState.values(), CellState.values().length - 1);
        for (CellState cs : temp) {
            if (this.game.canPlay(cs)) {
                return Winner.NONE;
            }
        }
        int p1 = this.game.getScores().get(Player.PLAYER1);
        int p2 = this.game.getScores().get(Player.PLAYER2);
        if (p1 > p2) {
            return Winner.PLAYER1;
        }
        if (p1 < p2) {
            return Winner.PLAYER2;
        }
        return Winner.DRAW;
    }
}
