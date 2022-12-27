import CellState from "../CellState.js";
import Player from "../Player.js";
import Winner from "../Winner.js";

export default class HighestScore {
    constructor(c) {
        this.game = c;
    }
    condition() {
        if (this.game.canPlay(CellState.PIECE1)) {
            return Winner.NONE;
        }
        if (this.game.canPlay(CellState.PIECE2)) {
            return Winner.NONE;
        }
        if (this.game.canPlay(CellState.PIECE3)) {
            return Winner.NONE;
        }
        if (this.game.canPlay(CellState.PIECE4)) {
            return Winner.NONE;
        }
        let p1 = this.game.scores[Player.PLAYER1];
        let p2 = this.game.scores[Player.PLAYER2];
        if (p1 > p2) {
            return Winner.PLAYER1;
        }
        if (p1 < p2) {
            return Winner.PLAYER2;
        }
        if (p1 === p2) {
            return Winner.DRAW;
        }
    }
}