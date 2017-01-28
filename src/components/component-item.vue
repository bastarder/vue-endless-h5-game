<template>
  <div v-item-tool-tip="item" v-drop-item="this.dropData" class="component-item" @mousedown="mousedown($event)">
    <div v-if="item">
      <slot name="item-name"></slot>
      <slot name="badges"></slot>
      <span class="item-name" v-if="item.name">{{item.name}}</span>
      <span class="badges" v-if="item.num">{{item.num}}</span>
      <img class="badges" v-if="item.equipType > -1" :src="`./src/assets/equip-type-${item.equipType}.png`" />
      <ul class="dropdown-menu item-menu">
        <li>
          <a v-if="item.equip && this.position.$package">装备</a>
          <a v-if="this.position.$equipments"</a>
        </li>
      </ul>
    </div>
    <div v-else class="blank">
      {{this.position.$equipments ? this.equipCname[this.index] : '+'}}
    </div>
  </div>
</template>

<script>
import CONSTANT from '../data/constant'

export default {
  props: [
    'item',
    'positionIndex'
  ],
  data () {
    return {
      equipCname : CONSTANT.EQUIP_ID,
      itemData : null
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
      hero : this.$store.state.hero,
    }
  },
  watch:{
    '$store.state.UPDATE' : function(){
       this.$forceUpdate();
     }
  },
  methods :{
    mousedown (event){
      if(event.button !== 2){
        return;
      }
      let right_click = document.oncontextmenu;
      document.oncontextmenu = () => false;
      setTimeout(()=>{
        document.oncontextmenu = right_click
      },50);
      if(this.position.$equipments){
        this.demount();
        return;
      }
      let target = $(event.target);
      let dropdown = [];
      let times = 0;
      while(!dropdown.length){
        times ++;
        dropdown = target.find('.dropdown-menu.item-menu');
        target = target.parent();
        if(times > 10){
          return;
          console.warn('打开右键菜单失败,未找到菜单;',this.item,this.positionIndex);
        }
      }
      dropdown.show();
      dropdown.css('top', event.clientY - 10)
      dropdown.css('left', event.clientX - 10)
      dropdown.on('mouseleave',function(){
        $('.dropdown-menu.item-menu').hide();
      })
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
   user-select :none;
   background : #eeece1;
   display: inline-block;
   vertical-align: top;
   width: 44px;
   height: 44px;
   color: white;
   border: 1px solid gray;
   border-radius: 2px;
   overflow : hidden;
   cursor: pointer;
   .blank{
     cursor: pointer;
     color: #cdbaba;
     text-align: center;
     line-height: 40px;
   }
 }


 .component-item .badges{
    position: absolute;
    min-width: 20px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    left: -1px;
    top: 27px;
    border-radius: 0px 2px 0px;
    border: 1px solid gray;
    padding: 0px 2px;
    color: gray;
    background: antiquewhite;
    font-size: 10px;
    font-weight: 200;
 }

 .component-item .item-name{
   display: inline-block;
   transform: scale(0.75);
   font-size: 10px;
   font-weight: 700;
   color: brown;
   cursor: pointer;
   text-align: center;
   width: 100%;
 }
 .dropdown-menu.item-menu{
   border-radius: 0px;
   border-color: #eee;
 }

 .item-tool-tip-pover{
   background: rgba(12, 4, 37, 0.8);
   border-radius: 4px;
   padding: 6px;
   color: white;
   text-shadow: black 1px 1px;
   font-size: 10px;
   z-index: 99;
 }

  .item-tool-tip-pover .name,
  .item-tool-tip-pover .equip,
  .item-tool-tip-pover .nor,
  .item-tool-tip-pover .spe{
    margin-bottom: 10px;
  }

  .item-tool-tip-pover .name{
    font-size: 14px;
  }

  .item-tool-tip-pover .equip{
    color:#e7d0d0;
  }

  .item-tool-tip-pover .attr-name.skills{
    color: yellow;
  }

  .item-tool-tip-pover .attr-name.status{
    color: green;
  }

  .item-tool-tip-pover .attr-name.down,
  .item-tool-tip-pover .attr-data.down{
    color: gray;
  }

  .item-tool-tip-pover .dsc{
    color: gray;
  }



</style>
