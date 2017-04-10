<template>
  <div class="game-fight"> 

    <game-fight-unit-info 
      :unit="hero" 
      class="hero rubberBand animated">
    </game-fight-unit-info><!--
    
  --><div class="fight-center">
      <game-fight-event-log></game-fight-event-log>
      <game-fight-drop-list 
        :dropData="dropData" 
        :getter="hero" 
        @setDropData="setDropData">
      </game-fight-drop-list>
    </div><!--
    
 --><game-fight-unit-info 
      :unit="monster" 
      class="monster rubberBand animated">
    </game-fight-unit-info>

    <div class="fight-menu">
      <a type="button" class="btn red" @click="StartFight" v-if="this.btn.start">开始战斗</a>
      <a type="button" class="btn red" @click="NextMonster" v-if="this.btn.next">继续战斗</a>
      <a type="button" class="btn red" @click="end(true)" v-if="this.btn.end">结束战斗</a>
      <!--<a type="button" class="btn" @click="test">测试战果</a>-->
    </div>

    <div class="test-tip">
      提示 : 默认攻击键为Q,W,E,R
    </div>

  </div>
</template>

<script>
  import SkillEvent from '../js/release-skill'
  import MonsterAI from '../js/monster-ai'
  import GameFightEventLog from './game-fight-event-log.vue'
  import GameFightUnitInfo from './game-fight-unit-info.vue'
  import GameFightDropList from './game-fight-drop-list.vue'

  export default {
    components : {
      'game-fight-event-log': GameFightEventLog,
      'game-fight-unit-info': GameFightUnitInfo,
      'game-fight-drop-list': GameFightDropList,
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
        dropData : [],
        round : -1,
      }
    },
    created() {
      // 获取英雄;
      this.hero = this.$store.state.HeroStore.hero;

      // 获得怪物列表;
      this.monsters = this.$store.state.FightStore.monsters;

      // 如果无怪物列表,则判定为强制跳转,回到主页面
      // 如果有怪物列表,则设置怪物列表的第一个怪物为下一战斗怪物
      this.monsters ? this.NextMonster() : (location.href = '#/');
    },
    watch : {
      '$store.state.UPDATE' : function(item){
        // 联动全局刷新;
        this.$forceUpdate();
      },
      'hero.$alive' : function(v){
        !v && this.overFight(false);
      },
      'monster.$alive' : function(v){
        !v && this.overFight(true);
      }
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

        this.setDropData(this.monster.dieDrop());
      },
      end(win){
        // 清空战斗参数;
        this.$store.state.FightStore.monsters = null;
        // 如果英雄死亡,则 清空地图信息 返回主界面;
        if(!win){
          this.$store.state.MapStore.map = null;
          this.$router.push('/');
        }else{
          this.$router.push('/map-active');
        }
      },
      setDropData (data){
        this.$set(this,'dropData', data);
      },
      test (){
        this.setDropData(this.monster.dieDrop());
      }
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
    .fight-center{
      display: inline-block;
      width: 360px;
      padding: 0px 4px;
      vertical-align: top;
    }
    .fight-menu{
      position: absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background: rgba(0,0,0,0.6);
      .btn{
        display: inline-block;
        width: 200px;
        height: 50px;
        line-height: 48px;
      }
    }
    .test-tip{
      color: white;
      position: absolute;
      bottom: 0;
    }
 }
</style>
