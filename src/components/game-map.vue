<template>
  <div class="game-map">
    <button class="btn btn-info" @click="goTo('罪恶之城')">罪恶之源</button>
  </div>
</template>

<script>

export default {
  data () {
    return {
      unit : 1
    }
  },
  methods : {
    goTo (parm){
      console.log('GoTo:', parm);
      this.$store.state.EVENT_MAP_DATA = {
        name: parm
      };
      location.href = '#/map-active';
    }
  }
}

</script>

<style>
 .game-home{
   text-align: center;
   line-height: 440px;
   height: 440px;
 }

 .game-home .link{
   color: black;
   border: 1px solid #888;
   border-radius: 4px;
   padding: 10px;
   text-decoration: none;
 }
</style>
