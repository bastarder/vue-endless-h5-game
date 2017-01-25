<template>
  <div class="game-home">
    <div class="left">
      <game-home-info></game-home-info>
      <game-home-menu></game-home-menu>
    </div>
    <div class="right">
      <game-house></game-house>
      <game-package></game-package>
    </div>
  </div>
</template>

<script>
import Menu from './game-home-menu.vue'
import Info from './game-home-info.vue'

export default {
  components :{
    'game-home-menu' : Menu,
    'game-home-info' : Info
  }
}

</script>

<style scoped lang="less">
  .game-home{
    word-spacing:-4px;
    display: table;
    background: #fff6cb;
    .left{
      display: inline-block;
      width: 264px;
      overflow: hidden;
      vertical-align: top;
    }
    .right{
      user-select :none;
      display: inline-block;
      vertical-align: top;
      width: 524px;
      border-left: 4px solid green;
    }
  }
</style>
