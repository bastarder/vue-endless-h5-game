<template>
  <div class="game-fight-drop-list">
    <ul v-if="dropData.length">
      <li v-for="(item, index) in dropData" :class="['item', ~selected.indexOf(index) ? 'selected' : '', (index+1) % 3 === 0 ? 'last' : '']" >
        <input type="checkbox" v-show="false" :id="'item-' + index" :value="index" v-model="selected">
        <label 
          :for="'item-' + index">
          <span class="name">{{item[0] | itemKey('name')}}</span> 
          <span class="d-ib" style="transform: rotate(45deg)">+</span> 
          <span class="num">{{item[1]}}</span>
          <span class="triangle-left bounceIn animated" v-if="~selected.indexOf(index)"></span>
          <span class="triangle-right bounceIn animated" v-if="~selected.indexOf(index)"></span>
        </label>
      </li>
    </ul>
    <div class="drop-tip color-red bounceIn animated" v-if="tip">你的背包似乎不能容纳更多的东西了!</div>
    <button v-if="dropData.length" type="button" class="btn drop-btn" @click="getItem">获取所选物品</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: [
    'dropData',
    'getter',
  ],
  data(){
    return {
      tip: false,
      selected : [],
    }
  },
  watch:{
    dropData : function(){
      this.$set(this,'selected', _.range(this.dropData.length));
    }
  },
  methods : {
    getItem(){
      this.tip = false;
      // 拾取物品
      let left = this.getter.getItem(
        _.map(this.selected, i => this.dropData[Number(i)]), true
      );
      this.$emit('setDropData',left);
      // 如果有剩余物品,则提示背包已满
      if(left.length > 0){
        this.tip = true;
        setTimeout(()=>{
          this.$set(this, 'tip', false);
        },2000);
        this.selected = _.range(left.length);
      }
    },
  }
}
</script>

<style scoped lang="less">
 .game-fight-drop-list {
   padding: 6px;
   position: relative;
   height: 200px;
   background: #1e2127;
   overflow-y: scroll;
   ul{
     padding: 0;
     list-style: none;
     margin: 0px;
   }
   .item{
     display: inline-block;
     border: 1px solid rgb(67, 72, 87);
     border-radius: 2px;
     width: 110px;
     height: 44px;
     color: rgb(207, 210, 218);
     line-height: 40px;
     padding: 0px 2px 0px 8px;
     margin-right: 4px;
     margin-bottom: 4px;

     label{
       position: relative;
       display: inline-block;
       width: 100%;
       height: 100%;
       cursor: pointer;
       font-size: 12px;

       .triangle-left{
         display: inline-block;
         position: absolute;
         border-bottom: 16px solid transparent;
         border-left: 16px solid #1bc98e;
         top: -3px;
         left: -9px;
       }
       .triangle-right{
         display: inline-block;
         position: absolute;
         border-bottom: 16px solid #1bc98e;
         border-left: 16px solid transparent;
         top: 25px;
         left: 85px;
        }

     }
     transition: background 0.3s;
   }
   .item.selected{
     background: #434857;
     color: white;
     transition: 0.3s;
   }
   .item.last{
     margin-right: 0px;
   }
   .drop-tip{
     display: inline-block;
     position: absolute;
     width: 100%;
     text-align: center;
     background: rgba(0,0,0,.6);
     padding: 20px;
     top: 74px;
   }
   .drop-btn{
     margin-top: 8px;
     width: 100%;
   }
 }
</style>