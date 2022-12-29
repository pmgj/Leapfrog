# Leap Frog
This repository implements the Leap Frog board game. Two variations of this game were implemented: traditional and Froglet. It is played by capturing a piece by jumping over it. When no more captures are allowed, the game ends.

## Setup
The player can choose the size of the board and it is randomly filled with pieces except for one square. In the traditional version, all pieces are the same. In the Froglet version, 40% of the pieces are blue; 30% are red; 20% are green; and the rest is orange.

## Rules 
Players then take turns to move a piece. A piece can be moved by jumping over an orthogonally adjacent piece (horizontal or vertical), into an empty space beyond. The piece over which the jump was made is captured by the player. If possible, the player may make further jumps with the same piece, capturing further pieces. In the GUI, you must click on the piece to be moved and on the squares that it should move. Click again in the last square and piece will be moved. The borders of the squares should change to indicate that it is on the path.

## Game Over
The game is finished when no more jumps are possible. In the traditional version, the winner is the player who has captured the most pieces. In the Froglet version, the pieces are valued at 1 for blue, 2 for red, 3 for green and 4 for orange. The winner is the player who has captured the pieces of most value.
