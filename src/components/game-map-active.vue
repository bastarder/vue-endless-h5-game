<template>
  <div class="game-map-active">
    <div class="map-data">
      <div class="map">
        <div v-for="(line,x) in map.mapData">
          <span 
            v-for="(block,y) in line" 
            :class="{ 
              'map-block': true, 
              'road': block.block_type == '0' ,
              'path': block.block_type == '4' ,
              'hero': block.block_type == '1' ,
              'end' : block.block_type == '3' ,
            }"
            @mouseover="mouseover(x,y)"
            @click="autoPisition(x,y)">
     
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
    
    this.start = _.sample(
      _.filter(
        _.flattenDeep(this.map.mapData),
        { block_type: this.map.$BLOCK_ROAD }
      )
    );

    this.end = _.sample(
      _.filter(
        _.flattenDeep(this.map.mapData),
        { block_type: this.map.$BLOCK_ROAD }
      )
    );

    var path = new Astar(this.map, this.start, this.end);
    console.log(path);

  },
  updated (){
    this.autoPisition();
  },
  methods : {
    autoPisition (){
      let [X,Y,Bx,By,row,col] = [628,428,20,20,this.map.row,this.map.col];
      let mapElement = $('.map-data .map');
      let hero = this.start;
      let middleLeft = ((X - Bx * row)/2);
      let middleTop = ((Y - By * col)/2);
      let Ky = hero.x - (row - 1)/2;
      let Kx = hero.y - (col - 1)/2;
      let left = middleLeft - Kx * Bx;
      let top = middleTop - Ky * By;
      mapElement.css('left', left + 'px');
      mapElement.css('top', top + 'px');
    },
    mouseover(x,y){
      // this.map = this.$store.state.EVENT_MAP_DATA;
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
  width: 800px;
  height: 800px;
  box-shadow: 0px 0px 10px black;
}
</style>
