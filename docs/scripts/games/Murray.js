import LeapFrog from "../LeapFrog.js";
import MurrayBoard from "../boards/MurrayBoard.js";

export default class Murray extends LeapFrog {
    constructor() {
        super("Murray");
    }
    initialize(rows, cols) {
        super.initialize(rows, cols);
        this.board = new MurrayBoard().createBoard(rows, cols);
    }
}