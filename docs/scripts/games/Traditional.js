import TraditionalBoard from "../boards/TraditionalBoard.js";
import NoMoveHigherScore from "../endOfGame/NoMoveHigherScore.js";
import LeapFrog from "../LeapFrog.js";
import OrthogonalMoves from "../possibleMoves/OrthogonalMoves.js";
import IncreaseByCapture from "../updateScore/IncreaseByCapture.js";

export default class Traditional extends LeapFrog {
    constructor() {
        super("Traditional");
    }
    initialize(rows, cols) {
        super.initialize(rows, cols);
        this.board = new TraditionalBoard().createBoard(rows, cols);
        this.possibleMoves = new OrthogonalMoves(this);
        this.updateScore = new IncreaseByCapture();
        this.endOfGame = new NoMoveHigherScore(this);
    }
}