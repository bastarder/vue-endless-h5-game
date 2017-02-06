<template>
  <div class="game-fight"> 

    <div class="hero rubberBand animated">
      <div class="info">
        <div class="name">{{hero.$showName}}</div>
        <game-progress :max="hero.$r.$maxHp" :value="hero.$hp" class="hp"></game-progress>
        <game-progress :max="hero.$r.$maxMp" :value="hero.$mp" class="mp"></game-progress>
        <game-progress :max="hero.$maxExp" :value="hero.$exp" class="exp striped" h="6" hideNum="true"></game-progress>
      </div>
      <div class="skill-list">
        <game-skill-item class="skill" v-for="skill in hero.$skills" :skill="skill"></game-skill-item>
      </div>
      <div class="state-list">
        <game-state-item class="state" mini="true" v-for="state in hero.$status" :state="state"></game-state-item>
      </div>
    </div><!--
    
    
    --><div class="fight-center">
      <game-fight-event-log></game-fight-event-log>
      <div class="drop-list">
        <ul v-if="drop.data.length">
          <li v-for="(item, index) in drop.data" :class="['item', ~drop.selected.indexOf(index) ? 'selected' : '', (index+1) % 3 === 0 ? 'last' : '']" >
            <input type="checkbox" v-show="false" :id="'item-' + index" :value="index" v-model="drop.selected">
            <label 
              :for="'item-' + index">
              <span class="name">{{item[0] | itemKey('name')}}</span> 
              <span class="d-ib" style="transform: rotate(45deg)">+</span> 
              <span class="num">{{item[1]}}</span>
              <span class="triangle-left bounceIn animated" v-if="~drop.selected.indexOf(index)"></span>
              <span class="triangle-right bounceIn animated" v-if="~drop.selected.indexOf(index)"></span>
            </label>
          </li>
        </ul>
        <div class="drop-tip color-red bounceIn animated" v-if="drop.tip">你的背包似乎不能容纳更多的东西了!</div>
        <button v-if="drop.data.length" type="button" class="btn drop-btn" @click="heroGetItem">获取所选物品</button>
      </div>
    </div><!--
    
    
    --><div class="monster rubberBand animated">
      <div class="info">
        <div class="name">
          <span class="nickname">{{monster.$nickname}}</span>
          {{monster.$showName}}
        </div>
        <game-progress :max="monster.$r.$maxHp" :value="monster.$hp" class="hp"></game-progress>
        <game-progress :max="monster.$r.$maxMp" :value="monster.$mp" class="mp"></game-progress>
        <game-progress class="exp striped" h="6" hideNum="true"></game-progress>
      </div>
      <div class="skill-list">
        <game-skill-item class="skill" v-for="skill in monster.$skills" :skill="skill"></game-skill-item>
      </div>
      <div class="state-list">
        <game-state-item class="state" mini="true" v-for="state in monster.$status" :state="state"></game-state-item>
      </div>
    </div>

    <div>
      <button type="button" class="btn btn-large btn-danger" @click="StartFight" v-if="this.btn.start">开始战斗</button>
      <button type="button" class="btn btn-large btn-danger" @click="NextMonster" v-if="this.btn.next">继续战斗</button>
      <button type="button" class="btn btn-large btn-danger" @click="end(true)" v-if="this.btn.end">结束战斗</button>
      <button type="button" class="btn btn-large btn-danger" @click="test">测试战果</button>
    </div>

  </div>
</template>

