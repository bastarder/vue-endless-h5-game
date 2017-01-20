<template>
  <div style="display: inline-block;">
    <div v-item-tool-tip="item" class="component-item" v-if="item" @mousedown="mousedown($event)">
      <slot name="item-name"></slot>
      <slot name="badge"></slot>
      <ul class="dropdown-menu item-menu">
        <li>
          <a v-if="item.equip && this.position.$package" @click="equip">装备</a>
          <a v-if="this.position.$equipments" @click="demount">卸下</a>
        </li>
      </ul>
    </div>
    <div class="component-item" v-else></div>
  </div>
</template>

<script>
export default {
  props: [
    'item',
    'positionIndex'
  ],
  data () {
    return {}
  },
  created (){
    let record = this.positionIndex.split("|");
    this.position = {
      $package : false,
      $equipments : false,
    }
    this.position[record[0]] = true;
    this.index = Number(record[1]);
  },
  watch:{
    '$store.state.UPDATE' : function(){
       this.$forceUpdate();
     }
  },
  methods :{
    equip(){
      this.$store.state.hero.equip(this.item, this.index);
    },
    demount(){
      this.$store.state.hero.demount(this.index);
    },
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

<style>
 .notice-item{
   top: 8px;
   right: 8px;
 }

 .component-item{
   display: inline-block;
   vertical-align: top;
   text-align: center;
   width: 44px;
   height: 44px;
   border: 1px solid #eee;
   margin: 4px 4px;
   box-shadow: 1px 1px 6px #eee;
 }
 .component-item:hover{
   cursor: pointer;
   box-shadow: 1px 1px 6px gray;
   border: gray;
 }
 .component-item .badge{
   vertical-align: top;
   padding: 1px 10px;
   font-size: 10px;
   margin-top: 2px;
 }
 .component-item .item-name{
   font-size: 10px;
   font-weight: 700;
   color: brown;
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
