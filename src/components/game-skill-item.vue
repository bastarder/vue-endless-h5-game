<template>
  <div class="skill-item">
    <div class="skill" v-if="!position">{{skill.name.slice(0,1)}}</div>
    <component-item class="item" :item="skill" :position-index="position" v-else></component-item>
    <div class="coolTime-progress" v-if="skill && skill.defaultTime" v-show="skill && !nocooltime">
      <div class="left-block">
        <div class="left" :style="{ transform: left}"></div>
      </div>
      <div class="right-block">
        <div class="right" :style="{ transform: right}"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'skill',
    'nocooltime',
    'position',
  ],
  created (){
    
  },
  computed : {
    right (){
      let per = 1 - this.skill.coolTime / this.skill.currentCoolTime;
      let rotate = (per <= 0.5) ? (per / 0.5 * 180).toFixed(0) : 180;
      return `rotate(${rotate}deg)`;
    },
    left (){
      let per = 1 - this.skill.coolTime / this.skill.currentCoolTime;
      let rotate = (per > 0.5 && per <=1) ? (180 - (1 - per) / 0.5 * 180).toFixed(0) : 0;
      return `rotate(${rotate}deg)`;
    }
  }
}
</script>

<style scoped lang="less">
  .skill-item{
    position: relative;
    overflow: hidden;
    display: inline-block;
    .skill{
      display: inline-block;
      width: 44px;
      height: 44px;
      line-height: 44px;
      background: black;
      text-align: center;
      color: white;
      border-radius: 2px;
    }
  }

  .coolTime-progress,.left-block,.right-block,.left,.right{
    width: 80px;
    height: 80px;  
    position: absolute;
  }

  .coolTime-progress {
    border-radius: 50%;
    top: -18px;
    left: -18px;
    opacity: 0.3;
    .left,.right{
      background: #9f86ff;
      border-radius: 50%;
      transform: rotate(0deg);
    }
    .right-block,.right{
      clip: rect(0, auto, auto, 40px);
    }
    .left-block,.left{
      clip: rect(0, 40px, auto, 0);
    }
  }
</style>