<script>
  import SkillEvent from '../js/release-skill'
  import MonsterAI from '../js/monster-ai'
  import GameFightEventLog from '../components/game-fight-event-log.vue'

  export default {
    components : {
      'game-fight-event-log': GameFightEventLog
    },
    data () {
      return {
        hero: {}, 
        monster: {},
        monsters: [],
        btn : {
          start : false, // 开始战斗
          next  : false, // 下一个怪物
          end   : false // 结束战斗
        }, 
        drop : {
          data : [],
          selected : [],
          tip : false,
        },
        round : -1,
      }
    },
    created() {
      // 获取英雄;
      this.hero = this.$store.state.hero;

      // 获得怪物列表;
      this.monsters = this.$store.state.FightScopeParm.monsters;

      // 如果无怪物列表,则判定为强制跳转,回到主页面
      // 如果有怪物列表,则设置怪物列表的第一个怪物为下一战斗怪物
      this.monsters ? this.NextMonster() : (location.href = '#/');
    },
    watch : {
      '$store.state.UPDATE' : function(item){
        // 联动全局刷新;
        this.$forceUpdate();
      },
      hero : {
        handler: function(item){
          // 判断英雄死亡;
          item && !item.$alive && this.overFight(false);
        },
        deep: true
      },
      monster : {
        handler: function(item){
          // 判断怪物死亡;
          item && !item.$alive && this.overFight(true);
        },
        deep: true
      }
    },
    computed : {
      
    },
    updated (){
      // 重置tooltips, 欲封装组件, 暂留方法
      // $('[data-toggle="tooltip"]').popover()
    },
    methods : {
      StartFight (){
        // 隐藏 【开始战斗】
        this.$set(this.btn,'start',false);

        // 添加日志
        this.$store.commit('FightEventLogPush','战斗开始!');

        // 初始化 英雄状态
        this.hero.startFight();

        // 初始化 技能热键监听
        this.SkillEvent = new SkillEvent(this.hero, this.monster);

        // 初始化 怪物自动战斗
        this.MonsterAI = new MonsterAI(this.hero, this.monster);
      },
      NextMonster (){
        // 清空战斗日志
        this.$store.commit('FightEventLogClear');

        // 隐藏 【下一个】
        this.$set(this.btn,'next',false);

        // 展示 【开始战斗】
        this.$set(this.btn,'start',true);

        // 当前回合数
        this.round ++;

        // 设置下一战斗怪物
        this.monster = this.monsters[this.round];
      },
      overFight (win){
        // 防止多次触发;
        if(this.btn.end || this.btn.next){
          return ;
        }
        
        // 结束监听事件
        this.SkillEvent && this.SkillEvent.end();
        this.MonsterAI && this.MonsterAI.end();
        this.hero && this.hero.endFight();

        // 判断是否英雄死亡
        if(!win){
          this.$store.commit('FightEventLogPush','你已死亡! 战斗结束!');
          this.end();
          return ;
        }

        this.$store.commit('FightEventLogPush','你打败了敌人!');

        // 判断是否所有回合结束
        if(this.round + 1 >= this.monsters.length){
          this.$set(this.btn,'end',true)
        }else{
          this.$set(this.btn,'next',true)
        }

        this.$set(this.drop,'data', this.monster.dieDrop());
        this.$set(this.drop,'selected', _.range(this.drop.data.length));
      },
      end(win){
        // 清空战斗参数;
        this.$store.state.FightScopeParm.monsters = null;

        // 如果英雄死亡,则 清空地图信息 返回主界面;
        if(!win){
          this.$store.state.EVENT_MAP_DATA = null;
          this.$router.push('/');
        }else{
          this.$router.push('/map-active');
        }
      },
      heroGetItem(){
        let { drop, $set } = this;
        
        $set(drop,'tip', false);

        // 拾取物品
        drop.data = this.hero.getItem(
          _.map(drop.selected, i => drop.data[Number(i)]), true
        );

        // 如果有剩余物品,则提示背包已满
        if(drop.data.length > 0){
          $set(drop, 'tip', true);
          setTimeout(function(){
            $set(drop, 'tip', false);
          },2000);
          $set(drop, 'selected' ,_.range(drop.data.length));
        }
      },
      test (){
        this.$set(this.drop,'data', this.monster.dieDrop());
        this.$set(this.drop,'selected', _.range(this.drop.data.length));
      },

    },
    destroyed (){
      this.SkillEvent && this.SkillEvent.end();
      this.MonsterAI && this.MonsterAI.end();
      this.hero.endFight();
    }
  }
</script>

<style scoped lang="less">
 .game-fight{
    background: #252830;
    height: 100%;
    .info{
      .name{
        border-radius: 2px;
        margin-bottom: 8px;
        color: white;
        .nickname{
          font-size: 12px;
          color: red;
        }
      }
    }
    .progress{
      margin-bottom: 4px;
    }
    .skill{
      margin-right: 8px;
    }
    .skill:last-child{
      margin-right: 0;
    }
    .state{
      margin-right: 4px;
    }
    .hero,.monster{
      display: inline-block;
      vertical-align: top;
      width: 220px;
      padding: 10px;
      background: rgb(30, 33, 39);
    }
    .fight-center{
      display: inline-block;
      width: 360px;
      padding: 0px 4px;
      vertical-align: top;
    }

 }

 .drop-list {
   padding: 6px;
   position: relative;
   height: 200px;
   background: #1e2127;
   overflow-y: scroll;
   ul{
     padding: 0;
     list-style: none;
     margin: 0px;
   }
   .item{
     display: inline-block;
     border: 1px solid rgb(67, 72, 87);
     border-radius: 2px;
     width: 110px;
     height: 44px;
     color: rgb(207, 210, 218);
     line-height: 40px;
     padding: 0px 2px 0px 8px;
     margin-right: 4px;
     margin-bottom: 4px;

     label{
       position: relative;
       display: inline-block;
       width: 100%;
       height: 100%;
       cursor: pointer;
       font-size: 12px;
       .name{
         
       }
       .triangle-left{
         display: inline-block;
         position: absolute;
         border-bottom: 16px solid transparent;
         border-left: 16px solid #1bc98e;
         top: -3px;
         left: -9px;
       }
       .triangle-right{
         display: inline-block;
         position: absolute;
         border-bottom: 16px solid #1bc98e;
         border-left: 16px solid transparent;
         top: 25px;
         left: 85px;
        }

     }
     transition: background 0.3s;
   }
   .item.selected{
     background: #434857;
     color: white;
     transition: 0.3s;
   }
   .item.last{
     margin-right: 0px;
   }
   .drop-tip{
     display: inline-block;
     position: absolute;
     width: 100%;
     text-align: center;
     background: rgba(0,0,0,.6);
     padding: 20px;
     top: 74px;
   }
   .drop-btn{
     margin-top: 8px;
     width: 100%;
   }
 }

</style>
