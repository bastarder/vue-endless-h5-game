<template>
  <div class="game-fight-event-log">
    <div class="log zoomIn animated" v-for="log in logs" v-html="log"></div>
    <div style="height:10px"></div>
    <button class="btn clear" @click="clear">+</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: [

  ],
  data(){
    return {
   
    }
  },
  created (){
    
  },
  watch : {
    logs : function(){
      this.$el.scrollTop = this.$el.scrollHeight;
    }
  },
  computed : mapState({
    'logs' : state => state.FightStore.eventLogs
  }),
  methods : {
    clear (){
      this.$store.commit('FightEventLogClear');
    }
  }
}
</script>

<style scoped lang="less">

 .game-fight-event-log {
    background: rgb(30, 33, 39);
    font-size: 12px; 
    color: rgb(207, 210, 218);
    height: 296px;
    margin-bottom: 4px;
    overflow-y: scroll;
    padding:10px;
    .log{
      letter-spacing: 1px;
      margin-bottom: 4px;
    }
    .clear{
      position: absolute;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      line-height: 14px;
      transform: rotate(45deg);
      top: 270px;
      left: 550px;
    }
 }

</style>