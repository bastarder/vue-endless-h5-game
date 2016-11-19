<template>
  <div class="progress" :style="pstyle">
    <div v-if="showTip" class="progress-tip">
      {{ value + ' / ' + max}} 
    </div>
    <div :class="_class" :style="{ width: _per }"></div>
  </div>
</template>

<script>
export default {
  props: [
    'max',
    'value',
    'pclass',
    'pstyle',
    'showTip'
  ],
  computed: {
    _per (){
      return Math.floor(this.value / this.max * 100) + '%';
    },
    _class (){
      return "progress-bar " + this.pclass;
    }
  }
}
</script>

<style>
  .progress{
    margin-top: 6px;
    margin-bottom: 0px;
  }
  .progress-tip{
    position: absolute;
    text-align: center;
    width: 70%;
    font-size: 12px;
    line-height: 20px;
  }
</style>