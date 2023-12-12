import LeapFrog from "../LeapFrog.js";
import KonaneBoard from "../boards/KonaneBoard.js";

export default class Konane extends LeapFrog {
    constructor() {
        super("Konane");
    }
    initialize(rows, cols) {
        super.initialize(rows, cols);
        this.board = new KonaneBoard().createBoard(rows, cols);
    }
}