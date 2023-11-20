import TraditionalBoard from "../boards/TraditionalBoard.js";
import LeapFrog from "../LeapFrog.js";
import SumNumberOfPieces from "../updateScores/SumNumberOfPieces.js";
import HighestPiece from "../endOfGame/HighestPiece.js";

export default class Traditional extends LeapFrog {
    constructor() {
        super("Traditional");
    }
    initialize(rows, cols) {
        super.initialize(rows, cols);
        this.board = new TraditionalBoard().createBoard(rows, cols);
        this.updateScoresStrategy = new SumNumberOfPieces(this);
        this.endOfGameStrategy = new HighestPiece(this);
    }
}