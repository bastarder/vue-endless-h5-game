<template>
  <div class="game-fight row">
    <div class="col-xs-12">
      <component-hero-info></component-hero-info>
    </div>
    <div class="col-xs-12">
      <div class="round">
        <!--'background':'url(./src/assets/fight-round.png)', -->
        <span class="round-logo" :style="{ 
          'background-size' : '100%',
          'display': 'inline-block',
          'width' : '40px',
          'height' : '40px',
          'margin-left' : '248px',
          'margin-right' : '8px',
           }">
        </span>
        <div class="round-num">
          <span>{{ round + 1}}</span>/<span>{{ monsters.length }}</span>
        </div>
      </div>
    </div>
    <div class="col-xs-6 hero">

      <div class="unit-logo">
        <!--'background':'url(./src/assets/hero-1.png)', -->
        <span class="label label-success logo" :style="{ 
          'background-size' : '100%'}"></span>
        <span class="label label-success level">{{hero.$level}}</span>
      </div>

      <div class="unit-info">
        <game-progress :max="this.hero.$r.$maxHp" :value="this.hero.$hp" pclass="progress-bar-danger" showTip="true"></game-progress>
        <game-progress :max="this.hero.$r.$maxMp" :value="this.hero.$mp" pclass="progress-bar-info" showTip="true"></game-progress>
        <game-progress :max="this.hero.$maxExp" :value="this.hero.$exp" pclass="progress-bar-info progress-bar-striped" pstyle="height:6px;"></game-progress>
        <div class="state-list">
          <template v-for="state in hero.$status">
            <span 
              class="state" 
              :style="{ background: state.color }"
              data-toggle="tooltip" 
              data-trigger="hover"
              :data-content="state.dsc">
              {{ state.logo }}
            </span>
          </template>
        </div>
      </div>

      <div class="skill-list">
        <span class="skill tip">技能列表</span>
        <template v-for="(skill,index) in hero.$skills">
          <!--:style="{ background:'url(./src/assets/' + skill.id + '.png)', 'background-size' : '100%' }"-->
          <div :class="['skill']" >
            <div class="coolTime" v-if="skill.coolTime !== 0">
              <!--{{ (skill.coolTime / 1000).toFixed(1) }} S-->
            </div>
            <cooltime-progress :value="skill.coolTime" :max="skill.currentCoolTime"></cooltime-progress>
            {{ skill.name }}
          </div>
        </template>
      </div>

    </div>

    <div class="col-xs-6">

      <div class="unit-logo">
        <!--'background':'url(./src/assets/2000001.png)', -->
        <span class="label label-success logo" :style="{ 
          'background-size' : '100%'}"></span>
        <span class="label label-success level">{{monster.$level}}</span>
      </div>

      <div class="unit-info">
        <game-progress :max="monster.$r.$maxHp" :value="monster.$hp" pclass="progress-bar-danger" showTip="true"></game-progress>
        <game-progress :max="monster.$r.$maxMp" :value="monster.$mp" pclass="progress-bar-info" showTip="true"></game-progress>
        <div class="state-list">
          <template v-for="state in monster.$status">
            <span 
              class="state" 
              :style="{ background: state.color }"
              data-toggle="tooltip" 
              data-trigger="hover"
              :data-content="state.dsc">
              {{ state.logo }}
            </span>
          </template>
        </div>
      </div>
      
      <div class="skill-list">
        <span class="skill tip">技能列表</span>
        <template v-for="(skill,index) in monster.$skills">
          <!--:style="{ background:'url(./src/assets/' + skill.id + '.png)', 'background-size' : '100%' }"-->
          <div :class="['skill']" >
            <div class="coolTime" v-if="skill.coolTime !== 0">
              <!--{{ (skill.coolTime / 1000).toFixed(1) }} S-->
            </div>
            <cooltime-progress :value="skill.coolTime" :max="skill.currentCoolTime"></cooltime-progress>
            {{ skill.name }}
          </div>
        </template>
      </div>

    </div>

    <div class="col-xs-12" v-show="DropList.length">
      <div class="drop-list">
        <span v-for="(item, index) in DropList">
          <input type="checkbox" v-show="false" :id="'item-' + index" :value="index" v-model="CheckDrop">
          <label 
            :class="['item', ~CheckDrop.indexOf(index) ? 'selected' : '']" 
            :for="'item-' + index">
            {{item[0] | itemKey('name')}} * {{item[1]}}
          </label>
        </span>
      </div>
      <span v-if="this.fullTip">背包已满!</span>
      <button type="button" class="btn btn-sm btn-success" @click="heroGetItem">获取</button>
    </div>

    <div class="col-xs-12">
      <hr>
      <!--<div>
        <button @click="end" class="btn btn-info btn-sm">test</button>
      </div>-->
      <hr>
      <div>
        <button type="button" class="btn btn-large btn-danger" @click="start" v-if="startButton">开始战斗</button>
        <button type="button" class="btn btn-large btn-danger" @click="next" v-if="nextButton">继续战斗</button>
        <button type="button" class="btn btn-large btn-danger" @click="end(true)" v-if="endButton">结束战斗</button>
        <button type="button" class="btn btn-large btn-danger" @click="test">测试战果</button>
      </div>

    </div>
  </div>
</template>

