<template>
  <div class="game-smithy">
    铁匠铺
    <intensify />
    <game-package />
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

  }
</style>
