import TraditionalBoard from "../boards/TraditionalBoard.js";
import LeapFrog from "../LeapFrog.js";

export default class Traditional extends LeapFrog {
    constructor() {
        super("Traditional");
    }
    initialize(rows, cols) {
        super.initialize(rows, cols);
        this.board = new TraditionalBoard().createBoard(rows, cols);
    }
}