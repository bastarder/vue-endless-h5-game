<template>
  <div class="game-home-info">
    <div class="main">
      <div class="logo">
        <img :src="'./src/assets/hero-1.png'"/>
        <div class="level">99</div>
      </div>
      <div class="name">Bastarder</div>
    </div>
    <div class="equip">
      <div class="left">
        <div class="label-name">装备</div>
        <component-item class="weapon" :item="hero.$equipments[0]" :position-index="'$equipments|0'"></component-item>
      </div>
      <div class="right">
        <template v-for="(item, index) in hero.$equipments">
          <component-item class="item" v-if="index" :item="item" :position-index="'$equipments|' + index"></component-item>
        </template>
      </div>
    </div>
    <div class="info">
      <div class="left">
        <div class="label-name">属性</div>
      </div>
      <div class="right">

      </div>
    </div>
  </div>
</template>

<script>


export default {
  data () {
    return {
    }
  },
  computed:{
    hero: function(){
      return this.$store.state.hero;
    }
  },
  watch:{
    '$store.state.UPDATE' : function(item){
      this.$forceUpdate();
    },
  },
  methods : {
    open(){

    }
  }
}
</script>

<style scoped lang="less">
  .game-home-info{
    word-spacing:-4px;
    display: table;
    width: 264px;
    height: 280px;
    background: #fff6cb;
    padding: 6px;
    .left{
      display: inline-block;
      vertical-align: top;
      width: 60px;
    }
    .right{
      display: inline-block;
      vertical-align: top;
      width: 192px;
    }
    .label-name{
      height: 40px;
      line-height: 40px;
      width: 60px;
      background: #3a3732;
      color: white;
      text-align: center;
      border-radius: 2px;
    }
    .main{
      margin-bottom: 4px;
      .logo{
        display: inline-block;
        width: 40px;
        height: 40px;
        background-color: #3a3732;
        border-radius: 2px;
        vertical-align: top;
        position: relative;
        img{
          display: inline-block;
          width: 40px;
          height: 40px;
        }
        .level{
          position: absolute;
          width: 18px;
          height: 18px;
          line-height: 18px;
          border-radius: 50%;
          text-align: center;
          background: #3a3732;
          color: white;
          font-size: 10px;
          top: 24px;
          left: 24px;
        }
      }
      .name{
        background-color: #3a3732;
        border-radius: 2px;
        color: white;
        display: inline-block;
        width: 200px;
        height: 40px;
        line-height: 40px;
        margin-left: 10px;
        padding: 0px 20px;
        font-size: 23px;
        text-align: center;
        max-width: 202px;
        text-overflow: ellipsis;
      }
    }

    .equip{
      .right{
        padding: 5px;
      }
      .left{
        padding-top: 5px;
      }
      .weapon{
        margin-top: 8px;
        margin-left: 16px;
      }
      .item{
        margin: 0px 1px 4px 0px;
      }
    }
  }
</style>
