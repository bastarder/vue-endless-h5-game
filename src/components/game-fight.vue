<template>
  <div class="game-fight row">
    <div class="col-xs-12">
      {{ round + 1}} / {{ monsters.length }}
    </div>
    <div class="col-xs-6">

      <div>
        <div>
          <span class="label label-success">单位</span>
          <span class="label label-info">{{hero.$id}}</span>
        </div>
        <div style="height:6px;"></div>
        <div>
          <span class="label label-success">等级</span>
          <span class="label label-info">{{hero.$level}}</span>
        </div>

      </div>

      <game-progress :max="this.hero.$maxHp" :value="this.hero.$hp" pclass="progress-bar-danger" showTip="true"></game-progress>
      <game-progress :max="this.hero.$maxMp" :value="this.hero.$mp" pclass="progress-bar-info" showTip="true"></game-progress>
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

      <div class="skill-list">
        <template v-for="(skill,index) in hero.$skills">
          <div :class="['skill']">
            <div class="coolTime" v-if="skill.coolTime !== 0">
              {{ (skill.coolTime / 1000).toFixed(1) }} S
            </div>
            <cooltime-progress :value="skill.coolTime" :max="skill.defaultTime"></cooltime-progress>
            <!--{{ skill.name }}-->
          </div>
        </template>
      </div>

    </div>
    <div class="col-xs-1">
      
    </div>
    <div class="col-xs-5">
      <div>
        <div>
          <span class="label label-success">单位</span>
          <span class="label label-info">{{monster.$id}}</span>
        </div>
        <div style="height:6px;"></div>
        <div>
          <span class="label label-success">等级</span>
          <span class="label label-info">{{monster.$level}}</span>
        </div>

      </div>

      <game-progress :max="this.monster.$maxHp" :value="this.monster.$hp" pclass="progress-bar-danger" showTip="true"></game-progress>
      <game-progress :max="this.monster.$maxMp" :value="this.monster.$mp" pclass="progress-bar-info" showTip="true"></game-progress>

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

    <div class="col-xs-12">
      <hr>
      <div>
        <button type="button" class="btn btn-large btn-block btn-danger" @click="next">Next</button>
      </div>
      <hr>
      <div>
        <button @click="test" class="btn btn-info btn-sm">test</button>
      </div>

    </div>
  </div>
</template>

<script>
  import Fight from '../js/fight'
  import SkillEvent from '../js/release-skill'

  export default {
    data () {
      return {
        hero: {},
        monster: {},
        monsters: [],
        round : -1,
        SkillEvent : null,
      }
    },
    created() {
      // 实例创建完毕, 获取战斗信息;
      this.hero = this.$store.state.hero;
      this.monsters = this.$store.state.EVENT_FIGHT_MONSTERS;
      this.next();
    },
    computed : {

    },
    updated (){
      // 重置tooltips, 欲封装组件, 暂留方法;
      $('[data-toggle="tooltip"]').popover();
    },
    methods : {
      test (){
        // console.log(this.hero.$package[0].num)
        // this.$forceUpdate();
        this.hero.$package.push({
          name: 'Test',
          num : (Math.random() * 1000).toFixed(0)
        })
      },
      start (){
        // MonsterAI.start();
        // this.SkillEvent = new SkillEvent();
        // this.SkillEvent.start();
      },
      end (){
        // MonsterAI.end();
        // this.SkillEvent.end();
      },
      next (){
        this.SkillEvent && this.SkillEvent.end();
        if(this.round + 1 >= this.monsters.length){
          return ;
        }
        this.SkillEvent = new SkillEvent();
        this.round ++;
        this.monster = this.monsters[this.round];
        this.SkillEvent.start(this.hero,this.event_fight);
      },
      event_fight (skill){
        var action = Fight(this.hero, this.monster, skill);
        // this.end();
      },
    },
    mounted (){

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
   margin-right: 4px;
   color:white;
   background: green;
   width: 50px;
   height: 50px;
   border-radius: 4px;
   vertical-align: top;
   overflow: hidden;
   position: relative;
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

</style>
