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
import GameAudio from '../js/audio'
export default {
  components :{
    'game-home-menu' : Menu,
    'game-home-info' : Info
  },
  created(){
    if(!this.$store.state.HeroStore.hero){
      this.$router.push('/login');
    }
    // new GameAudio({
    //   key : 'backgroundMusic',
    //   loop : true,
    // });
  }
}

</script>

<style scoped lang="less">
  .game-home{
    word-spacing:-4px;
    display: table;
    background: #252830;
    .left{
      display: inline-block;
      width: 276px;
      overflow: hidden;
      vertical-align: top;
    }
    .right{
      user-select :none;
      display: inline-block;
      vertical-align: top;
      width: 524px;
      // border-left: 4px solid green;
    }
  }
</style>
