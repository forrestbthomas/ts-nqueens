interface IGrid {
  [index: number]: Array<any>
}

class Board {

    board: IGrid
    size: number;
    countQueens: number;
    numQueens: number;
    lastPos: Array<any>
    QInRow: boolean;
    QInCol: boolean;
    QInDiag: boolean;
    rowOneY: number;

  constructor(size: number) {
      this.size = size;
      this.buildBoard(size);
      this.numQueens = 0;
      this.countQueens = 0;
      this.lastPos = [];
      this.rowOneY = -1;
  }

  public buildBoard(size: number) {
      var board = [];
      for (var i = 0; i < size; i++) {
          board.push([]);
          for (var j = 0; j < size; j++) {
              board[i].push('-');
          }
      }
      this.board = board;
  }

  public findQInRow(row: Array<any>) {
      return row.indexOf('Q') > -1;
  }

  public findQInCol(col: Array<any>) {
      return col.indexOf('Q') > -1;
  }

  public findQInDiag(diag: Array<any>) {
      return diag.indexOf('Q') > -1;
  }

  public formRow(board: IGrid, y: number) {
      return board[y];
  }

  public formCol(board: IGrid, x: number) {
      var col = [];
      for (var i = 0; i < this.size; i++) {
          col.push(board[i][x]);
      }
      return col;
  }

  public formDiag(board: IGrid, x: number, y: number) {
      var diag = [];
      for (var i = 1; i < this.size; i++) {
        if (i+x < this.size && i+y < this.size) {
            diag.push(board[i+x][i + y]);
        }
        if (x-i >= 0 && y-i >= 0) {
           diag.push(board[x-i][y-i]); 
        }
        if (x + i < this.size && y-i >= 0) {
            diag.push(board[x + i][y - i]); 
        }
        if (x - i >= 0 && y + i < this.size) {
          diag.push(board[x - i][y + i]);    
        }
      }
      return diag;
  }

  public placeQueen(board: IGrid, x: number, y: number) {
      board[x][y] = 'Q';
      this.lastPos.push({
          x: x,
          y: y
      });
  }

  public removeQueen(board: IGrid, pos: { x: number; y: number;}) {
      board[pos.x][pos.y] = '-';
  }

  public moveQueen(board: IGrid, currentPos: { x: number; y: number; } ) {
      currentPos.y++;
      if (currentPos.y >= this.size) {
          currentPos.y = 0;
          currentPos.x++;
          if (currentPos.x >= this.size) {
              currentPos.y = this.size;
              currentPos.x = this.size;
          }
      }
      return {
          x: currentPos.x,
          y: currentPos.y
      };
  }

  public findNQueens(board: IGrid, boardSize: number, currentPos: { x: number; y: number; }) {
    var checkForQueens = () => {
      var QInRow = this.findQInRow(this.formRow(board, x));
      var QInCol = this.findQInCol(this.formCol(board, y));
      var QInDiag = this.findQInDiag(this.formDiag(board, x, y));
      if (!QInRow && !QInCol && !QInDiag) {
         this.placeQueen(board, x, y);
         this.numQueens++;
      }
    }
    var moveForward = () => {
      y++;
      if (y >= this.size) {
          y = 0;
          x++;
          if (x >= this.size) {
              y = this.size - 1;
              x = this.size - 1;
          }
      }
    };
    var x = currentPos.x;
    var y = currentPos.y;
    var finished = false
    var pos;
    checkForQueens();
    while (!finished) {
        if (x === this.size - 1 && y === this.size - 1 || x > this.numQueens + 1 || this.numQueens === this.size) {
          if (this.numQueens === this.size) {
            this.countQueens++;
          }
          pos = this.lastPos.pop();
          if (this.lastPos.length  === 0 && pos.y === this.size - 1) {
              finished = true;
          } else {
            this.removeQueen(board, pos);
            this.numQueens--;
            x = pos.x;
            y = pos.y;
            if (x === this.size - 1 && y === this.size - 1) {
              pos = this.lastPos.pop();
              this.removeQueen(board, pos);
              this.numQueens--;
              x = pos.x;
              y = pos.y;
            }
          }
        }
        moveForward();
        checkForQueens();
    }
  }

}

// console.log(new Board(5));
var test = new Board(12);
test.findNQueens(test.board, 12, {x:0, y:0});
console.log(test.countQueens);
// test.formDiag(test.board, 1, 1);