<script>
  import Fight from '../js/fight'
  import SkillEvent from '../js/release-skill'
  import MonsterAI from '../js/monster-ai'

  export default {
    data () {
      return {
        hero: {},
        monster: {},
        monsters: [],
        round : -1,
        SkillEvent : null,
        MonsterAI : null,
        startButton : false,
        nextButton : false,
        endButton : false,
        DropList : [],
        CheckDrop : [],
      }
    },
    created() {
      // 实例创建完毕, 获取战斗信息;
      this.hero = this.$store.state.hero;
      this.monsters = this.$store.state.EVENT_FIGHT_MONSTERS;
      this.monsters ? this.next() : (location.href = '#/');
    },
    watch : {
      '$store.state.UPDATE' : function(item){
        this.$forceUpdate();
      },
      hero : {
        handler: function(item){
          this.$forceUpdate();
          item && !item.$alive && this.overFight(false);
        },
        deep: true
      },
      monster : {
        handler: function(item){
          item && !item.$alive && this.overFight(true);
        },
        deep: true
      }
    },
    computed : {

    },
    updated (){
      // 重置tooltips, 欲封装组件, 暂留方法;
      $('[data-toggle="tooltip"]').popover();
    },
    methods : {
      test (){
        this.DropList = this.monster.dieDrop(this.hero);
        this.CheckDrop = _.range(this.DropList.length);
      },
      heroGetItem(){
        this.fullTip = false;
        let list = [];
        _.each(this.CheckDrop, index => {
          list.push(this.DropList[Number(index)])
        })
        this.DropList = this.hero.getItem(list, true);
        if(this.DropList.length > 0){
          this.fullTip = true;
          this.CheckDrop = _.range(this.DropList.length);
        }
      },
      start (){
        this.startButton = false;
        this.SkillEvent = new SkillEvent(this.hero, this.monster);
        this.MonsterAI = new MonsterAI(this.hero, this.monster);
        this.SkillEvent.start();
        this.hero.startFight();
        this.MonsterAI.start();
      },
      overFight (win){
        this.SkillEvent.end();
        this.MonsterAI.end();
        this.hero.endFight();
        this.round + 1 >= this.monsters.length ? this.endButton = true : this.nextButton = true;

        if(!win){
          this.end();
          return ;
        }

        this.DropList = this.monster.dieDrop(this.hero);
        this.CheckDrop = _.range(this.DropList.length);
      },
      end(backToMap){
        this.$store.state.EVENT_FIGHT_MONSTERS = null;
        if(!backToMap){
          this.$store.state.EVENT_MAP_DATA = null;
          location.href = '#/';
          // localstorage "您已死亡";
          return ;
        }
        location.href = '#/map-active';
      },
      next (){
        this.nextButton = false;
        this.startButton = true;
        this.round ++;
        this.monster = this.monsters[this.round];
      }
    },
    destroyed (){
      this.SkillEvent && this.SkillEvent.end();
      this.MonsterAI && this.MonsterAI.end();
      this.hero.endFight();
    }
  }
</script>

<style>
 .game-fight .state-list{
   height: 24px;
 }
 .game-fight .state-list .state{
   cursor: pointer;
   width: 14px;
   height: 14px;
   font-size: 12px;
   text-align: center;
   border-radius: 2px;
   background: gray;
   color: white;
   display:inline-block;
   margin: 4px 4px 0px 0px;
 }

 .game-fight .skill-list .skill{
   display: inline-block;
   margin-left: 8px;
   color:cadetblue;
   width: 50px;
   height: 50px;
   border-radius: 4px;
   vertical-align: top;
   overflow: hidden;
   position: relative;
   box-shadow: 0px 0px 2px gray;
 }

 .game-fight .skill-list .skill .coolTime{
   position: absolute;
   width: 50px;
   height: 50px;
   line-height: 50px;
   text-align: center;
   color: white;
   border-radius: 4px;
   z-index: 5;
 }

 .game-fight .round-logo{
   margin-left: 248px;
 }

 .game-fight .round-num{
   display: inline-block;
   font-size: 32px;
   line-height: 40px;
   text-align: center;
   vertical-align: top;
   font-family: monospace;
 }

 .unit-info{
   padding-left: 64px;
 }

 .unit-logo .logo{
   display: inline-block;
   height: 58px;
   width: 58px;
   position: absolute;
   top: 6px;
   border: 2px solid brown;
 }

 .unit-logo .level{
    display: inline-block;
    position: absolute;
    top: 45px;
    left: 54px;
    height: 17px;
    width: 17px;
    padding: 0px;
    line-height: 17px;
    border-radius: 3px 0px 0px 0px;
 }

 .drop-list {
   padding-top: 10px;
 }

 .drop-list .item{
   display: inline-block;
   width: 50px;
   height: 50px;
   margin-left: 9px;
   border-radius: 4px;
   box-shadow: 0px 0px 2px gray;
   vertical-align: top;
   cursor: pointer;
 }

 .drop-list .item.selected{
   border: 3px solid green;
 }

 .game-fight .skill.tip,.game-fight .item.tip{
   color: cadetblue;
   vertical-align: top;
   border-radius: 0px 5px 5px 0px;
   padding: 4px 4px 4px 7px;
   border-left: 4px solid burlywood;
   margin-left: 0px;
   margin-right: 3px;
 }

</style>
