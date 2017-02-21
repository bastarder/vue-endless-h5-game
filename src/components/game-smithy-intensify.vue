<template>
  <div class="game-smithy-intensify">
    强化
    <component-item class="item" :item="item" :position-index="'$intensify|0'"></component-item>
    <button class="btn" @click="intensify">强化</button>
    {{msg}}
  </div>
</template>

<script>
import Intensify from '../js/intensify';


export default {
  data(){
    return {
      msg : ''
    }
  },
  computed :{
    item : function(){
      return this.$store.state.SmithyStore.intensifyItem;
    }
  },
  created(){
    console.log(this.item);
  },
  methods:{
    intensify : function(){
      this.msg = null;
      let result = Intensify(this.item);
      this.msg = result.msg;
      console.log(result);
    }
  }
}
</script>

<style scoped lang="less">
  .game-smithy{

  }
</style>
