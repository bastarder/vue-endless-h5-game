<template>
  <div class="game-house">
    <div class="block-name">
      仓库
    </div>
    <div class="list">
      <template v-for="(item, index) in hero.$houseList" >
        <component-item class="item" :item="item" :position-index="'$houseList|' + index"></component-item>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      hero: {},
      baseInfo: [
        ['金币','gold'],
        ['宝石','gem']
      ]
    }
  },
  created() {
    // 实例创建完毕, 获取战斗信息;
    this.hero = this.$store.state.HeroStore.hero;
  },
  watch: {
     '$store.state.UPDATE' : function(){
       this.$forceUpdate();
     }
  },
  methods :{

  },
  computed : {

  },
}
</script>

<style scoped lang="less">
 .game-house{
   padding: 5px;
   height: 230px;
   width: 100%;
   .block-name{
     margin: 2px 12px 0px 8px;
     background: rgba(0,0,0,0.7);
     border-radius: 2px;
     color: white;
     padding-left: 6px;
     line-height: 26px;
   }

   .list{
     margin-top: 6px;
     height: 192px;
     overflow: scroll;
     padding-left: 8px;
     .item{
       margin: 0px 6px 4px 0px;
     }
   }
 }

</style>
