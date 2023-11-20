import CellState from "../CellState.js";
import Player from "../Player.js";
import Winner from "../Winner.js";

export default class HighestScore {
    constructor(c) {
        this.game = c;
    }
    condition() {
        for(let cs of Object.keys(CellState).slice(0, -1)) {
            if (this.game.canPlay(cs)) {
                return Winner.NONE;
            }    
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