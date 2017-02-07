<template>
  <div class="game-map-active">
    <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
      <game-package class="v-package" v-show="this.infoMenu"></game-package>
    </transition>
    <transition enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
      <game-home-info class="right-info" v-show="this.infoMenu" transition="bounce"></game-home-info>
    </transition>
    <transition enter-active-class="animated slideInLeft slow" leave-active-class="animated slideOutLeft slow">
      <div class="tip" v-if="tip">
        <span class="map-name">{{map.$opt.name}}</span>
        <div>
          <span class="map-block FEvent">战斗</span>
          <span class="map-block DEvent">事件</span>
          <span class="map-block hero">英雄</span>
        </div>
      </div>
    </transition>
    <router-link class="btn backhome" to="/">回家</router-link>
    <div :class="['show-btn',this.infoMenu ? 'opend' : 'closed']" @click="showInfo">
      <span v-if="this.infoMenu">&lt;</span>
      <span v-else>&gt;</span>
    </div>
    <div class="map-data">
      <div class="map">
        <div v-for="(line,x) in map.$data.mapData">
          <div :class="['map-block-bg', block.block_type != '0' || block.FEvent || block.DEvent || block.block_type == '1'? 'gray' : '']" v-for="(block,y) in line" >
            <span 
              :class="blockClass(block)"
              @click="autoMove(block)"
              :x="x"
              :y="y">
              <!--
              <img class="map-block hero" v-if="block.block_type == '1'" :src="require('static/hero-1.png')"/>
              <img class="map-block FEvent" v-if="block.FEvent" :src="require('static/event-fight.png')"/>
              <img class="map-block DEvent" v-if="block.DEvent" :src="require('static/event-dialog.png')"/>
              -->
            </span>
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
import MapInit from '../js/map-init';

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
      tip : false,
    }
  },
  created (){
    // this.map = this.$store.state.EVENT_MAP_DATA;
    this.map = new MapInit(this.$store.state.mapList[0])
    console.log(this.map);
    this.moveEvent = new HeroMoveEvent(this.map, this);
    setTimeout(() => { this.autoPisition() },100);
    setTimeout(() => { this.tip = true },500);
    setTimeout(() => { this.tip = null },5000);
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
    blockClass(block) {
      let typeList = ['road', 'hero', 'stick', 'end'];
      let classList = ['map-block'];
      let stick = '2';

      classList.push(typeList[Number(block.block_type)] || '');

      block.FEvent && classList.push('FEvent');

      block.DEvent && classList.push('DEvent');

      // 计算圆角;
      // r-1 r-2 r-3 r-4
      let data = this.map.$data.mapData;
      let t = [[-1,-1],[-1,1],[1,-1],[1,1]];
      for(let i = 0; i< 4; i++){
        let {x,y} = block;
        x = Number(x);
        y = Number(y);
        let d1 = {x: x + t[i][0],y};
        let d2 = {x,y: y + t[i][1]};
        if(data[d1.x] && (data[d1.x][d1.y] !== undefined) && data[d2.x] && data[d2.x][d2.y] !== undefined){
          d1 = data[d1.x][d1.y];
          d2 = data[d2.x][d2.y];
          if(block.block_type == stick){
            let d3 = {x:x + t[i][0],y: y + t[i][1]};
            if(!data[d3.x] || data[d3.x][d3.y] == undefined){
              continue;
            }
            d3 = data[d3.x][d3.y]
            if(d1.block_type != stick && d2.block_type != stick && d3.block_type != stick){
              classList.push(`r-${i+1}`);
            }
          }else{
            if(d1.block_type == stick && d2.block_type == stick){
              classList.push(`r-${i+1}`);
            }
          }
        }
      }

      return classList;
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
.backhome{
  position: absolute;
  z-index: 9;
  left: 746px;
  top: 446px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  line-height: 45px;
  font-size: 16px;
  border-width: 2px;
}
.game-map-active{
  position: relative;
  overflow: hidden;
}

.game-home-info{
  position: absolute;
  background: #252830;
  z-index: 2;
}

.game-package{
  position: absolute;
  z-index: 2;
  background: #252830;
  top: 230px;
}

.show-btn{
  background: #9f86ff;
  position: absolute;
  z-index: 2;
  width: 20px;
  height: 48px;
  line-height: 48px;
  text-align: right;
  top: 182px;
  border-radius: 0px 2px 2px 0px;
  padding-right: 4px;
  transition: width 0.6s;
  cursor: pointer;
  color: white;
}

.map-block-bg{
  display: inline-block;
  background: #1e2127;
}
.map-block-bg.gray{
  background: #5c5f67;
}
.tip{
  display: inline-block;
  color: white;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 10;
  width: 150px;
  height: 70px;
  padding: 6px;
  border-bottom-right-radius: 4px;
  background: rgba(0,0,0,0.4);
  .map-block{
    width: 30px;
    height: 30px;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    margin-top: 6px;
  }
}

// @keyframes move
// {
//   0% { padding-right: 4px;}
//   100% { padding-right: 18px;}
// }

.show-btn.opend{
  width: 50px;
  transition: 1s;
  border-radius :0px;
  // animation: move 0.6s infinite;
}

.map-data{
  position: relative;
  height: 500px;
  overflow: hidden;
  background: #1e2127;
}
.map-block{
  display: inline-block;
  width: 40px;
  height: 40px;
  vertical-align: top;
}
.map-block.stick{
  background: #1e2127;
}
.map-block.road{
  background: #5c5f67;
}
.map-block.road:hover{
  box-shadow: 0px 0px 4px #e4d836 inset; 
  cursor: pointer;
}
.map-block.FEvent{
  border-radius: 4px;
  background: #d44950;
}
.map-block.DEvent{
  border-radius: 4px;
  background: #1bc98e;
}
.map-block.hero{
  border-radius: 4px;
  background: #9f86ff;
}
.map-data .map{
  z-index: 1;
  position: absolute;
  width: 800px;
  height: 800px;
  transition: 0.2s;
  background: #5c5f67;
}

.r-1{
  border-top-left-radius: 6px;
}

.r-2{
  border-top-right-radius: 6px;
}

.r-3{
  border-bottom-left-radius: 6px;
}

.r-4{
  border-bottom-right-radius: 6px;
}

</style>
