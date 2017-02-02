<template>
  <div class="game-map-active">
    <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
      <game-package class="v-package" v-show="this.infoMenu"></game-package>
    </transition>
    <transition enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
      <game-home-info class="right-info" v-show="this.infoMenu" transition="bounce"></game-home-info>
    </transition>
    <div :class="['show-btn',this.infoMenu ? 'opend' : 'closed']" @click="showInfo">
      <i v-if="this.infoMenu" class="fa fa-angle-double-left" aria-hidden="true"></i>
      <i v-else class="fa fa-angle-double-right" aria-hidden="true"></i>
    </div>
    <div class="map-data">
      <div class="map">
        <div v-for="(line,x) in map.$data.mapData">
          <span 
            v-for="(block,y) in line" 
            :class="{ 
              'map-block': true, 
              'stick' : block.block_type == '2',
              'road': block.block_type == '0' ,
              'path': block.path,
              'hero': block.block_type == '1' ,
              'end' : block.block_type == '3' ,
            }"
            @click="autoMove(block)">
            <img class="map-block" v-if="block.block_type == '1'" :src="require('static/hero-1.png')"/>
            <img class="map-block" v-if="block.FEvent" :src="require('static/event-fight.png')"/>
            <img class="map-block" v-if="block.DEvent" :src="require('static/event-dialog.png')"/>
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
                <component-item :item="item" :position-index="'$MapEvent|' + index">
                  <span class="item-name" slot="item-name">{{item[0] | itemKey('name')}}</span>
                  <span class="badges" slot="badges">{{item[1]}}</span>
                </component-item>
              </template>
              =>
              <template v-for="(item,index) in DialogEvent.record.get">
                <component-item :item="item" :position-index="'$MapEvent|' + index">
                  <span class="item-name" slot="item-name">{{item[0] | itemKey('name')}}</span>
                  <span class="badges" slot="badges">{{item[1]}}</span>
                </component-item>
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
import Menu from './game-home-menu.vue'
import Info from './game-home-info.vue'

export default {
  components :{
    'game-home-menu' : Menu,
    'game-home-info' : Info
  },
  data () {
    return {
      infoMenu : false,
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
    showInfo() {
      this.infoMenu = !this.infoMenu;
    },
    autoPisition (){
      let $m = document.querySelector('.game-map-active'),
          $b = document.querySelector('.map-block'),
          Bx = $b.offsetWidth,
          By = $b.offsetHeight,
          hero = this.map.hero;
      let { row, col } = this.map.$data;
      let sty = document.querySelector('.map-data .map').style;
      sty.left = ((($m.offsetWidth - Bx * row)/2) - (hero.y - (col - 1)/2) * Bx) + 'px';
      sty.top = ((($m.offsetHeight - By * col)/2) - (hero.x - (row - 1)/2) * By) + 'px';
    },
    autoMove (end){
      this.moveEvent.autoMove(
        new Astar(this.map.$data, this.map.hero, end)
      );
    },
  }
}

</script>

<style scoped lang="less">
.game-map-active{
  position: relative;
  overflow: hidden;
}

.game-home-info{
  position: absolute;
  z-index: 2;
}

.game-package{
  position: absolute;
  z-index: 2;
  background: #fff6cb;
  top: 230px;
}

.show-btn{
  background: #fff6cb;
  position: absolute;
  z-index: 3;
  width: 20px;
  height: 62px;
  line-height: 62px;
  text-align: right;
  top: 168px;
  border-radius: 0px 2px 2px 0px;
  padding-right: 4px;
  transition: width 0.6s;
  cursor: pointer;
}

@keyframes move
{
  0% { padding-right: 4px;}
  100% { padding-right: 18px;}
}

.show-btn.opend{
  width: 520px;
  transition: 1s;
  border-radius :0px;
  animation: move 0.6s infinite;
}

.map-data{
  position: relative;
  height: 500px;
  overflow: hidden;
  background: black;
}
.map-block{
  display: inline-block;
  width: 40px;
  height: 40px;
  vertical-align: top;
  border-radius: 2px;
}
.map-block.stick{
  background: black;
}
.map-block.road{
  background: white;
}
.map-block.road:hover{
  box-shadow: 0px 0px 4px red inset; 
  cursor: pointer;
}
.map-block.hero{
  background: white;
}
.map-data .map{
  position: absolute;
  width: 800px;
  height: 800px;
  box-shadow: 0px 0px 10px black;
  transition: 0.2s;
}
</style>
