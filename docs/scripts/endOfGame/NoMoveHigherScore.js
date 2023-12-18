import CellState from "../CellState.js";
import Player from "../Player.js";
import Winner from "../Winner.js";

export default class NoMoveHigherScore {
    constructor(game) {
        this.game = game;
        this.scores = this.game.getScores();
    }
    compute() {
        for (let cs of Object.keys(CellState).slice(0, -1)) {
            if (this.game.canPlay(cs)) {
                return Winner.NONE;
            }
        }
        let p1 = this.scores.get(Player.PLAYER1);
        let p2 = this.scores.get(Player.PLAYER2);
        if (p1 > p2) {
            return Winner.PLAYER1;
        }
        if (p1 < p2) {
            return Winner.PLAYER2;
        }
        return Winner.DRAW;
    }
}