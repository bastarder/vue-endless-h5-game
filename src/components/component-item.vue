<template>
  <div class="component-item" @mouseover="mouseover" @mouseleave="mouseleave" @mousedown="mousedown($event)">
    <div class="item-name" >{{ item.name }}</div>
    <div class="badge">{{ item.num }}</div>
    <ul class="dropdown-menu item-menu">
      <li v-for="action in 5">
        <a>Action-{{action}}</a>
      </li>
    </ul>
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
    console.log(this.positionIndex);
  },
  methods :{
    mouseover (){
      this.mouseleave();
      this.$store.state.NOTICE_ITEM = new PNotify({
        title: this.item.name,
        addclass: "notice-item",
        shadow: false,
        stack : {
            "dir1": "down",
            "dir2": "left",
            "context": $("#router-view")
        },
        text: "test"
      });
    },
    mouseleave (){
      this.$store.state.NOTICE_ITEM && this.$store.state.NOTICE_ITEM.remove();
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

</style>
