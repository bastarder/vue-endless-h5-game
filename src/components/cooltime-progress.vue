<template>
  <div class="coolTime-progress">
    <div class="arrow-block arr1"></div>
    <!--<div class="arrow-block arr2"></div>-->
    <div class="arrow-block arr3"></div>
    <!--<div class="arrow-block arr4"></div>-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'game-header'
    }
  }
}
</script>

<style>
  .coolTime-progress {
    position: absolute;
    width: 50px;
    height: 50px;
  }

  .arrow-block{
    overflow: hidden;
    border: 25px solid #000001;
    opacity: 0.6;
    width: 0px;
    height: 0px;
  }

  .arrow-block.arr1{
    position: absolute;
    opacity: 0.6;
    border-left: 25px #000 solid;
    border-top: 0px #000 solid;
    border-right: 0px #000 solid;
    border-bottom: 25px transparent solid;
    left: 25px;
    top: 0px;
  }

  /*.arrow-block.arr2{
    position: absolute;
    opacity: 0.6;
    border-left: 0px #000 solid;
    border-top: 25px transparent solid;
    border-right: 25px #000 solid;
    border-bottom: 0px #000 solid;
    left: 25px;
    top: 0px;
  }*/

  .arrow-block.arr3{
    position: absolute;
    opacity: 0.6;
    border-left: 0px #000 solid;
    border-top: 0px #000 solid;
    border-right: 25px #000 solid;
    border-bottom: 25px transparent solid;
    left: 25px;
    top: 25px;
  }

  /*.arrow-block.arr4{
    position: absolute;
    opacity: 0.6;
    border-left: 25px #000 solid;
    border-top: 25px transparent solid;
    border-right: 0px #000 solid;
    border-bottom: 0px #000 solid;
    left: 25px;
    top: 25px;
  }*/



</style>

