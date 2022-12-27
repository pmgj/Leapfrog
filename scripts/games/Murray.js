import LeapFrog from "../Leapfrog.js";
import FourThreeTwoOnePoints from "../updateScores/FourThreeTwoOnePoints.js";
import HighestScore from "../endOfGame/HighestScore.js";
import MurrayBoard from "../boards/MurrayBoard.js";

export default class Murray extends LeapFrog {
    constructor(rows, cols) {
        super(rows, cols);
        this.board = new MurrayBoard().createBoard(rows, cols);
        this.updateScoresStrategy = new FourThreeTwoOnePoints(this);
        this.endOfGameStrategy = new HighestScore(this);
    }
}