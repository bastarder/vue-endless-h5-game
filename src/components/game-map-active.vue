<template>
  <div class="game-map-active">
    <div class="map-data">
      <div class="map">
        <div v-for="(line,x) in map.mapData">
          <span 
            v-for="(block,y) in line" 
            :class="{ 
              'map-block': true, 
              'road': block == '0' ,
              'path': block == '4' ,
              'hero': block == '1' ,
              'end' : block == '3' ,
            }"
            @mouseover="mouseover(x,y)">

          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DungeonCreater from '../js/dungeon-creater'
import Astar from '../js/astar'
export default {
  data () {
    return {
      map : null,
      start: null,
      end: null,
    }
  },
  created (){
    this.map = new DungeonCreater({
        row : 20,
        col : 20,
        lines : 15,    // 分支量;
        inflex : 0.5  // 曲折度;
    });
    this.map.init();
 
      var first,last;
      for(var i=0;i < 19;i++){
        for(var j=0;j < 19;j++){
          if(!first && this.map.mapData[i][j] == 0){
            first = [i,j];
          }
          if(this.map.mapData[i][j] == 0){
            last = [i,j];
          }
        }
      }
      this.end = {
        x: first[0],
        y: first[1]
      };
      this.start = {
        x: last[0],
        y: last[1]
      };
  },
  methods : {
    mouseover(x,y){
          // this.map = this.$store.state.EVENT_MAP_DATA;
      this.map.clearPath();
      if(this.map.mapData[x][y] == '2'){
        return ;
      }
      var astar = new Astar(this.map, this.start, {
        x,y
      });
      astar.init();

      this.$forceUpdate();
    }
  }
}

</script>

<style>
.map-data{
  position: relative;
  height: 428px;
  overflow: hidden;
}
.map-block{
  display: inline-block;
  width: 20px;
  height: 20px;
  background: black;
  vertical-align: top;
}
.map-block.road{
  background: white;
}
.map-block.path{
  background: yellow;
}
.map-block.hero{
  background: blue;
}
.map-block.end{
  background: red;
}
.map-data .map{
  position: absolute;
  width: 840px;
  height: 840px;
}
</style>
