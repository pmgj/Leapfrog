import CellState from "../CellState.js";

export default class IncreaseByCapture {
    constructor(game) {
        this.game = game;
        this.scores = this.game.getScores();
    }
    compute(capturedPiece) {
        let points = Object.keys(CellState).indexOf(capturedPiece) + 1;
        this.scores.set(this.game.getTurn(), this.scores.get(this.game.getTurn()) + points);
    }
}