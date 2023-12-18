import CellState from "../CellState.js";
import Player from "../Player.js";
import Winner from "../Winner.js";

export default class NoMove {
    constructor(game) {
        this.game = game;
    }
    compute() {
        if (this.game.getTurn() === Player.PLAYER1 && !this.game.canPlay(CellState.PIECE1)) {
            return Winner.PLAYER2;
        }
        if (this.game.getTurn() === Player.PLAYER2 && !this.game.canPlay(CellState.PIECE2)) {
            return Winner.PLAYER1;
        }
        return Winner.NONE;
     }
}