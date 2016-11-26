const DungeonCreater = function(opt) {
        this.row = opt.row || 35;
        this.col = opt.col || 40;
        this.lines = opt.lines || 10;
        this.inflex = opt.inflex || 0.7;
        this.startBlock = null;
        this.endBlock = null;
        this.stickList = [];
        this.openList = [];
        this.closeList = [];
        this.clearPath = function() {
            this.openList = [];
            this.closeList = [];
            for (var i = 0; i < this.row; i++) {
                for (var j = 0; j < this.col; j++) {
                    if (this.mapData[i][j] == '4' || this.mapData[i][j] == '1' || this.mapData[i][j] == '3') {
                        this.mapData[i][j] = '0'
                    }
                }
            }
        }
        this.isInList = function(block, type) {
            for (var i = 0; i < this[type].length; i++) {
                if (this[type][i].x === block.x && this[type][i].y === block.y) {
                    return {
                        index: i
                    };
                }
            }
            return false;
        }
        this.init = function() {
            var result = [];
            for (var i = 0; i < this.row; i++) {
                var arr = []
                for (var j = 0; j < this.col; j++) {
                    arr.push(2);

                }
                result.push(arr);
            }
            this.mapData = result;
            var times = 0;
            while (true) {
                var start = getRandomPosition(this.row, this.col);
                var end = getRandomPosition(this.row, this.col);
                if (start.x - end.x > (this.row * 0.5) && start.y - end.y > (this.col * 0.5)) {
                    this.createLine(start, end, true);
                    break;
                }
            }
            for (var i = 0; i < this.lines - 1;) {
                times++;
                this.createLine(getRandomPosition(this.row, this.col), getRandomPosition(this.row, this.col)) && i++;
                if (times > 100) {
                    break;
                }
            }
            for (var i = 0; i < this.row; i++) {
                for (var j = 0; j < this.col; j++) {
                    if (this.mapData[i][j] == '2') {
                        this.setStick(i, j)
                    }
                }
            }
            return this.mapData;
        };
        this.createLine = function(start, end, first) {
            // 生成线路: 采用从A - B的走法,中间随机曲折; _x,_y用于记录当前走到得节点位置,默认为起点;
            var _x = start.x;
            var _y = start.y;
            // 计算2点之间的距离;
            var distance_x = Math.abs(start.x - end.x);
            var distance_y = Math.abs(start.y - end.y);
            // 剩余的移动量;用于确保能够到达目标地点;
            var moveLeft = {
                    x: distance_x,
                    y: distance_y
                }
                // 用于存放需要被点亮的点的位置(最终的路径);
            var lines = [];
            // 循环生成曲折线路,直到走到目标地点;
            while (_x !== end.x && _y !== end.y) {
                // 进行X轴移动;
                var move_x = getRandom(0, distance_x, this.inflex, moveLeft.x);
                moveLeft.x -= move_x;
                for (var i = 0; i < move_x; i++) {
                    if (start.x > end.x) {
                        lines.push([_x - i, _y]);
                    } else {
                        lines.push([_x + i, _y]);
                    }
                }
                if (start.x > end.x) {
                    _x -= move_x;
                } else {
                    _x += move_x;
                }
                // 进行Y轴移动;
                if (moveLeft.x === 0) {
                    // 如果X轴已经走到同一线,则这一步Y轴需要直接走到终点;
                    var move_y = moveLeft.y;
                } else {
                    var move_y = getRandom(0, distance_y, this.inflex, moveLeft.y);
                }
                moveLeft.y -= move_y;
                for (var j = 0; j < move_y; j++) {
                    if (start.y > end.y) {
                        lines.push([_x, _y - j]);
                    } else {
                        lines.push([_x, _y + j]);
                    }
                }
                if (start.y > end.y) {
                    _y -= move_y;
                } else {
                    _y += move_y;
                }
            }
            // 判断是否是第一条路径;
            // 如果非第一条路径,则需要确认此条路径经过了已有的路径,否则此条路径生成无效,将返回false;
            if (!first) {
                var isIn = false;
                lines.forEach(function(pos) {
                    this.mapData[pos[0]][pos[1]] === 0 && (isIn = true);
                }, this);
                if (!isIn) {
                    return false;
                }
            }
            // 生成路径成功,将其更新至地图数据;
            lines.forEach(function(pos) {
                this.mapData[pos[0]][pos[1]] = 0;
            }, this)
            return true;
        }
        this.setStart = function(x, y) {
            this.mapData[x][y] = '1';
            this.startBlock = {
                x: x,
                y: y
            };
            return this.startBlock;
        }
        this.setEnd = function(x, y) {
            this.mapData[x][y] = '3';
            this.endBlock = {
                x: x,
                y: y
            };
            return this.endBlock;
        }
        this.setStick = function(x, y) {
                this.mapData[x][y] = '2';
                this.stickList.push({
                    x: x,
                    y: y
                });
                return this.stickList;
            }
            ////////////////////////////////////////
        function getRandom(start, end, per, max) {
            var num = Number((Math.random() * (end - start) + start).toFixed(0));
            if (per) {
                num = Number((num * per).toFixed(0));
                if (max && (num > max)) {
                    num = max;
                }
            }
            return num;
        }

        function getRandomPosition(x, y) {
            return {
                x: getRandom(0, x - 1),
                y: getRandom(0, y - 1),
            }
        }
    }
    // var map = new Map({
    //     row : 25,
    //     col : 25,
    //     lines : 7,    // 分支量;
    //     inflex : 0.5  // 曲折度;
    // });
    // map.init();

export default DungeonCreater