<template>
  <div class="game-smithy">

    <div class="left">
      <intensify />
      <game-package />
    </div><!--

 --><div class="right">
      <blueprint />
    </div>

  </div>
</template>

<script>

import GameSmithyIntensify from './game-smithy-intensify.vue';
import GameSmithyBlueprint from './game-smithy-blueprint.vue';


export default {
  components: {
    'intensify' : GameSmithyIntensify,
    'blueprint' : GameSmithyBlueprint
  }
}
</script>

<style scoped lang="less">
  .game-smithy{
    .left{
      display: inline-block;
      vertical-align: top;
    }
    .right{
      display: inline-block;
      vertical-align: top;
      width: 280px;
      height: 500px;
      padding: 10px 10px 10px 0px;
    }
  }
</style>
