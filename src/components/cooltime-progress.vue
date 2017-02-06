<template>

</template>

<script>
 
export default {
  props: [
    'value',
    'max',
  ],
  computed : {
    right (){
      var per = 1 - this.value / this.max;
      if(per <= 0.5){
        var rotate = (per / 0.5 * 180).toFixed(0);
      }else{
        var rotate = 180;
      }
      return 'rotate(' + rotate + 'deg)';
    },
    left (){
      var per = 1 - this.value / this.max;
      if(per > 0.5 && per <=1){
        var rotate = (180 - (1 - per) / 0.5 * 180).toFixed(0);
      }else{
        var rotate = 0;
      }
      return 'rotate(' + rotate + 'deg)';
    }
  }

}
</script>

<style scoped lang="less">
  .coolTime-progress {
    width: 80px;
    height: 80px;  
    position: absolute;
    border-radius: 50%;
    top: -15px;
    left: -15px;
    opacity: 0.3;
  }
  .coolTime-progress .left-block, .coolTime-progress .right-block {
    width: 80px; 
    height: 80px;
    position: absolute;
  }
  .coolTime-progress .left, .coolTime-progress .right {
    position: absolute;
    display: block;
    width: 80px; 
    height: 80px;
    background:black;
    border-radius: 50%;
    transform: rotate(0deg);
  }
  .coolTime-progress .right-block, .coolTime-progress .right {
    clip: rect(0, auto, auto, 40px);
  }
  .coolTime-progress .left-block, .coolTime-progress .left {
    clip: rect(0, 40px, auto, 0);
  }
</style>

