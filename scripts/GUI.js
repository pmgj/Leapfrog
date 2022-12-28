import Cell from "./Cell.js";
import CellState from "./CellState.js";
import Murray from "./games/Murray.js";

class GUI {
    constructor() {
        this.game = null;
        this.path = [];
    }
    init() {
        let iSize = document.getElementById("size");
        let iStart = document.getElementById("start");
        iSize.onchange = this.init.bind(this);
        iStart.onclick = this.init.bind(this);
        let size = iSize.valueAsNumber;
        this.game = new Murray(size, size);
        let board = this.game.getBoard();
        this.printBoard(board);
        this.changeMessage();
        this.updateScore();
    }
    printBoard(board) {
        let tbody = document.querySelector("#board tbody");
        tbody.innerHTML = "";
        for (let i = 0; i < board.length; i++) {
            let tr = document.createElement("tr");
            tbody.appendChild(tr);
            for (let j = 0; j < board[i].length; j++) {
                let td = document.createElement("td");
                if (board[i][j] !== CellState.EMPTY) {
                    let img = document.createElement("img");
                    img.src = `../images/${board[i][j]}.svg`;
                    td.appendChild(img);
                }
                td.onclick = this.play.bind(this);
                tr.appendChild(td);
            }
        }
    }
    play(evt) {
        let td = evt.currentTarget;
        td.className = "selected";
        let cell = this.coordinates(td);
        if (this.path.length > 0 && this.path[this.path.length - 1].equals(cell)) {
            this.endPath();
        } else {
            this.path.push(cell);
        }
    }
    async endPath() {
        try {
            let mr = this.game.move(this.path);
            const time = 1000;
            let temp = this.path;
            for (let i = 1; i < temp.length; i++) {
                let { x: or, y: oc } = temp[i - 1];
                let { x: dr, y: dc } = temp[i];
                await new Promise(resolve => {
                    let middleImage = document.querySelector(`tr:nth-child(${(or + dr) / 2 + 1}) td:nth-child(${(oc + dc) / 2 + 1}) img`);
                    let anim = middleImage.animate([{ opacity: 1 }, { opacity: 0 }], time);
                    anim.onfinish = () => middleImage.parentNode.removeChild(middleImage);
                    let image = document.querySelector(`tr:nth-child(${or + 1}) td:nth-child(${oc + 1}) img`);
                    let moveImage = () => {
                        this.getTableData(temp[i]).appendChild(image);
                        resolve(true);
                    };
                    let td = document.querySelector("td");
                    let size = td.offsetWidth;
                    let anim2 = image.animate([{ top: 0, left: 0 }, { top: `${(dr - or) * size}px`, left: `${(dc - oc) * size}px` }], time);
                    anim2.onfinish = moveImage;
                });
            }
            this.changeMessage(mr);
            this.updateScore();
        } catch (ex) {
            this.setMessage(ex.message);
        }
        this.path = [];
        document.querySelectorAll(".selected").forEach(td => td.className = "");
    }
    updateScore() {
        let td = document.querySelectorAll("#score tbody td");
        let scores = this.game.getScores();
        let values = Object.values(scores);
        for (let i = 0; i < values.length; i++) {
            td[i].textContent = values[i];
        }
    }
    coordinates(cell) {
        return new Cell(cell.parentNode.rowIndex, cell.cellIndex);
    }
    getTableData({ x, y }) {
        let table = document.querySelector("#board");
        return table.rows[x].cells[y];
    }
    changeMessage(m) {
        let objs = { PLAYER2: "Player 2 win!", PLAYER1: "Player 1 win!", DRAW: "Draw." };
        if (objs[m]) {
            this.setMessage(`Game Over! ${objs[m]}`);
            document.querySelectorAll("#board td").forEach(td => td.onclick = undefined);
        } else {
            let msgs = { PLAYER1: "Player 1 turn.", PLAYER2: "Player 2 turn." };
            this.setMessage(msgs[this.game.getTurn()]);
        }
    }
    setMessage(message) {
        let msg = document.getElementById("message");
        msg.textContent = message;
    }
}
let gui = new GUI();
gui.init();