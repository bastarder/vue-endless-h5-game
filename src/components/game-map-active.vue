<template>
  <div class="game-map-active">
    <div class="map-data">
      <div class="map">
        <div v-for="(line,x) in map.$data.mapData">
          <span 
            v-for="(block,y) in line" 
            :class="{ 
              'map-block': true, 
              'road': block.block_type == '0' ,
              'path': block.block_type == '4' ,
              'hero': block.block_type == '1' ,
              'end' : block.block_type == '3' ,
            }"
            @click="autoPisition">
     
          </span>
        </div>
      </div>
    </div>

    <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" v-if="DialogEvent.record">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="myModalLabel">Hi Bastarder!</h4>
          </div>
          <div class="modal-body">
            {{DialogEvent.record.msg}}
            <div v-if="DialogEvent.record.need || DialogEvent.record.get">
              <template v-for="(item,index) in DialogEvent.record.need">
                <component-item :item="item" :position-index="'$MapEvent|' + index"></component-item>
              </template>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-default" v-for="btn in DialogEvent.record.buttons" @click="DialogEvent.callAction(btn.action)">
              {{btn.title}}
            </button>
            <button class="btn btn-default" v-if="!DialogEvent.record.buttons" @click="DialogEvent.callAction(DialogEvent.next)">
              {{ DialogEvent.isEnd ? '结束对话' : '下一步' }}
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import DungeonCreater from '../js/dungeon-creater'
import Astar from '../js/astar'
import { MapDialog } from '../js/event-class'
import { DIALOG_DATA } from '../data/event-data'

export default {
  data () {
    return {
      map : null,
      start: null,
      end: null,
      DialogEvent : {},
    }
  },
  created (){
    this.map = this.$store.state.EVENT_MAP_DATA;
    // this.map = new DungeonCreater({
    //     row : 20,
    //     col : 20,
    //     lines : 15,    // 分支量;
    //     inflex : 0.5  // 曲折度;
    // });
    
    // this.start = _.sample(
    //   _.filter(
    //     _.flattenDeep(this.map.mapData),
    //     { block_type: this.map.$BLOCK_ROAD }
    //   )
    // );

    // this.end = _.sample(
    //   _.filter(
    //     _.flattenDeep(this.map.mapData),
    //     { block_type: this.map.$BLOCK_ROAD }
    //   )
    // );

    // var path = new Astar(this.map, this.start, this.end);

  },
  updated (){
    this.autoPisition();
  },
  methods : {
    autoPisition (){
      let [X,Y,Bx,By,row,col] = [628,428,40,40,this.map.$data.row,this.map.$data.col];
      let mapElement = $('.map-data .map');
      let hero = this.map.hero;
      let middleLeft = ((X - Bx * row)/2);
      let middleTop = ((Y - By * col)/2);
      let Ky = hero.x - (row - 1)/2;
      let Kx = hero.y - (col - 1)/2;
      let left = middleLeft - Kx * Bx;
      let top = middleTop - Ky * By;
      mapElement.css('left', left + 'px');
      mapElement.css('top', top + 'px');
    },
    testModal (){

      this.DialogEvent = new MapDialog(DIALOG_DATA[0], this); // opt, scope

    },
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
  width: 40px;
  height: 40px;
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
