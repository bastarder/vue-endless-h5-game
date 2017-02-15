<template>
  <div class="game-fight-unit-info">
    <div class="info">
      <div class="name">
        <span class="nickname" v-if="unit.$nickname">{{unit.$nickname}}</span>
        {{unit.$showName}}
      </div>
      <game-progress :max="unit.$r.$maxHp" :value="unit.$hp" class="hp"></game-progress>
      <game-progress :max="unit.$r.$maxMp" :value="unit.$mp" class="mp"></game-progress>
      <game-progress :max="unit.$maxExp" :value="unit.$exp" class="exp striped" h="6" hideNum="true"></game-progress>
    </div>
    <div class="skill-list">
      <game-skill-item class="skill" v-for="skill in unit.$skills" :skill="skill"></game-skill-item>
    </div>
    <div class="item-list" v-if="unit.$package">
      <game-skill-item class="skill" v-for="(item, index) in unit.$package" v-if="index < 4" :skill="item" :position="'$package|' + index"></game-skill-item>
    </div>
    <div class="state-list">
      <game-state-item class="state" mini="true" v-for="state in unit.$status" :state="state"></game-state-item>
    </div>
    <div class="die-tip color-red bounceIn animated" v-if="!unit.$alive">
      死亡
    </div>
  </div>
</template>

<script>
import GameProgress from './game-progress.vue'
import GameSkillItem from './game-skill-item.vue'
import GameStateItem from './game-state-item.vue'

export default {
  components:{
    'game-progress' : GameProgress,
    'game-skill-item' : GameSkillItem,
    'game-state-item' : GameStateItem
  },
  props:[
    'unit'
  ],
  watch : {
    '$store.state.UPDATE' : function(item){
      // 联动全局刷新;
      this.$forceUpdate();
    },
  },
}
</script>

<style scoped lang="less">
  .die-tip{
    display: inline-block;
    position: absolute;
    width: 200px;
    height: 162px;
    line-height: 130px;
    font-size: 60px;
    text-align: center;
    background: rgba(0,0,0,.6);
    padding: 20px;
    top: 10px;
  }
  .info{
    .name{
      border-radius: 2px;
      margin-bottom: 4px;
      color: white;
      background: #3a3732;
      padding: 8px 8px;
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
</style>
