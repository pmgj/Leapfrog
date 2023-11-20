import CellState from "../CellState.js";

export default class FourThreeTwoOnePoints {
    constructor(c) {
        this.game = c;
    }
    updateScore(piece) {
        let points = Object.keys(CellState).indexOf(piece) + 1;
        this.game.scores[this.game.getTurn()] += points;
    }
}