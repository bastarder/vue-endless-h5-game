<template>
  <div class="progress">
    <div v-if="!hideNum" class="progress-num" :style="{ 'line-height':this.height + 'px' }">
      <span v-if="max">{{ value + ' / ' + max}}</span>
      <span v-else>∞</span>
    </div>
    <div class="progress-per" :style="{'width': _per, 'height': this.height + 'px'}"></div>
  </div>
</template>

<script>
export default {
  props: [
    'max',
    'value',
    'hideNum',
    'h',
  ],
  created (){
    this.height = this.h || 30;
  },
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

<style scoped lang="less">
  .progress{
    width: 200px;
    position: relative;
    background-color: #f5f5f5;
    box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
    font-size: 14px;
    border-radius: 2px;
    .progress-per{
      background: #1bc98e;
      transition: width 0.3s;
      border-radius: 2px;
    }
    .progress-num{
      width: 100%;
      text-align: center;
      position: absolute;
    }
  }
  .progress.hp {
    .progress-per{
      background: #e64759;
    }
  }
  .progress.mp{
    .progress-per{
      background: #1997c6;
    }
  }
  .progress.striped{
    .progress-per{
      background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
      background-size: 40px 40px;
    }
  }
</style>