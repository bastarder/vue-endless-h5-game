<template>
  <div class="game-smithy">

    <div class="left">
      <intensify />
      <game-package />
    </div><!--

 --><div class="right">

    </div>

  </div>
</template>

<script>

import GameSmithyIntensify from './game-smithy-intensify.vue';


export default {
  components: {
    'intensify' : GameSmithyIntensify
  },
  data(){
    return {
     
    }
  },
  created(){
    
  },
  methods:{

  }
}
</script>

<style scoped lang="less">
  .game-smithy{
    .left{
      display: inline-block;
    }
    .right{
      display: inline-block;
      width: 280px;
      height: 500px;
      background: black;
    }
  }
</style>
