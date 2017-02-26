<template>
  <div class="game-smithy-intensify">
    <div class="title">
      {{title}}
      <div class="arrow"></div>
    </div>
    <component-item class="item" :item="item" :position-index="'$intensify|0'"></component-item>
    <a class="btn intensify red" @click="intensify">
      强化
    </a>
    <div class="tip">{{msg}}</div>
  </div>
</template>

<script>
import Intensify from '../js/intensify';
import { GetRange, GetRandom } from '../js/public-random-range';

export default {
  data(){
    return {
      msg : '',
      title : ''
    }
  },
  computed :{
    item : function(){
      return this.$store.state.SmithyStore.intensifyItem;
    }
  },
  created(){
    let titles = [
      `勇士, 把你的装备放下, 我保证还你一个更强的! 不过...这需要一点点的代价!`,
      `哈哈哈! 又被强大的怪物打败了吧? 来吧! 我 能让你更加强大, 丢进来 快!`,
      `小伙子, 想要获得无与伦比的力量吗? 我可以给你你想要的一切!`,
    ]
    this.title = titles[GetRange([0,titles.length - 1])];
    
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
  @keyframes fire {
    from {
      box-shadow: 0px 0px 60px red inset;
    }
    30% {
      box-shadow: 0px 0px 140px red inset;
    }
    to {
      box-shadow: 0px 0px 60px red inset;
    }
  }

  .game-smithy-intensify{
    height: 220px;
    margin: 10px;
    color:white;
    position: relative;
    box-shadow: 0px 0px 170px red inset;
    // animation: fire 2s infinite;
    .title{
      display: inline-block;
      position: relative;
      margin-top: 8px;
      width: 200px;
      padding: 6px;
      background: black;
      border-radius: 4px;
      margin-left: 10px;
      text-indent: 8px;
      line-height: 23px;
      color: antiquewhite;
      .arrow{
        position: absolute;
        border-left: 10px solid transparent;
        border-top: 12px solid black;
        border-right: 10px solid transparent;
        left: 170px;
      }
    }

    .item{
      position: absolute;
      left: 156px;
      top: 120px;
      border: 1px solid red;
    }
    .intensify{
      position: absolute;
      left: 230px;
      top: 120px;
      height: 44px;
      line-height: 40px;
      width: 140px;
    }
    .tip{
      position: absolute;
      width: 520px;
      text-align: center;
      top: 180px;
    }
  }
</style>
