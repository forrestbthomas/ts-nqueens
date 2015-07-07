var Board = (function () {
    function Board(size) {
        this.size = size;
        this.buildBoard(size);
        this.numQueens = 0;
        this.countQueens = 0;
        this.lastPos = [];
        this.rowOneY = -1;
    }
    Board.prototype.buildBoard = function (size) {
        var board = [];
        for (var i = 0; i < size; i++) {
            board.push([]);
            for (var j = 0; j < size; j++) {
                board[i].push('-');
            }
        }
        this.board = board;
    };
    Board.prototype.findQInRow = function (row) {
        return row.indexOf('Q') > -1;
    };
    Board.prototype.findQInCol = function (col) {
        return col.indexOf('Q') > -1;
    };
    Board.prototype.findQInDiag = function (diag) {
        return diag.indexOf('Q') > -1;
    };
    Board.prototype.formRow = function (board, y) {
        return board[y];
    };
    Board.prototype.formCol = function (board, x) {
        var col = [];
        for (var i = 0; i < this.size; i++) {
            col.push(board[i][x]);
        }
        return col;
    };
    Board.prototype.formDiag = function (board, x, y) {
        var diag = [];
        for (var i = 1; i < this.size; i++) {
            if (i + x < this.size && i + y < this.size) {
                diag.push(board[i + x][i + y]);
            }
            if (x - i >= 0 && y - i >= 0) {
                diag.push(board[x - i][y - i]);
            }
            if (x + i < this.size && y - i >= 0) {
                diag.push(board[x + i][y - i]);
            }
            if (x - i >= 0 && y + i < this.size) {
                diag.push(board[x - i][y + i]);
            }
        }
        return diag;
    };
    Board.prototype.placeQueen = function (board, x, y) {
        board[x][y] = 'Q';
        this.lastPos.push({
            x: x,
            y: y
        });
    };
    Board.prototype.removeQueen = function (board, pos) {
        board[pos.x][pos.y] = '-';
    };
    Board.prototype.moveQueen = function (board, currentPos) {
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
    };
    Board.prototype.findNQueens = function (board, boardSize, currentPos) {
        var _this = this;
        var checkForQueens = function () {
            var QInRow = _this.findQInRow(_this.formRow(board, x));
            var QInCol = _this.findQInCol(_this.formCol(board, y));
            var QInDiag = _this.findQInDiag(_this.formDiag(board, x, y));
            if (!QInRow && !QInCol && !QInDiag) {
                _this.placeQueen(board, x, y);
                _this.numQueens++;
            }
        };
        var moveForward = function () {
            y++;
            if (y >= _this.size) {
                y = 0;
                x++;
                if (x >= _this.size) {
                    y = _this.size - 1;
                    x = _this.size - 1;
                }
            }
        };
        var x = currentPos.x;
        var y = currentPos.y;
        var finished = false;
        var pos;
        checkForQueens();
        while (!finished) {
            if (x === this.size - 1 && y === this.size - 1 || x > this.numQueens + 1 || this.numQueens === this.size) {
                if (this.numQueens === this.size) {
                    this.countQueens++;
                }
                pos = this.lastPos.pop();
                if (this.lastPos.length === 0 && pos.y === this.size - 1) {
                    finished = true;
                }
                else {
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
    };
    return Board;
})();
// console.log(new Board(5));
var test = new Board(12);
test.findNQueens(test.board, 12, { x: 0, y: 0 });
console.log(test.countQueens);
// test.formDiag(test.board, 1, 1);
