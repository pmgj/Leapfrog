import Cell from "./Cell.js";
import CellState from "./CellState.js";
import LeapFrog from "./LeapFrog.js";
import Winner from "./Winner.js";

class Test {
    test1() {
        let board = [
            [CellState.EMPTY, CellState.PIECE1, CellState.EMPTY, CellState.PIECE1, CellState.PIECE1, CellState.PIECE1],
            [CellState.PIECE1, CellState.PIECE1, CellState.PIECE1, CellState.PIECE1, CellState.PIECE1, CellState.PIECE1],
            [CellState.EMPTY, CellState.PIECE1, CellState.PIECE1, CellState.PIECE1, CellState.EMPTY, CellState.PIECE1],
            [CellState.PIECE1, CellState.PIECE1, CellState.PIECE1, CellState.PIECE1, CellState.PIECE1, CellState.PIECE1],
            [CellState.PIECE1, CellState.PIECE1, CellState.EMPTY, CellState.PIECE1, CellState.EMPTY, CellState.PIECE1],
            [CellState.PIECE1, CellState.PIECE1, CellState.PIECE1, CellState.PIECE1, CellState.PIECE1, CellState.PIECE1]
        ];
        let k = new LeapFrog(6, 6), w;
        k.setBoard(board);
        // let p = k.possibleMoves(new Cell(0, 4));
        w = k.move([new Cell(0, 4), new Cell(0, 2), new Cell(0, 0), new Cell(2, 0)]);
        console.assert(w === Winner.NONE);
        w = k.move([new Cell(4, 0), new Cell(4, 2), new Cell(4, 4), new Cell(2, 4), new Cell(0, 4)]);
        console.assert(w === Winner.NONE);
        w = k.move([new Cell(0, 5), new Cell(0, 3)]);
        console.assert(w === Winner.NONE);
        w = k.move([new Cell(2, 0), new Cell(4, 0)]);
        console.assert(w === Winner.NONE);
        w = k.move([new Cell(2, 2), new Cell(2, 0)]);
        console.assert(w === Winner.NONE);
        w = k.move([new Cell(5, 0), new Cell(3, 0), new Cell(1, 0)]);
        console.assert(w === Winner.NONE);
        w = k.move([new Cell(2, 5), new Cell(0, 5)]);
        console.assert(w === Winner.NONE);
        w = k.move([new Cell(4, 5), new Cell(2, 5)]);
        console.assert(w === Winner.NONE);
        w = k.move([new Cell(5, 2), new Cell(5, 0)]);
        console.assert(w === Winner.NONE);
        w = k.move([new Cell(3, 2), new Cell(3, 0)]);
        console.assert(w === Winner.NONE);
        w = k.move([new Cell(1, 2), new Cell(1, 4)]);
        console.assert(w === Winner.NONE);
        w = k.move([new Cell(1, 0), new Cell(1, 2)]);
        console.assert(w === Winner.NONE);
        w = k.move([new Cell(2, 3), new Cell(4, 3)]);
        console.assert(w === Winner.NONE);
        w = k.move([new Cell(5, 3), new Cell(3, 3)]);
        console.assert(w === Winner.NONE);
        w = k.move([new Cell(5, 5), new Cell(5, 3)]);
        console.assert(w === Winner.PLAYER2);
    }
}
let t = new Test();
t.test1();