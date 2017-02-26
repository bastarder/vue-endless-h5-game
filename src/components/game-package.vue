<template>
  <div class="game-package shadow-box">
    <div class="block-name">
      背包
    </div>
    <div class="info-list">
      <div class="item" v-for="item in baseInfo">
        <span class="title">{{item[0]}}</span>
        <span class="num">{{hero.$resource[item[1]]}}</span>
      </div>
      <component-item class="dustbin" position-index="$destory|0">
        <span slot="item-name" class="item-name">
          垃圾箱
        </span>
      </component-item>
      <div class="btn f-r" @click="sort">
        整理
      </div>
    </div>
    <div class="list">
      <template v-for="(item, index) in hero.$package">
        <component-item class="item" :item="item" :position-index="'$package|' + index"></component-item>
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
    sort (){
      this.hero.itemSort('$package');
      this.hero.itemSort('$houseList');
    }
  }
}
</script>

<style scoped lang="less">
 .game-package{
   margin-top: 10px;
   padding: 5px;
   height: 270px;
   width: 520px;
   .block-name{
     margin: 2px 8px 0px 8px;
     background: rgba(0,0,0,0.7);
     border-radius: 2px;
     color: white;
     padding-left: 6px;
     line-height: 26px;
   }
   .info-list{
     padding: 10px 8px;
     font-size: 10px;
     .item{
       margin-right: 8px;
       display: inline-block;
       .title{
         background: #5cb85c;
         border-radius: 2px;
         padding: 2px 4px;
         color: white;
       }
       .num{
         background: #337ab7;
         padding: 2px 4px;
         border-radius: 0px 2px 2px 0px;
         color: beige;
       }
     }
   }

   .list{
     height: 192px;
     overflow: scroll;
     padding-left: 8px;
     .item{
       margin: 0px 6px 4px 0px;
     }
   }
 }

</style>
