export default class SumNumberOfPieces {
    constructor(c) {
        this.game = c;
    }
    updateScore() {
        this.game.scores[this.game.getTurn()]++;
    }
}