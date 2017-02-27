<template>
  <div v-item-tool-tip="item" v-drop-item="dropData" class="component-item">
    <div :style="{'color':gradeColor[item.grade || 0]}" v-if="item">
      <slot name="item-name">
        <span class="item-name" v-if="item.name">{{item.name}}</span>
      </slot>
      <slot name="badges">
        <span class="badges" v-if="item.num">{{item.num}}</span>
        <span class="badges equip" v-if="item.equipType > -1" >{{equipCname[item.equipType]}}</span>
      </slot>
    </div>
    <div v-else class="blank">
      <slot name="item-name">
        <span class="item-name">
          {{position.$equipments ? equipCname[index]: ''}}
        </span>
      </slot>
    </div>
  </div>
</template>

<script>
import CONSTANT from '../data/constant'
import ItemToolTip from '../directive/item-tool-tip'
import DropItem from '../directive/drop-item'

export default {
  directives :{
    'item-tool-tip' : ItemToolTip,
    'drop-item' : DropItem
  },
  props: [
    'item',
    'positionIndex'
  ],
  data () {
    return {
      equipCname : CONSTANT.EQUIP_ID,
      gradeColor : CONSTANT.ITEM_LEVEL,
    }
  },
  created (){
    let record = this.positionIndex.split("|");
    this.position = {
      $package : false,
      $equipments : false,
    }
    this.position[record[0]] = true;
    this.index = Number(record[1]);
    this.dropData = {
      position : this.positionIndex,
      hero : this.$store.state.HeroStore.hero,
    }
  },
  watch:{
    '$store.state.UPDATE' : function(){
       this.$forceUpdate();
     }
  }
}
</script>

<style lang="less">
 .notice-item{
   top: 8px;
   right: 8px;
 }

 .component-item{
   position: relative;
   background : black;
   display: inline-block;
   vertical-align: top;
   width: 44px;
   height: 44px;
   color: white;
  //  border: 1px solid gray;
   border-radius: 2px;
   overflow : hidden;
   cursor: pointer;
   .blank{
     cursor: pointer;
     text-align: center;
     line-height: 40px;
     .item-name{
        color: #cfd2da;
      }
   }
 }
 .component-item:hover{
   box-shadow: 0px 0px 4px #eee inset;
 }


 .component-item .badges{
    position: absolute;
    width: 38px;
    margin: 0px 3px;
    border-top: 1px solid rgba(255,255,255,0.5);
    height: 16px;
    line-height: 16px;
    text-align: center;
    left: -1px;
    top: 27px;
    padding: 0px 2px;
    font-size: 12px;
    transform: scale(0.75);
    color: aquamarine;
 }

 .component-item .item-name{
   display: inline-block;
   transform: scale(0.75);
   letter-spacing: 2px;
   font-size: 10px;
   cursor: pointer;
   text-align: center;
   width: 100%;
 }

  .dustbin{
    height: 15px;
    .blank{
      line-height: 14px;
    }
  }
</style>
