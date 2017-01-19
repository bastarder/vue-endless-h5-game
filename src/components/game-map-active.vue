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
              'path': block.path,
              'hero': block.block_type == '1' ,
              'end' : block.block_type == '3' ,
            }"
            @click="autoMove(block)">
            <span v-if="block.FEvent">战</span>
            <span v-if="block.DEvent">话</span>
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
import HeroMoveEvent from '../js/map-hero-move'
import { MapDialog } from '../js/event-class'
import { DIALOG_DATA } from '../data/event-data'

export default {
  data () {
    return {
      map : null,
      path : null,
      DialogEvent : {},
    }
  },
  created (){
    this.map = this.$store.state.EVENT_MAP_DATA;
    this.moveEvent = new HeroMoveEvent(this.map, this);
    setTimeout(() => { this.autoPisition() },100);
  },
  updated (){
    this.autoPisition();
  },
  destroyed(){
    this.moveEvent && this.moveEvent.stop();
  },
  methods : {
    autoPisition (){
      let $m = $('.game-map-active'),
          $b = $($('.map-block')[0]),
          Bx = $b.width(),
          By = $b.height(),
          hero = this.map.hero;
      let { row, col } = this.map.$data;
      $('.map-data .map').animate({
        'left' : ((($m.width() - Bx * row)/2) - (hero.y - (col - 1)/2) * Bx) + 'px',
        'top' : ((($m.height() - By * col)/2) - (hero.x - (row - 1)/2) * By) + 'px'
      },300)
      
    },
    autoMove (end){
      this.moveEvent.autoMove(
        new Astar(this.map.$data, this.map.hero, end)
      );
    },
  }
}

</script>

<style>
.map-data{
  position: relative;
  height: 428px;
  overflow: hidden;
  background: black;
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
.map-block.path,.map-block:hover{
  box-shadow: 0px 0px 4px red inset; 
  cursor: pointer;
}
.map-block.hero{
  background: blue;
}
.map-data .map{
  position: absolute;
  width: 800px;
  height: 800px;
  box-shadow: 0px 0px 10px black;
}
</style>
