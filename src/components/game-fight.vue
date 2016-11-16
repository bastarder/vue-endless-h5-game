<template>
  <div class="game-fight row">
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
          <div 
            :class="['skill']"
            @click="selectSkill(skill)">
            <div class="shadow" v-if="skill.coolTime !== 0">
              {{ (skill.coolTime / 1000).toFixed(1) }} S
            </div>
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
        <button type="button" class="btn btn-large btn-block btn-danger" @click="fight">Fight!</button>
      </div>
      <hr>
      <div>
        <button @click="changeHp" class="btn btn-info btn-sm">血量变更</button>
        <button @click="changeMp" class="btn btn-info btn-sm">魔法变更</button>
        <input  v-model="a"/>
      </div>

    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Unit from '../js/unit-class'
  import Fight from '../js/fight'
  import SkillEvent from '../js/release-skill'

  var monster = new Unit();

  export default {
    data () {
      return {
        hero: this.$store.state.hero,
        monster: this.$store.state.monster,
        a: 10,
        b: 100,
      }
    },
    computed : {

    },
    updated (){
      // 重置tooltips, 欲封装组件, 暂留方法;
      $('[data-toggle="tooltip"]').popover();
    },
    methods : {
      selectSkill (skill){
        _.each(this.hero.$skills, item => {
          if(item.id === skill.id){
            item.active = true;
          }else{
            item.active = false;
          }
        })
      },
      fight (skill){
        var action = Fight(this.hero, this.monster, skill);
      },
      changeHp (){
        this.hero.$hp = this.hero.$hp + Number(this.a);
        console.log(this.a)
      },
      changeMp (){
        this.hero.$mp = this.hero.$mp + Number(this.a);
      }
    },
    mounted (){
      new SkillEvent().start(this.hero,this.fight);
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
   background-color: green;
   width: 50px;
   height: 50px;
   border-radius: 4px;
   vertical-align: top;
   overflow: hidden;
 }

 .game-fight .skill-list .skill .shadow{
   position: absolute;
   width: 50px;
   height: 50px;
   line-height: 50px;
   text-align: center;
   background: black;
   opacity: 0.3;
   color: yellow;
   border-radius: 4px;
 }

</style>
