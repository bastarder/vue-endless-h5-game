<template>
    <div class="component-hero-info">
      <canvas id="fight-wall"></canvas>
      <button @click="run">Test</button>
    </div>
</template>

<script>
import PGET from '../js/public-static-get';
import canvasRun from '../js/fight-wall';

export default {
  data () {
    return {
      hero: {}
    }
  },
  watch:{
    '$store.state.UPDATE' : function(item){
      this.$forceUpdate();
    },
  },
  mounted (){
    this.can = canvasRun();
  },
  created (){
    this.hero = this.$store.state.hero;
  },
  methods :{
    run (){
      console.log(123)
      this.can();
    },
    demount(type){
      this.hero.demount(Number(type));
      this.$forceUpdate();
    }
  }
}
</script>

<style scoped lang="less">
  .component-hero-info{

  }

  #fight-wall{
    background: green;
    width: 300px;
    height: 300px;
    border: 1px solid #eee;
  }
</style>
