import LeapFrog from "../LeapFrog.js";
import KonaneBoard from "../boards/KonaneBoard.js";
import NoMove from "../endOfGame/NoMove.js";
import InLineMoves from "../possibleMoves/InLineMoves.js";
import NoScore from "../updateScore/NoScore.js";

export default class Konane extends LeapFrog {
    constructor() {
        super("Konane");
    }
    initialize(rows, cols) {
        super.initialize(rows, cols);
        this.board = new KonaneBoard().createBoard(rows, cols);
        this.possibleMoves = new InLineMoves(this);
        this.updateScore = new NoScore();
        this.endOfGame = new NoMove(this);
    }
}