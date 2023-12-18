import LeapFrog from "../LeapFrog.js";
import MurrayBoard from "../boards/MurrayBoard.js";
import NoMoveHigherScore from "../endOfGame/NoMoveHigherScore.js";
import OrthogonalMoves from "../possibleMoves/OrthogonalMoves.js";
import IncreaseByCapture from "../updateScore/IncreaseByCapture.js";

export default class Murray extends LeapFrog {
    constructor() {
        super("Murray");
    }
    initialize(rows, cols) {
        super.initialize(rows, cols);
        this.board = new MurrayBoard().createBoard(rows, cols);
        this.possibleMoves = new OrthogonalMoves(this);
        this.updateScore = new IncreaseByCapture(this);
        this.endOfGame = new NoMoveHigherScore(this);
    }
}