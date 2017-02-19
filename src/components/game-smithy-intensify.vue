<template>
  <div class="game-smithy-intensify">
    强化
    <component-item class="item" :item="item" :position-index="'$intensify|0'"></component-item>
  </div>
</template>

<script>

export default {
  data(){
    return {
      
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

  }
}
</script>

<style scoped lang="less">
  .game-smithy{

  }
</style>
