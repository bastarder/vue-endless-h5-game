const Astar = function Astar(map, start, end){
    function block(x, y){
        this.x = x;
        this.y = y;
        // this.code = x + '-' + y;
        this.parent = null;
        this.G = 0;
        this.H = null;
        this.getF = function(){
            return this.G + this.H;
        };
    }
    this.map = map;
    this.init = function(){
      start && this.map.setStart(start.x, start.y);
      end   && this.map.setEnd(end.x, end.y);
      this.map.openList.push(this.map.startBlock);
      var line = this.step();
      if(!line.find){
        console.info('无法生存路径!');
        return ;
      }
      line = line.endBlock;
      while(line.parent.parent){
        line = line.parent;
        this.map.mapData[line.x][line.y] = '4';
      }
    }
    this.step = function(){
      this.map.openList = this.map.openList.sort(function(a,b){
        return a.getF() - b.getF();
      })
      var currentBlock = this.map.openList.shift();
      if(!currentBlock){
        return {
          find: false
        }
      };
      this.map.closeList.push(currentBlock);
      var around = this.around(currentBlock);
      for(var i = 0; i < around.length; i++){
        var _block = around[i];
        var index = this.map.isInList(_block,'openList');
        _block.parent = currentBlock;
        _block.H = this.countH(_block);
        _block.G = this.countG(_block) + (currentBlock.G || 0);
        if(!index){
          if(_block.x === this.map.endBlock.x && _block.y === this.map.endBlock.y){
            return {
              find: true,
              endBlock: _block
            }
          }
          this.map.openList.push(_block);
          continue;
        }
        if((currentBlock.G + this.countG(_block)) < this.map.openList[index.index].G){
          this.map.openList[index.index].parent = currentBlock;
        }
      };
      return this.step();
    };
    this.around = function(currentBlock){
      var list = [];
      for(var i = -1; i <= 1; i++){
        for(var j = -1; j<= 1; j++){
          if(i === 0 && j === 0){
            continue;
          };
          if(i !== 0 && j!==0){
            continue;
          }
          var x = currentBlock.x + i;
          var y = currentBlock.y + j;
          if(x >= this.map.row || y >= this.map.col || x < 0 || y < 0){
            continue;
          }
          var record = new block(x, y);
          if(this.map.isInList(record,'closeList')){
            continue;
          }
          if(this.map.isInList(record,'stickList')){
            continue;
          }
          list.push(record)
        }
      }
      return list;
    }
    this.countH = function(block){
      var x = Math.abs(block.x - this.map.endBlock.x);
      var y = Math.abs(block.y - this.map.endBlock.y);
      return (x + y) * 10;
    }
    this.countG = function(block){
      if(block.x !== block.parent.x && block.y !== block.parent.y){
        return 14;
      }else{
        return 10;
      }
    }
  }


  export default Astar