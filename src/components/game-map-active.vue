<template>
  <div class="game-map-active">

    <router-link class="btn backhome" to="/">回家</router-link>

    <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
      <game-package class="v-package" v-show="opt.info"></game-package>
    </transition>

    <transition enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
      <game-home-info class="right-info" v-show="opt.info" transition="bounce"></game-home-info>
    </transition>

    <div :class="['show-btn', opt.info ? 'opend' : 'closed']" @click="showInfo">
      <span v-if="opt.info">&lt;</span>
      <span v-else>&gt;</span>
    </div>

    <transition enter-active-class="animated slideInLeft slow" leave-active-class="animated slideOutLeft slow">
      <div class="tip" v-if="opt.tip">
        <span class="map-name">{{map.$opt.name}}</span>
        <div>
          <span class="tip-block FEvent">战斗</span>
          <span class="tip-block DEvent">事件</span>
          <span class="tip-block hero">英雄</span>
        </div>
      </div>
    </transition>

    <div class="map-data">
      <div class="map">
        <div v-for="(line,x) in map.$data.mapData">
          <map-block 
            v-for="(block,y) in line" 
            :block="block" :map="map" 
            @autoMove="autoMove(block)">
          </map-block>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Astar from '../js/astar'
import HeroMoveEvent from '../js/map-hero-move'
import Menu from './game-home-menu.vue'
import Info from './game-home-info.vue'
import MapBlock from './game-map-block.vue'

import MapInit from '../js/map-init';

export default {
  components :{
    'game-home-menu' : Menu,
    'game-home-info' : Info,
    'map-block' : MapBlock
  },
  data () {
    return {
      opt : {
        info : false,    // 信息栏, 装备栏
        tip : true,      // 地图左上提示框
      },
      map : null,        // 地图数据对象
      moveEvent : null,  // 单位移动事件监听,触发
    }
  },
  created (){
    this.map = new MapInit(this.$store.state.MapStore.mapList[0])
    // this.map = this.$store.state.MapStore.map;
    this.moveEvent = new HeroMoveEvent(this.map, this);
    setTimeout(() => {
      this.$delete(this.opt, 'tip')
    }, 5000);
  },
  mounted(){
    this.autoPisition();
  },
  methods : {
    showInfo() {
      this.$set(this.opt, 'info', !this.opt.info);
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
  },
  updated (){
    this.autoPisition();
  },
  destroyed(){
    this.moveEvent && this.moveEvent.stop();
  }
}

</script>

<style scoped lang="less">
  .game-map-active{
    position: relative;
    overflow: hidden;
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
    .show-btn.opend{
      width: 50px;
      transition: 1s;
      border-radius :0px;
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
      .tip-block{
        display: inline-block;
        width: 30px;
        height: 30px;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        margin-top: 6px;
        border-radius: 4px;
      }
      .FEvent{
        background: #d44950;
      }
      .hero{
        background: #9f86ff;
      }
      .DEvent{
        background: #1bc98e;
      }
    }
    .map-data{
      position: relative;
      height: 500px;
      overflow: hidden;
      background: #1e2127;
      .map{
        line-height: 0;
        z-index: 1;
        position: absolute;
        width: 800px;
        height: 800px;
        transition: 0.2s;
        background: #5c5f67;
      }
    }
  }
</style>
